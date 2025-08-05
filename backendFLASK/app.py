from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Stock, Account, Portfolio, Transactions
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta, date

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks.db'
db.init_app(app)

with app.app_context():
    db.create_all()
    # Initialize account with $100,000 if it doesn't exist
    if not Account.query.first():
        account = Account(balance=100000.0)
        db.session.add(account)
        db.session.commit()
    
    # Retrieving stock data for portfolio performance
    symbols = [s.symbol for s in Stock.query.all()]
    if not symbols:
        print("No symbols to update")
        exit()

    price_data = yf.download(symbols, period='1mo')['Close']
    
    for date, i in price_data.iterrows():
        date_str = date.strftime('%Y-%m-%d')
        for symbol in symbols:
            price = i.get(symbol)

            if pd.isna(price):
                continue

            exists = Portfolio.query.filter_by(symbol = symbol, date = date_str).first()

            if not exists:
                db.session.add(Portfolio(symbol = symbol, date = date_str, closing_price = price))

    db.session.commit()
    
@app.route('/api/stocks/<ticker>')
def get_stock(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period='5d')

    if data.empty:
        return jsonify({'error': 'No data found for this ticker'}), 404

    return jsonify(data.reset_index().to_dict(orient='records'))

@app.route('/api/search/<query>')
def search_stock(query):
    """Search for stocks by ticker or company name"""
    try:
        # Try as ticker first
        ticker = yf.Ticker(query.upper())
        info = ticker.info
        if info and 'symbol' in info:
            return jsonify({
                'symbol': info.get('symbol', query.upper()),
                'name': info.get('longName', info.get('shortName', 'Unknown')),
                'current_price': info.get('currentPrice', info.get('regularMarketPrice', 0)),
                'currency': info.get('currency', 'USD'),
                'previous_close': info.get('previousClose', 0),
                'industry': info.get('industry', 'N/A'),
                'sector': info.get('sector', 'N/A'),
                'beta': info.get('beta', 0),
                'description': info.get('longBusinessSummary', 'No description available'),
                'dividend_yield': info.get('dividendYield', 0),
                'volume': info.get('volume', 0),
                'pe_ratio': info.get('trailingPE', 0),
                'eps': info.get('trailingEps', 0),
            })
        else:
            return jsonify({'error': 'Stock not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/account')
def get_account():
    """Get account balance"""
    account = Account.query.first()
    if not account:
        account = Account(balance=100000.0)
        db.session.add(account)
        db.session.commit()
    return jsonify(account.to_dict()), 200

@app.route('/api/stocks', methods=['GET'])
def get_all_stocks():
    stocks = Stock.query.all()
    stock_list = [s.to_dict() for s in stocks]
    return jsonify(stock_list), 200

@app.route('/api/stocks', methods=['POST'])
def add_stock():
    data = request.get_json()

    if not data.get("symbol") or not data.get("quantity"):
        return jsonify({"error": "Symbol and quantity are required"}), 400

    try:
        symbol = data["symbol"].upper()
        quantity = int(data["quantity"])
        name = data.get("name", "")

        if quantity <= 0:
            return jsonify({"error": "Quantity must be greater than 0"}), 400

        # Get current price from Yahoo Finance if not provided
        purchase_price = data.get("purchase_price")
        if not purchase_price:
            stock_ticker = yf.Ticker(symbol)
            info = stock_ticker.info
            current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))
            
            if current_price == 0:
                # Fallback to recent history
                hist = stock_ticker.history(period='1d')
                if not hist.empty:
                    current_price = float(hist['Close'].iloc[-1])
                else:
                    return jsonify({"error": "Could not retrieve current price for this stock"}), 400
            
            purchase_price = current_price
            
            # Get company name if not provided
            if not name:
                name = info.get('longName', info.get('shortName', symbol))
        else:
            purchase_price = float(purchase_price)
            if purchase_price <= 0:
                return jsonify({"error": "Purchase price must be greater than 0"}), 400

        # Calculate total cost
        total_cost = purchase_price * quantity
        
        # Check account balance
        account = Account.query.first()
        if not account:
            account = Account(balance=100000.0)
            db.session.add(account)
            db.session.commit()
            
        if account.balance < total_cost:
            return jsonify({
                "error": f"Insufficient funds. Cost: ${total_cost:.2f}, Available: ${account.balance:.2f}"
            }), 400
        
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid data types provided"}), 400
    except Exception as e:
        return jsonify({"error": f"Error fetching stock data: {str(e)}"}), 500

    # Update account balance
    account.balance -= total_cost

    # Record Transaction
    transaction = Transactions(
        symbol = symbol,
        date = pd.Timestamp.now().strftime('%Y-%m-%d'),
        type = "BUY",
        quantity = quantity,
        purchase_price = purchase_price
    )

    db.session.add(transaction)

    stock = Stock.query.filter_by(symbol=symbol).first()
    if stock:
        stock.quantity += quantity
        # Update purchase_price as weighted average
        total_shares = stock.quantity
        old_cost = (stock.quantity - quantity) * stock.purchase_price
        new_total_cost = old_cost + total_cost
        stock.purchase_price = new_total_cost / total_shares
        
        if name:
            stock.name = name

        message = f"Updated stock '{symbol}', new quantity: {stock.quantity}"
    else:
        stock = Stock(
            symbol=symbol,
            purchase_price=purchase_price,
            quantity=quantity,
            name=name
        )
        db.session.add(stock)
        message = f"Added new stock '{symbol}' with quantity {quantity}"

    db.session.commit()

    return jsonify({
        "message": message,
        "stock": stock.to_dict(),
        "total_cost": total_cost,
        "remaining_balance": account.balance
    }), 201

@app.route('/api/stocks/delete_by_symbol', methods=['DELETE'])
def sell_stock():
    """Sell stocks - either partial quantity or all shares"""
    data = request.get_json()
    symbol = data.get("symbol", "").upper()
    quantity_to_sell = data.get("quantity", "all")  # Can be number or "all"

    if not symbol:
        return jsonify({"error": "No symbol provided"}), 400

    stock = Stock.query.filter_by(symbol=symbol).first()
    if not stock:
        return jsonify({"error": f"Stock with symbol '{symbol}' not found"}), 404

    # Handle "sell all" vs specific quantity
    if quantity_to_sell == "all":
        quantity_to_sell = stock.quantity
    else:
        try:
            quantity_to_sell = int(quantity_to_sell)
            if quantity_to_sell <= 0:
                return jsonify({"error": "Quantity must be greater than 0"}), 400
        except (ValueError, TypeError):
            return jsonify({"error": "Invalid quantity provided"}), 400

    if stock.quantity < quantity_to_sell:
        return jsonify({"error": f"Cannot sell {quantity_to_sell} units; only {stock.quantity} available"}), 400

    # Get current market price for selling
    try:
        stock_ticker = yf.Ticker(symbol)
        info = stock_ticker.info
        current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))
        
        if current_price == 0:
            hist = stock_ticker.history(period='1d')
            if not hist.empty:
                current_price = float(hist['Close'].iloc[-1])
            else:
                return jsonify({"error": "Could not retrieve current price for selling"}), 400
    except Exception as e:
        return jsonify({"error": f"Error fetching current price: {str(e)}"}), 500

    # Calculate sale proceeds
    sale_proceeds = current_price * quantity_to_sell
    
    # Update account balance
    account = Account.query.first()
    if not account:
        account = Account(balance=100000.0)
        db.session.add(account)
    
    account.balance += sale_proceeds

    # Calculate profit/loss
    purchase_cost = stock.purchase_price * quantity_to_sell
    profit_loss = sale_proceeds - purchase_cost

    if stock.quantity == quantity_to_sell:
        # Selling all shares - remove from portfolio
        db.session.delete(stock)
        db.session.commit()
        return jsonify({
            "message": f"Sold all {quantity_to_sell} shares of '{symbol}'",
            "sale_proceeds": round(sale_proceeds, 2),
            "current_price": current_price,
            "profit_loss": round(profit_loss, 2),
            "remaining_balance": round(account.balance, 2),
            "position_closed": True
        }), 200
    else:
        # Partial sale - update quantity
        stock.quantity -= quantity_to_sell
        db.session.commit()
        return jsonify({
            "message": f"Sold {quantity_to_sell} shares of '{symbol}', remaining: {stock.quantity}",
            "sale_proceeds": round(sale_proceeds, 2),
            "current_price": current_price,
            "profit_loss": round(profit_loss, 2),
            "remaining_balance": round(account.balance, 2),
            "remaining_shares": stock.quantity
        }), 200

@app.route('/api/portfolio/value', methods=['GET'])
def get_portfolio_perfromance():
    stocks = Stock.query.all()
    if not stocks:
        return jsonify([]), 200

    # Get all the stocks and their respective holdings
    current_holdings = {s.symbol: s.quantity for s in stocks}

    cutoff_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    
    # Get closing prices
    closing_prices = Portfolio.query.filter(Portfolio.date >= cutoff_date).order_by(Portfolio.date).all()
    
    value_by_date = {}

    # Calculate the total value of the portfolio at each date
    for row in closing_prices:
        if row.symbol not in current_holdings:
            continue
        total_value = current_holdings[row.symbol] * row.closing_price
        if row.date not in value_by_date:
            value_by_date[row.date] = total_value
        else:
            value_by_date[row.date] += total_value
        
    res = [
        {"date": date, "total_value": round(value, 2)}
        for date, value in sorted(value_by_date.items())
    ]
    
    return jsonify(res), 200
    
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    transactions = Transactions.query.all()
    print(transactions)
    if not transactions:
        return jsonify([]), 200
    
    transactions_list = [t.to_dict() for t in transactions]
    
    return jsonify(transactions_list), 200

if __name__ == '__main__':
    app.run(port=5050, debug=True)

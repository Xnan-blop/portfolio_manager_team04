from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Stock
import yfinance as yf


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks.db'
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/stocks/<ticker>')
def get_stock(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period='5d')

    if data.empty:
        return jsonify({'error': 'No data found for this ticker'}), 404

    return jsonify(data.reset_index().to_dict(orient='records'))
@app.route('/api/stocks', methods=['GET'])
def get_all_stocks():
    stocks = Stock.query.all()
    stock_list = [s.to_dict() for s in stocks]
    return jsonify(stock_list), 200

@app.route('/api/stocks', methods=['POST'])
def add_stock():
    data = request.get_json()

    if not data.get("symbol") or not data.get("purchase_price") or not data.get("quantity"):
        return jsonify({"error": "Symbol, purchase_price, and quantity are required"}), 400

    try:
        symbol = data["symbol"].upper()
        purchase_price = float(data["purchase_price"])
        quantity = int(data["quantity"])
        name = data.get("name", "")

        if purchase_price <= 0 or quantity <= 0:
            return jsonify({"error": "purchase_price and quantity must be greater than 0"}), 400

    except (ValueError, TypeError):
        return jsonify({"error": "Invalid data types provided"}), 400

    stock = Stock.query.filter_by(symbol=symbol).first()
    if stock:
        stock.quantity += quantity

        # Optional: update purchase_price and name if desired
        # For example, update purchase_price as weighted average or just overwrite
        # Here's a simple overwrite (you can customize logic)
        stock.purchase_price = purchase_price
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
        "stock": stock.to_dict()
    }), 201



@app.route('/api/stocks/<int:stock_id>', methods=['DELETE'])
def delete_stock(stock_id):
    stock = Stock.query.get(stock_id)
    if not stock:
        return jsonify({"error": "Stock not found"}), 404

    db.session.delete(stock)
    db.session.commit()
    return jsonify({"message": f"Stock with id {stock_id} deleted"}), 200


@app.route('/api/stocks/delete_by_symbol', methods=['DELETE'])
def delete_stock_by_symbol():
    data = request.get_json()
    symbol = data.get("symbol", "").upper()
    quantity_to_delete = data.get("quantity", 0)

    if not symbol:
        return jsonify({"error": "No symbol provided"}), 400

    if not quantity_to_delete or quantity_to_delete <= 0:
        return jsonify({"error": "Invalid quantity to delete"}), 400

    stock = Stock.query.filter_by(symbol=symbol).first()
    if not stock:
        return jsonify({"error": f"Stock with symbol '{symbol}' not found"}), 404

    if stock.quantity < quantity_to_delete:
        return jsonify({"error": f"Cannot sell {quantity_to_delete} units; only {stock.quantity} available"}), 400

    if stock.quantity == quantity_to_delete:
        db.session.delete(stock)
        db.session.commit()
        return jsonify({"message": f"Sold all {quantity_to_delete} of stock '{symbol}'"}), 200
    else:
        stock.quantity -= quantity_to_delete
        db.session.commit()
        return jsonify({"message": f"Sold {quantity_to_delete} of stock '{symbol}', remaining: {stock.quantity}"}), 200



if __name__ == '__main__':
    app.run(port=5050, debug=True)

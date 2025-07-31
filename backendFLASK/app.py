# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Stock
import yfinance as yf


app = Flask(__name__)
CORS(app)  # Enable CORS so React frontend can access

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks.db'
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/stock/<ticker>')
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
    stock = Stock(
    symbol=data["symbol"].upper(),
    purchase_price=data.get("purchase_price", 0),
    quantity=data.get("quantity", 0),
    name=data.get("name", "")
    )
    db.session.add(stock)
    db.session.commit()
    return jsonify(stock.to_dict()), 201

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

    if not symbol:
        return jsonify({"error": "No symbol provided"}), 400

    stock = Stock.query.filter_by(symbol=symbol).first()
    if not stock:
        return jsonify({"error": f"Stock with symbol '{symbol}' not found"}), 404

    db.session.delete(stock)
    db.session.commit()
    return jsonify({"message": f"Deleted stock '{symbol}'"}), 200

    

if __name__ == '__main__':
    app.run(port=5050, debug=True)

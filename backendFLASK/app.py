from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

stocks = []

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask!")

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    return jsonify(stocks)

@app.route('/api/stocks', methods=['POST'])
def add_stock():
    data = request.get_json()
    stock = {
        "id": len(stocks) + 1,
        "symbol": data["symbol"].upper(),
        "purchase_price": data.get("purchase_price", 0),
        "quantity": data.get("quantity", 0),
        "name": data.get("name", "")
    }
    stocks.append(stock)
    return jsonify(stock), 201


if __name__ == '__main__':
    app.run(port=5050, debug=True)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint

db = SQLAlchemy()

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Float, nullable=False, default=100000.0)
    
    def to_dict(self):
        return {
            "id": self.id,
            "balance": self.balance
        }

class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(50), nullable=True)
    purchase_price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "symbol": self.symbol,
            "name": self.name,
            "purchase_price": self.purchase_price,
            "quantity": self.quantity
        }

class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    closing_price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id, 
            "symbol" : self.symbol,
            "date": self.date,
            "closing_price": self.closing_price
        }
    
class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), db.ForeignKey('stocks.id'), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    type = db.Column(db.String(4), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    purchase_price = db.Column(db.Float, nullable=False)

    __table_args__ = (
        CheckConstraint(
            "transaction_type IN ('BUY', 'SELL')",
            name='check_transaction_type_valid'
        ),
    )
from flask_sqlalchemy import SQLAlchemy

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
    id = db.Column(db.Integer, primary_key =True)
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
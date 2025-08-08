# Portfolio Manager - Team 04

A portfolio management application built with Flask and React. It tracks stock investments, calculates profit/loss, and shows performance over time using real-time data from Yahoo Finance.

## Technologies We Used

### **Backend**

#### **Flask**
- What it does: Web server and API endpoints
- Why we used it: This was the Python web framework taught in our training
- What we built with it: All the API routes that handle buying/selling stocks and getting data

#### **SQLAlchemy**
- What it does: Handles database operations  
- Why we used it: Makes it easier to work with databases in Python (taught in our coursework)
- What we built with it: All our database models and queries

#### **SQLite**
- What it does: Stores all our data
- Why we used it: Simple database that doesn't need setup, perfect for a training project
- What we store: Account balance, stock holdings, transaction history, price data for charts

#### **Flask-CORS**
- What it does: Lets our React app talk to our Flask server
- Why we needed it: React runs on port 3000, Flask runs on port 5050, so we need CORS to connect them
- How we use it: Automatically handles the cross-origin requests

#### **yfinance**
- What it does: Gets live stock prices and company info from Yahoo Finance
- Why we used it: The project specifications recommended using Yahoo Finance, and this library makes it easy
- What we get: Current stock prices, company names, historical data for our charts

### **Frontend**

#### **React**
- What it does: Builds our user interface 
- Why we used it: This was the frontend framework taught in our web development training
- What we built: All the components like the header, stock list, buy/sell forms, and charts

#### **Fetch API**
- What it does: Makes requests to our Flask backend
- Why we used it: Built into JavaScript, so no extra libraries needed
- How we use it: Gets account data, stock prices, submits buy/sell orders

#### **Chart.js**
- What it does: Creates the portfolio performance charts
- Why we chose it: Needed something to show portfolio performance over time visually
- What it shows: Line charts of portfolio value over the past month

#### **CSS**
- What it does: Makes everything look good and responsive
- How we use it: Styling all our components, making the layout work on different screen sizes

## How Everything Works Together

The basic flow is:
1. **React frontend** shows the user interface
2. **Fetch API** sends requests to our Flask backend  
3. **Flask** processes the requests and talks to the database
4. **SQLAlchemy** handles all database operations
5. **yfinance** gets live stock prices when needed
6. **Flask** sends JSON responses back to React
7. **React** updates the UI with new data

## Architecture

We built this as a typical web application:
- **Frontend (React)** - runs on localhost:3000
- **Backend (Flask)** - runs on localhost:5050  
- **Database (SQLite)** - stores all our data
- **External API (Yahoo Finance)** - provides live stock data

## Main Components

**Frontend Components:**
- **Header** - Shows portfolio balance, total value, and profit/loss
- **StockContainer** - Lists all your current stock holdings  
- **BuySellPopup** - Form to buy or sell stocks with live pricing
- **TransactionContainer** - History of all your trades
- **GraphContainer** - Charts showing portfolio performance over time

**Backend API Endpoints:**
- **Account management** - Get current cash balance
- **Stock operations** - Buy and sell stocks
- **Portfolio data** - Get holdings and performance  
- **Live pricing** - Search stocks and get current prices
- **Transaction history** - Record of all trades

**Database Tables:**
- **Account** - Your cash balance ($100,000 starting amount)
- **Stock** - Current holdings (symbol, quantity, average price)
- **Transactions** - Complete history of all buy/sell trades
- **Portfolio** - Historical price data for charts

## How Data Flows Through the App

**When you search for a stock:**
1. You type a symbol like "AAPL" in the buy/sell form
2. React sends a request to our Flask API
3. Flask uses yfinance to get live data from Yahoo Finance  
4. Current price and company info comes back and displays

**When you buy or sell:**
1. You submit the form with symbol and quantity
2. Flask checks if you have enough money (for buying) or own the stock (for selling)
3. Flask gets the current price from Yahoo Finance
4. Database gets updated with new balance and holdings
5. React refreshes all components to show the changes

**How profit/loss is calculated:**
- **Unrealized P&L**: Compares current stock prices to what you paid (calculated in React)
- **Realized P&L**: Tracks actual profits from completed sales using FIFO method (calculated in Flask)
- **Total P&L**: Adds both together to show your overall performance

## Database Setup

We use SQLite with four tables to store everything:

### **Account Table**
```sql
CREATE TABLE account (
    id INTEGER PRIMARY KEY,
    balance REAL NOT NULL DEFAULT 100000.0
);
```
This just stores your cash balance. Everyone starts with $100,000.

### **Stock Table**  
```sql
CREATE TABLE stock (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price REAL NOT NULL
);
```
This stores what stocks you currently own. The `purchase_price` is your average cost per share (it updates when you buy more of the same stock).

### **Transactions Table**
```sql
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price REAL NOT NULL,
    total_amount REAL NOT NULL,
    type VARCHAR(4) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
This keeps a permanent record of every buy/sell transaction. We need this for calculating realized profit/loss using the FIFO method.

Note: The `purchase_price` field means different things:
- For BUY transactions: the price you paid per share
- For SELL transactions: the price you sold at per share

### **Portfolio Table**
```sql
CREATE TABLE portfolio (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    date VARCHAR(10) NOT NULL,
    closing_price REAL NOT NULL
);
```
This stores historical daily prices for each stock you've owned. We use this data to create the performance charts.

## Features

- **Account Balance Management**: Start with $100,000, track spending and earnings
- **Live Stock Data**: Real-time prices from Yahoo Finance  
- **Buy/Sell Stocks**: Complete transaction system with live pricing
- **Profit/Loss Tracking**: 
  - Unrealized P&L: Paper gains/losses on current holdings
  - Realized P&L: Actual profits from completed sales (using FIFO method)
  - Total P&L: Combined view of all performance
- **Portfolio Charts**: Visual performance tracking over time
- **Transaction History**: Complete record of all trades
- **Real-time Updates**: Everything updates automatically after transactions

## Tech Stack

**Backend:**
- Flask - Python web framework  
- SQLAlchemy - Database ORM
- SQLite - Database storage
- yfinance - Yahoo Finance API

**Frontend:**
- React - User interface
- Chart.js - Portfolio charts  
- CSS - Styling
- Fetch API - API requests

## Getting Started
- **Live Stock Data**: Real-time pricing via Yahoo Finance API
- **P&L Analytics**: Complete profit/loss tracking with realized and unrealized gains/losses
  - **Unrealized P&L**: Current gains/losses on held positions
  - **Realized P&L**: Actual profits/losses from completed sales (FIFO method)
  - **Total P&L**: Combined view of all investment performance
- **Portfolio Analytics**: Portfolio allocation percentages and performance metrics
- **Transaction History**: Complete chronological record of all buy/sell operations with auto-refresh
- **Responsive UI**: Mobile-friendly design with real-time updates
- **Transaction Management**: Buy and sell stocks with ownership tracking and immediate UI updates

## Requirements

### Backend Dependencies
- Python 3.10+
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- yfinance (Yahoo Finance API)

### Frontend Dependencies
- Node.js 16+
- React 18+
- Chart.js (for visualization)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Xnan-blop/portfolio_manager_team04.git
cd portfolio_manager_team04
```

### 2. Backend Setup (Flask)
```bash
cd backendFLASK

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install flask flask-sqlalchemy flask-cors yfinance

# Run the backend server
python app.py
```

Backend will run on: `http://127.0.0.1:5050`

### 3. Frontend Setup (React)
```bash
cd portfolio-manager

# Install dependencies
npm install
npm install chart.js react-chartjs-2

# Start the React development server
npm start
```

Frontend will run on: `http://localhost:3000`

## Database Schema

The application uses **SQLite** for local development with automatic initialization and schema creation.

### **Schema Overview**
The database consists of four main tables that handle all portfolio management functionality:

### **Account Table** - User Balance Management
```sql
CREATE TABLE account (
    id INTEGER PRIMARY KEY,
    balance REAL NOT NULL DEFAULT 100000.0
);
```
**Purpose**: Tracks available cash for transactions
**Key Features**: Single record per user, automatically initialized with $100,000

### **Stock Table** - Portfolio Holdings
```sql
CREATE TABLE stock (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price REAL NOT NULL                -- Weighted average price per share
);
```
**Purpose**: Stores current stock holdings and weighted average purchase prices
**Key Features**: 
- Unique symbol entries (quantities are aggregated)
- Purchase price updated as weighted average on additional purchases
- Automatic removal when all shares are sold

### **Transaction Table** - Complete Trading History
```sql
CREATE TABLE transaction (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price REAL NOT NULL,               -- Price per share at time of transaction
    total_amount REAL NOT NULL,             -- Total transaction value (price × quantity)
    type VARCHAR(4) NOT NULL,               -- 'BUY' or 'SELL'
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Purpose**: Immutable record of all buy/sell transactions
**Key Features**:
- Complete audit trail of all trading activity
- **purchase_price field is context-dependent**:
  - For BUY transactions: Stores the actual purchase price per share
  - For SELL transactions: Stores the actual sale price per share
- Chronological ordering with precise timestamps
- Never modified or deleted (permanent history)

### **Portfolio Table** - Historical Performance Data
```sql
CREATE TABLE portfolio (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    date VARCHAR(10) NOT NULL,
    closing_price REAL NOT NULL
);
```
**Purpose**: Stores historical daily closing prices for portfolio performance tracking
**Key Features**: 
- Populated automatically on application startup
- 30-day historical data via Yahoo Finance API
- Used for portfolio performance charts and calculations

### **Database Features:**
- **Auto-initialization**: Database and tables created automatically on first run
- **Transaction Safety**: All buy/sell operations are atomic with rollback support
- **Data Integrity**: Foreign key relationships and constraints ensure data consistency
- **Local Development**: Each developer gets independent database instance
- **Reset Capability**: Delete `stocks.db` file to start fresh with clean $100,000 balance

**Note**: Database file (`stocks.db`) is automatically created in `backendFLASK/instance/` directory and is excluded from Git tracking.

**⚠️ Database Schema Update**: If you have an existing database, you'll need to delete the `stocks.db` file to start fresh. Your data will be reset but you'll start with a clean $100,000 balance.

## API Endpoints

### Base URL: `http://127.0.0.1:5050/api`

The backend provides a REST API built with Flask in `app.py`. This file contains our portfolio management system's business logic, database operations, and external API integrations.

### **Understanding app.py: The API Engine**

**File Location**: `backendFLASK/app.py`  
**Purpose**: Main Flask application containing all REST API endpoints for portfolio management  
**Key Features**: Database operations, Yahoo Finance integration, P&L calculations, transaction management

#### **Flask Application Setup (Lines 1-42)**
```python
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Stock, Account, Portfolio, Transactions
import yfinance as yf

app = Flask(__name__)
CORS(app)  # Enables frontend-backend communication across ports

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks.db'
db.init_app(app)

# Initialize database and starting account balance
with app.app_context():
    db.create_all()
    if not Account.query.first():
        account = Account(balance=100000.0)  # $100,000 starting balance
        db.session.add(account)
        db.session.commit()
```

**What this does:**
- Creates Flask application with CORS enabled for React frontend
- Connects to SQLite database and creates tables automatically
- Initializes account with $100,000 if no account exists
- Sets up yfinance integration for live stock data

#### **REST API Architecture**

Our API follows RESTful principles with clear HTTP methods and status codes:
- **GET**: Retrieve data (account info, stocks, transactions)
- **POST**: Create new resources (buy stocks)
- **DELETE**: Remove resources (sell stocks)
- **JSON**: All data exchanged in JSON format
- **Error Handling**: Good error messages when things go wrong

### **Complete API Endpoint Documentation**

#### 1. Account Management
**GET /account** - Retrieve current account balance
```http
GET /api/account
```
**Implementation in app.py (Lines 95-103)**:
```python
@app.route('/api/account')
def get_account():
    account = Account.query.first()
    if not account:
        account = Account(balance=100000.0)
        db.session.add(account)
        db.session.commit()
    return jsonify(account.to_dict()), 200
```
**Response:**
```json
{
    "balance": 95000.0,
    "id": 1
}
```
**Business Logic**: 
- Retrieves single account record from database
- Auto-creates account with $100,000 if none exists
- Used by frontend Header and BuySellPopup for balance validation

#### 2. Portfolio Holdings Management
**GET /stocks** - Get all owned stocks in portfolio
```http
GET /api/stocks
```
**Implementation in app.py (Lines 105-109)**:
```python
@app.route('/api/stocks', methods=['GET'])
def get_all_stocks():
    stocks = Stock.query.all()
    stock_list = [s.to_dict() for s in stocks]
    return jsonify(stock_list), 200
```
**Response:**
```json
[
    {
        "id": 1,
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "quantity": 10,
        "purchase_price": 150.0
    }
]
```
**Business Logic**:
- Queries Stock table for all current holdings
- Returns array of stock objects with weighted average prices (ACB)
- Used by Header for P&L calculations, StockContainer for display

#### 3. Live Stock Data Integration
**GET /search/{query}** - Search stocks with real-time pricing via Yahoo Finance
```http
GET /api/search/AAPL
```
**Implementation in app.py (Lines 71-93)**:
```python
@app.route('/api/search/<query>')
def search_stock(query):
    try:
        ticker = yf.Ticker(query.upper())
        info = ticker.info
        if info and 'symbol' in info:
            return jsonify({
                'symbol': info.get('symbol', query.upper()),
                'name': info.get('longName', 'Unknown'),
                'current_price': info.get('currentPrice', 0),
                'currency': info.get('currency', 'USD'),
                'industry': info.get('industry', 'N/A'),
                'sector': info.get('sector', 'N/A'),
                'volume': info.get('volume', 0),
                'pe_ratio': info.get('trailingPE', 0)
            })
        else:
            return jsonify({'error': 'Stock not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```
**Response:**
```json
{
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "current_price": 175.50,
    "currency": "USD",
    "previous_close": 173.20,
    "industry": "Technology",
    "sector": "Consumer Electronics",
    "volume": 45678900,
    "pe_ratio": 25.4,
    "eps": 6.90
}
```
**Business Logic**:
- Integrates with yfinance library to fetch live Yahoo Finance data
- Good error handling for invalid symbols or network issues
- Returns detailed stock information for frontend display
- Used by BuySellPopup for stock search and pricing, Header for unrealized P&L

#### 4. Stock Purchase Transactions
**POST /stocks** - Execute buy orders with ACB calculation
```http
POST /api/stocks
Content-Type: application/json

{
    "symbol": "AAPL",
    "quantity": 10
}
```
**Implementation in app.py (Lines 111-238)**:

**Key Business Logic Steps**:
1. **Input Validation**: Validates symbol, quantity, and data types
2. **Live Pricing**: Fetches current price from Yahoo Finance if not provided
3. **Balance Validation**: Checks sufficient funds before proceeding
4. **ACB Calculation**: Updates weighted average if stock already owned
5. **Database Updates**: Updates account balance, stock holdings, transaction history
6. **Atomic Operations**: All changes committed together or rolled back on error

```python
# Critical ACB calculation (Lines 185-190):
if stock:  # Stock already exists
    stock.quantity += quantity
    total_shares = stock.quantity
    old_cost = (stock.quantity - quantity) * stock.purchase_price
    new_total_cost = old_cost + total_cost
    stock.purchase_price = new_total_cost / total_shares  # Weighted average
```

**Success Response:**
```json
{
    "message": "Added new stock 'AAPL' with quantity 10",
    "stock": { "id": 1, "symbol": "AAPL", "quantity": 10, "purchase_price": 175.50 },
    "total_cost": 1755.00,
    "remaining_balance": 98245.00
}
```
**Error Response:**
```json
{
    "error": "Insufficient funds. Cost: $1755.00, Available: $1000.00"
}
```

#### 5. Stock Sale Transactions
**DELETE /stocks/delete_by_symbol** - Execute sell orders
```http
DELETE /api/stocks/delete_by_symbol
Content-Type: application/json

{
    "symbol": "AAPL",
    "quantity": 5
}
```
**Implementation in app.py (Lines 240-334)**:

**Key Business Logic Steps**:
1. **Ownership Validation**: Verifies stock exists and sufficient quantity
2. **Live Market Pricing**: Gets current price for sale execution
3. **Proceeds Calculation**: Calculates sale proceeds and adds to account
4. **P&L Calculation**: Shows profit/loss based on ACB vs sale price
5. **Position Management**: Updates or removes stock based on remaining shares
6. **Transaction Recording**: Creates permanent sell record in database

**Success Response:**
```json
{
    "message": "Sold 5 shares of 'AAPL', remaining: 5",
    "sale_proceeds": 877.50,
    "current_price": 175.50,
    "profit_loss": 127.50,
    "remaining_balance": 98122.50,
    "remaining_shares": 5
}
```

#### 6. Transaction History
**GET /transactions** - Complete transaction history with audit trail
```http
GET /api/transactions
```
**Implementation in app.py (Lines 423-441)**:
```python
@app.route('/api/transactions', methods=['GET'])
def get_transaction_history():
    transactions = Transactions.query.order_by(
        Transactions.date.desc(), 
        Transactions.id.desc()
    ).all()
    
    transaction_list = []
    for transaction in transactions:
        total_amount = transaction.quantity * transaction.unit_price
        transaction_data = transaction.to_dict()
        transaction_data['total_amount'] = round(total_amount, 2)
        transaction_list.append(transaction_data)
    
    return jsonify(transaction_list), 200
```
**Response:**
```json
[
    {
        "id": 3,
        "symbol": "AAPL",
        "quantity": 5,
        "purchase_price": 175.50,  // This is the SALE price (since type=SELL)
        "total_amount": 877.50,
        "type": "SELL",
        "date": "2025-08-06T14:30:15.123456"
    },
    {
        "id": 2,
        "symbol": "AAPL",
        "quantity": 10,
        "purchase_price": 150.00,  // This is the BUY price (since type=BUY)
        "total_amount": 1500.00,
        "type": "BUY",
        "date": "2025-08-06T10:15:30.654321"
    }
]
```
**Business Logic**:
- Returns complete chronological history ordered by newest first
- Calculates total_amount for each transaction dynamically
- Provides immutable audit trail for all trading activity

#### 7. Realized Profit/Loss Calculation (FIFO Method)
**GET /portfolio/realized-pnl** - Calculate total realized P&L using FIFO
```http
GET /api/portfolio/realized-pnl
```
**Implementation in app.py (Lines 443-502)**:

**Complex FIFO Algorithm**:
```python
# Track positions for each symbol
positions = {}  # symbol: [{'quantity': 100, 'price': 150}, ...]

for transaction in transactions:
    if transaction.type == 'BUY':
        # Add to position list
                positions[symbol].append({
                    'quantity': transaction.quantity,
                    'price': transaction.purchase_price
                })    elif transaction.type == 'SELL':
        # Match sales to oldest purchases (FIFO)
        while quantity_to_sell > 0 and positions[symbol]:
            oldest_position = positions[symbol][0]
            
            if oldest_position['quantity'] <= quantity_to_sell:
                # Sell entire oldest position
                realized_pnl = (sale_price - oldest_position['price']) * oldest_position['quantity']
                total_realized_pnl += realized_pnl
                positions[symbol].pop(0)  # Remove sold position
            else:
                # Partial sale of oldest position
                realized_pnl = (sale_price - oldest_position['price']) * quantity_to_sell
                oldest_position['quantity'] -= quantity_to_sell
```

**Response:**
```json
{
    "total_realized_pnl": 1250.75
}
```
**Business Logic**:
- Implements First In, First Out accounting method
- Matches each sale to specific purchase lots chronologically
- Provides tax-compliant P&L calculation
- Used by Header component for complete P&L display

#### 8. Portfolio Performance Tracking
**GET /portfolio/value** - Historical portfolio performance data
```http
GET /api/portfolio/value
```
**Implementation in app.py (Lines 336-421)**:

**Complex Algorithm Overview**:
1. **Historical Reconstruction**: Rebuilds portfolio state for each trading day
2. **Date Processing**: Groups transactions by date for daily snapshots
3. **Position Tracking**: Maintains running totals of holdings per symbol
4. **Price Integration**: Uses stored historical prices from Portfolio table
5. **Value Calculation**: Computes total portfolio value for each day

**Response:**
```json
[
    {
        "date": "2025-08-01",
        "total_value": 98500.00
    },
    {
        "date": "2025-08-02", 
        "total_value": 99250.00
    }
]
```
**Business Logic**:
- Reconstructs complete portfolio history day by day
- Used by GraphContainer for performance visualization
- Integrates with historical price data from Yahoo Finance

## Yahoo Finance Integration

We use the `yfinance` Python library to get real-time stock data from Yahoo Finance.

### Why Yahoo Finance?
- The project specifications recommended using Yahoo Finance as our data source
- yfinance library was suggested in our training materials  
- It's free and doesn't require API keys
- Provides live stock prices, company information, and historical data
- Easy to integrate with Python/Flask

### What We Get From It:
- **Live stock prices** - for buying/selling at current market rates
- **Company information** - names, sectors, financial metrics
- **Historical data** - for our portfolio performance charts
- **Stock validation** - confirms if a stock symbol exists

### How We Use It:
1. **Stock search** - when you type "AAPL", we verify it exists and get current price
2. **Buy/sell transactions** - we get the live price at the moment of purchase/sale
3. **Portfolio valuation** - we fetch current prices to calculate your unrealized P&L
4. **Charts** - we download historical prices to show portfolio performance over time

The integration is straightforward - our Flask backend calls yfinance functions, gets the data back as Python objects, and sends it to our React frontend as JSON.

#### **Technical Implementation Details**

**1. Stock Search & Real-Time Pricing**
```python
# app.py - Lines 71-93
@app.route('/api/search/<query>')
def search_stock(query):
    try:
        ticker = yf.Ticker(query.upper())  # Create yfinance ticker object
        info = ticker.info                 # Fetch detailed stock data
        
        if info and 'symbol' in info:
            return jsonify({
                'symbol': info.get('symbol', query.upper()),
                'name': info.get('longName', 'Unknown'),
                'current_price': info.get('currentPrice', 0),      # Live price
                'previous_close': info.get('previousClose', 0),
                'volume': info.get('volume', 0),                   # Trading volume
                'pe_ratio': info.get('trailingPE', 0),            # Financial metrics
                'industry': info.get('industry', 'N/A'),          # Company details
                'sector': info.get('sector', 'N/A'),
                'currency': info.get('currency', 'USD')
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

**Data Retrieved Per Request:**
- **Live Pricing**: `currentPrice`, `previousClose` for immediate trading decisions
- **Company Information**: `longName`, `industry`, `sector` for investment research
- **Financial Metrics**: `trailingPE`, `volume`, `dividendYield` for analysis
- **Metadata**: `currency`, `symbol` for proper formatting and validation

**2. Transaction Pricing Integration**
```python
# app.py - Buy stock functionality with live pricing
def add_stock():
    # Get current price from Yahoo Finance if not provided
    if not purchase_price:
        stock_ticker = yf.Ticker(symbol)
        info = stock_ticker.info
        current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))
        
        if current_price == 0:
            # Fallback to recent history if current price unavailable
            hist = stock_ticker.history(period='1d')
            if not hist.empty:
                current_price = float(hist['Close'].iloc[-1])
        
        purchase_price = current_price
```

**Real-Time Features:**
- **Immediate Pricing**: Every buy/sell uses live market prices
- **Fallback Systems**: Multiple data sources ensure reliability
- **Price Validation**: Verifies prices > 0 before transactions
- **Currency Support**: Handles international stocks and currencies

**3. Historical Data Population for Charts**
```python
# app.py - Automatic historical data loading
def update_stock_closing_prices(symbol):
    """Fetches closing prices for portfolio performance charts"""
    price_data = yf.download(symbol, period='1mo')['Close']  # 30 days of data
    
    for date, price in price_data.iterrows():
        date_str = date.strftime('%Y-%m-%d')
        
        # Store in Portfolio table for chart generation
        if not Portfolio.query.filter_by(symbol=symbol, date=date_str).first():
            db.session.add(Portfolio(
                symbol=symbol, 
                date=date_str, 
                closing_price=price
            ))
```

**Chart Data Features:**
- **30-Day History**: Sufficient data for performance trend analysis
- **Daily Closing Prices**: Standard format for financial charts
- **Automatic Population**: New stocks automatically get historical data
- **Incremental Updates**: Only missing dates are downloaded

#### **Real-Time Data Usage Throughout Application**

**1. Frontend Header Component P&L Calculation**
```javascript
// Header.js - Real-time portfolio valuation
for (const stock of stocksData) {
    try {
        // Live price API call for each holding
        const priceResponse = await fetch(`/api/search/${stock.symbol}`);
        const priceData = await priceResponse.json();
        
        if (priceResponse.ok) {
            // Use live current price for unrealized P&L
            totalCurrentValue += priceData.current_price * stock.quantity;
        } else {
            // Fallback to stored ACB if live price fails
            totalCurrentValue += stock.purchase_price * stock.quantity;
        }
    } catch {
        // Error handling ensures UI never breaks
        totalCurrentValue += stock.purchase_price * stock.quantity;
    }
}

// Unrealized P&L = Live Market Value - Average Cost Basis
const unrealizedPnL = totalCurrentValue - totalInvested;
```

**2. Buy/Sell Popup Live Pricing**
```javascript
// BuySellPopup.js - Stock search with live data
const handleStockSearch = async (symbol) => {
    const response = await fetch(`/api/search/${symbol}`);
    const stockData = await response.json();
    
    // Display live price, company info, and financial metrics
    setCurrentPrice(stockData.current_price);
    setCompanyName(stockData.name);
    setStockDetails({
        sector: stockData.sector,
        industry: stockData.industry,
        peRatio: stockData.pe_ratio,
        volume: stockData.volume
    });
};
```

#### **Error Handling & Reliability**

**Multi-Level Fallback System:**
```python
# Primary: Current price from info
current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))

# Secondary: Recent trading history
if current_price == 0:
    hist = stock_ticker.history(period='1d')
    if not hist.empty:
        current_price = float(hist['Close'].iloc[-1])

# Tertiary: Error response with helpful message
else:
    return jsonify({"error": "Could not retrieve current price"}), 400
```

**Reliability Features:**
- **Multiple Data Sources**: `currentPrice`, `regularMarketPrice`, recent history
- **Graceful Degradation**: App continues working even if Yahoo Finance is down
- **Error Messaging**: Clear feedback when data is unavailable
- **Timeout Handling**: Prevents hanging requests from blocking transactions

#### **Performance Optimizations**

**1. Startup Data Loading with Empty Check**
```python
# app.py - Only download when stocks exist to prevent errors
ALL_TIME_STOCKS = [s.symbol for s in Stock.query.all()]

if ALL_TIME_STOCKS:  # Prevents yfinance crash on empty portfolio
    price_data = yf.download(ALL_TIME_STOCKS, period='1mo')['Close']
    # Process and store historical data
```

**2. Batch Processing for Multiple Stocks**
```python
# Download multiple stocks at once for efficiency
price_data = yf.download(['AAPL', 'GOOGL', 'MSFT'], period='1mo')
```

**3. Caching Strategy**
- **Database Storage**: Historical prices stored locally in Portfolio table
- **Session Persistence**: Recent price lookups cached during user session
- **Incremental Updates**: Only missing data downloaded, not full history

#### **Data Quality & Validation**

**Input Validation:**
```python
# Symbol validation before API call
symbol = data["symbol"].upper().strip()
if not symbol or len(symbol) > 10:
    return jsonify({"error": "Invalid symbol format"}), 400
```

**Data Quality Checks:**
```python
# Validate returned data before using
if info and 'symbol' in info and info.get('currentPrice', 0) > 0:
    # Data is valid, proceed with transaction
else:
    return jsonify({'error': 'Stock not found or invalid'}), 404
```

**Price Validation:**
- **Positive Prices**: Ensures all prices > 0 before transactions
- **Symbol Verification**: Confirms returned symbol matches request
- **Data Completeness**: Validates required fields before processing

#### **Integration Benefits Summary**

**For Users:**
- **Real-Time Accuracy**: Portfolio values update with live market prices
- **High Quality Data**: Same data used by major financial platforms
- **Detailed Information**: Company info and financial data for making decisions
- **Global Access**: Support for international stocks and currencies

**For Developers:**
- **Simple Integration**: Single Python library handles all API complexity
- **No Authentication**: No API keys or tokens to manage
- **Rich Documentation**: Well-documented library with examples
- **Active Community**: Large user base and ongoing development

**For Business:**
- **Cost Effective**: Free access eliminates recurring API costs
- **Expandable**: Can handle more users without limits
- **Reliable**: Yahoo Finance stability and uptime
- **Good Source**: Reliable financial data source

### **API Integration Patterns**

#### **Frontend-Backend Communication Flow**:
```
React Frontend (Port 3000)
  ↓ HTTP Requests
Flask Backend (Port 5050)
  ↓ Database Queries  
SQLite Database
  ↓ External API Calls
Yahoo Finance (yfinance)
```

#### **Error Handling Strategy**:
- **400 Bad Request**: Invalid input data or insufficient funds
- **404 Not Found**: Stock symbol not found or doesn't exist
- **500 Internal Server Error**: Database errors or Yahoo Finance API failures
- **Structured Responses**: All errors return JSON with descriptive messages

#### **Data Validation Pipeline**:
1. **Input Sanitization**: Validates and converts data types
2. **Business Rule Validation**: Checks account balances, stock ownership
3. **External API Validation**: Verifies stock symbols exist
4. **Database Constraint Validation**: Ensures data integrity
5. **Response Formatting**: Standardizes all API responses

### **API Features Summary**:
- **CORS Enabled**: Frontend-backend communication across different ports
- **Real-time Data**: Live stock prices via Yahoo Finance integration
- **Transaction Integrity**: Atomic operations with rollback support
- **Good Logging**: Detailed error messages for debugging
- **RESTful Design**: Standard HTTP methods and status codes
- **JSON Communication**: All data exchanged in structured JSON format

#### 5. Transaction History
**GET /transactions** - Complete transaction history
```http
GET /transactions
```
**Response:**
```json
[
    {
        "id": 3,
        "symbol": "AAPL",
        "quantity": 5,
        "purchase_price": 175.50,
        "total_amount": 877.50,
        "type": "SELL",
        "date": "2025-08-06T14:30:15.123456"
    },
    {
        "id": 2,
        "symbol": "AAPL",
        "quantity": 10,
        "purchase_price": 150.00,
        "total_amount": 1500.00,
        "type": "BUY",
        "date": "2025-08-06T10:15:30.654321"
    }
]
```
**Features**: Ordered by date (newest first), includes complete transaction details
**Used by**: TransactionContainer for history display

#### 6. Portfolio Performance
**GET /portfolio/value** - Historical portfolio performance data
```http
GET /portfolio/value
```
**Response:**
```json
[
    {
        "date": "2025-08-01",
        "total_value": 98500.00
    },
    {
        "date": "2025-08-02", 
        "total_value": 99250.00
    }
]
```
**Used by**: GraphContainer for performance charts

#### 7. Realized Profit/Loss
**GET /portfolio/realized-pnl** - Calculate total realized P&L from completed transactions
```http
GET /portfolio/realized-pnl
```
**Response:**
```json
{
    "total_realized_pnl": 1250.75
}
```
**Features**: Uses FIFO (First In, First Out) method for accurate P&L calculation
**Used by**: Header component for complete P&L display

### **API Features:**
- **CORS Enabled**: Frontend-backend communication from different ports
- **Error Handling**: Good error responses with detailed messages
- **Input Validation**: Server-side validation for all transactions
- **Real-time Data**: Live stock prices via Yahoo Finance integration
- **Transaction Integrity**: Atomic operations for buy/sell with rollback support

## Yahoo Finance API Integration (yfinance)

### **Overview**
The application integrates with Yahoo Finance through the **yfinance** Python library to provide real-time stock market data. This integration enables live stock prices, company information, and historical data without requiring API keys or rate limits.

### **How It Works**

#### **1. Installation & Import**
```python
# Backend dependency
pip install yfinance

# Import in app.py
import yfinance as yf
```

#### **2. Stock Search & Live Data Fetching**
The main integration happens in the `/api/search/<query>` endpoint:

```python
@app.route('/api/search/<query>')
def search_stock(query):
    try:
        # Create ticker object from user query
        ticker = yf.Ticker(query.upper())
        
        # Fetch detailed stock information
        info = ticker.info
        
        # Return structured data to frontend
        return jsonify({
            'symbol': info.get('symbol', query.upper()),
            'name': info.get('longName', 'Unknown'),
            'current_price': info.get('currentPrice', 0),
            'currency': info.get('currency', 'USD'),
            'previous_close': info.get('previousClose', 0),
            'industry': info.get('industry', 'N/A'),
            'sector': info.get('sector', 'N/A'),
            'beta': info.get('beta', 0),
            'dividend_yield': info.get('dividendYield', 0),
            'volume': info.get('volume', 0),
            'pe_ratio': info.get('trailingPE', 0),
            'eps': info.get('trailingEps', 0)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

#### **3. Historical Data for Portfolio Performance**
On application startup, the system fetches 30-day historical data:

```python
# Get all owned stock symbols
symbols = [s.symbol for s in Stock.query.all()]

# Download 1-month historical closing prices
price_data = yf.download(symbols, period='1mo')['Close']

# Store in database for chart visualization
for date, prices in price_data.iterrows():
    for symbol in symbols:
        portfolio_entry = Portfolio(
            symbol=symbol, 
            date=date.strftime('%Y-%m-%d'), 
            closing_price=prices[symbol]
        )
        db.session.add(portfolio_entry)
```

#### **4. Real-time Price Fetching for Transactions**
When buying stocks, the system fetches current market price:

```python
# During buy transactions
stock_ticker = yf.Ticker(symbol)
info = stock_ticker.info
current_price = info.get('currentPrice', info.get('regularMarketPrice', 0))

# Use this price for transaction calculations
total_cost = current_price * quantity
```

### **Data Sources & Accuracy**

#### **Yahoo Finance Data Points**
- **Real-time Prices**: Current market price and previous close
- **Company Info**: Name, industry, sector, business description
- **Financial Metrics**: P/E ratio, EPS, beta, dividend yield
- **Trading Data**: Volume, market cap, price changes
- **Historical Data**: Daily closing prices for portfolio charts

#### **Data Reliability**
- **Live Data**: Updated during market hours (9:30 AM - 4:00 PM EST)
- **After Hours**: May show delayed or previous close prices
- **Weekends**: Shows Friday's closing data
- **International Stocks**: Supports global exchanges (NYSE, NASDAQ, etc.)

### **Frontend Integration Flow**

#### **Stock Search Process**
```
User Types Symbol (e.g., "AAPL")
  ↓
Frontend: fetch('/api/search/AAPL')
  ↓
Backend: yf.Ticker('AAPL').info
  ↓
Yahoo Finance API Call
  ↓
Return Live Stock Data
  ↓
Frontend: Display in BuySellPopup
```

#### **Buy Transaction with Live Pricing**
```
User Clicks "Buy 10 shares"
  ↓
Frontend: POST /api/stocks {symbol: "AAPL", quantity: 10}
  ↓
Backend: yf.Ticker('AAPL').info['currentPrice']
  ↓
Calculate: total_cost = current_price × 10
  ↓
Validate: account_balance >= total_cost
  ↓
Execute Transaction & Update Database
```

### **Error Handling & Fallbacks**

#### **Network Issues**
```python
try:
    ticker = yf.Ticker(symbol)
    info = ticker.info
    if not info or 'symbol' not in info:
        return jsonify({'error': 'Stock not found'}), 404
except Exception as e:
    return jsonify({'error': 'Network error fetching stock data'}), 500
```

#### **Invalid Symbols**
- Invalid ticker symbols return structured error messages
- Frontend displays user-friendly error notifications
- Graceful fallback to prevent application crashes

#### **Market Closure**
- System continues to work with last available prices
- Historical data remains accessible for analysis
- Clear indication when live data isn't available

### **Performance Optimizations**

#### **Caching Strategy**
- Historical data cached in database (Portfolio table)
- Avoids repeated API calls for chart data
- Live prices fetched only when needed (search/transactions)

#### **Batch Requests**
```python
# Efficient batch download for multiple stocks
symbols = ['AAPL', 'GOOGL', 'MSFT']
data = yf.download(symbols, period='1mo')
```

#### **Minimal API Calls**
- Stock search: Only when user actively searches
- Transaction pricing: Only during buy/sell operations
- Historical data: Only on application startup

### **Advantages of yfinance Integration**

1. **No API Keys Required**: Free access to Yahoo Finance data
2. **No Rate Limits**: Suitable for development and moderate usage
3. **Rich Data**: Detailed financial information beyond just prices
4. **Easy Implementation**: Simple Python library with minimal setup
5. **Real-time Updates**: Live market data during trading hours
6. **Global Coverage**: Supports international stock exchanges
7. **Historical Data**: Access to years of historical price data

### **Limitations & Considerations**

1. **Yahoo Finance Dependency**: Relies on Yahoo's data availability
2. **Unofficial API**: Not officially supported by Yahoo Finance
3. **Rate Limiting**: Potential throttling with excessive requests
4. **Data Delays**: May have slight delays during high market volatility
5. **Network Dependency**: Requires internet connection for live data

## How We Calculate Profit and Loss (P&L)

The app tracks your gains and losses in two ways:

1. **Realized P&L**: Actual profit/loss from stocks you've sold
2. **Unrealized P&L**: Current paper gains/losses on stocks you still own

### Realized P&L - When You Sell Stocks

When you sell shares, we use FIFO (First In, First Out) to calculate your profit or loss. This means we match your sale to your oldest purchases first.

**Example:**
- Day 1: Buy 100 AAPL at $150
- Day 2: Buy 50 AAPL at $160  
- Day 3: Sell 75 AAPL at $170

The 75 shares sold come from your Day 1 purchase (the oldest), so:
- Profit = ($170 - $150) × 75 = $1,500

We chose FIFO because it's simple, fair, and follows standard accounting practices.

#### How FIFO Works Step-by-Step (With Code)

**The Challenge**: When you sell shares, which specific shares are you selling? The ones you bought at $150 or $160?

**Our Solution**: Always sell the oldest shares first (FIFO = First In, First Out)

**Backend Implementation** (in `calculate_realized_pnl()` function):

```python
def calculate_realized_pnl():
    # Step 1: Get all transactions in chronological order
    transactions = db.session.query(Transaction).order_by(Transaction.transaction_date).all()
    
    # Step 2: Track purchases for each stock symbol
    positions = {}  # Will store: {'AAPL': [{'quantity': 100, 'price': 150}, ...]}
    total_realized_pnl = 0
    
    # Step 3: Process each transaction one by one
    for transaction in transactions:
        symbol = transaction.symbol
        
        if transaction.transaction_type == 'BUY':
            # Add this purchase to our tracking
            if symbol not in positions:
                positions[symbol] = []
            positions[symbol].append({
                'quantity': transaction.quantity,
                'price': transaction.unit_price
            })
            
        elif transaction.transaction_type == 'SELL':
            # Use FIFO to match against oldest purchases
            quantity_to_sell = transaction.quantity
            sale_price = transaction.unit_price
            
            # Keep selling from oldest purchases until we've sold everything
            while quantity_to_sell > 0 and positions[symbol]:
                oldest_purchase = positions[symbol][0]  # Always take the first (oldest)
                
                if oldest_purchase['quantity'] <= quantity_to_sell:
                    # We can sell this entire old purchase
                    profit = (sale_price - oldest_purchase['price']) * oldest_purchase['quantity']
                    total_realized_pnl += profit
                    quantity_to_sell -= oldest_purchase['quantity']
                    positions[symbol].pop(0)  # Remove this purchase completely
                else:
                    # We only sell part of this old purchase
                    profit = (sale_price - oldest_purchase['price']) * quantity_to_sell
                    total_realized_pnl += profit
                    oldest_purchase['quantity'] -= quantity_to_sell
                    quantity_to_sell = 0
    
    return total_realized_pnl
```

**Real Example - FIFO in Action:**

Let's say you have this purchase history:
```
positions['AAPL'] = [
    {'quantity': 100, 'price': 150},  # Your first purchase
    {'quantity': 50, 'price': 160}    # Your second purchase
]
```

Now you sell 75 shares at $170:

```python
quantity_to_sell = 75
sale_price = 170

# First loop iteration:
oldest_purchase = {'quantity': 100, 'price': 150}
# Since 100 > 75, we only sell part of this purchase:
profit = (170 - 150) * 75 = $1,500
oldest_purchase becomes {'quantity': 25, 'price': 150}  # 100 - 75 = 25 left
quantity_to_sell = 0  # We're done selling

# Final result:
positions['AAPL'] = [
    {'quantity': 25, 'price': 150},   # Leftover from first purchase
    {'quantity': 50, 'price': 160}    # Second purchase untouched
]
Total realized P&L: $1,500
```

### Unrealized P&L - Your Current Holdings

This shows how much you'd gain or lose if you sold everything today. We calculate it by comparing current market prices to your average cost per stock.

**How it works:**
1. Get your current holdings from the database
2. Fetch live prices from Yahoo Finance API
3. Calculate: (Current Price × Quantity) - (Your Average Cost × Quantity)

**Example:**
- You own 100 AAPL shares with average cost of $150
- Current AAPL price is $175
- Unrealized P&L = ($175 - $150) × 100 = $2,500 profit

#### Frontend Implementation - Step by Step

**Why Frontend?** Unrealized P&L needs to update constantly as stock prices change, so we calculate it in React where it can refresh in real-time.

**Code Walkthrough** (from Header.js component):

```javascript
const fetchAccountInfo = async () => {
    try {
        // Step 1: Get your current stock holdings (with ACB data)
        const stocksResponse = await fetch('http://127.0.0.1:5050/api/stocks');
        const stocksData = await stocksResponse.json();
        // Returns: [{symbol: "AAPL", quantity: 100, unit_price: 150.00}, ...]
        
        // Step 2: Calculate how much you've invested total (using ACB)
        let totalInvested = 0;
        for (const stock of stocksData) {
            totalInvested += (stock.unit_price * stock.quantity);
            // Example: (150.00 * 100) = $15,000 for AAPL
        }
        
        // Step 3: Get current market value using live prices
        let totalCurrentValue = 0;
        for (const stock of stocksData) {
            try {
                // Call our backend, which calls Yahoo Finance
                const priceResponse = await fetch(`http://127.0.0.1:5050/api/search/${stock.symbol}`);
                const priceData = await priceResponse.json();
                
                if (priceResponse.ok) {
                    // Use live current price
                    totalCurrentValue += priceData.current_price * stock.quantity;
                    // Example: (175.00 * 100) = $17,500 for AAPL
                } else {
                    // Fallback if API fails: use your original purchase price
                    totalCurrentValue += stock.unit_price * stock.quantity;
                }
            } catch (error) {
                // If Yahoo Finance is down, use your purchase price
                totalCurrentValue += stock.unit_price * stock.quantity;
            }
        }
        
        // Step 4: Store the results for display
        setAccountInfo({
            totalInvested: totalInvested,      // What you paid (ACB method)
            totalValue: totalCurrentValue,     // What it's worth now
            // ... other data
        });
        
    } catch (error) {
        console.error('Error fetching account info:', error);
    }
};

// Step 5: Calculate unrealized P&L for display
const unrealizedPnL = accountInfo.totalValue - accountInfo.totalInvested;
// Example: $17,500 - $15,000 = $2,500 profit
```

**Real Example with Multiple Stocks:**

```javascript
// Your current holdings (from database):
stocksData = [
    {symbol: "AAPL", quantity: 100, unit_price: 150.00},  // ACB from all purchases
    {symbol: "GOOGL", quantity: 25, unit_price: 2700.00}, // ACB from all purchases
    {symbol: "MSFT", quantity: 50, unit_price: 380.00}    // ACB from all purchases
];

// Step 2: Calculate total invested
totalInvested = (150.00 * 100) + (2700.00 * 25) + (380.00 * 50);
//            = $15,000 + $67,500 + $19,000 = $101,500

// Step 3: Get current prices and calculate current value
// (Assume live prices: AAPL=$175, GOOGL=$2850, MSFT=$390)
totalCurrentValue = (175.00 * 100) + (2850.00 * 25) + (390.00 * 50);
//                = $17,500 + $71,250 + $19,500 = $108,250

// Step 5: Calculate unrealized P&L
unrealizedPnL = $108,250 - $101,500 = $6,750 profit

// Breakdown by stock:
// AAPL: ($175 - $150) * 100 = $2,500 profit
// GOOGL: ($2850 - $2700) * 25 = $3,750 profit  
// MSFT: ($390 - $380) * 50 = $500 profit
// Total: $6,750 profit
```

### Average Cost Basis (ACB) - How We Track Your Purchase Price

When you buy more shares of the same stock at different prices, we calculate a weighted average. This becomes your "cost basis" for that stock.

**Simple Example:**
- Buy 50 AAPL at $140 = $7,000 total
- Buy 50 AAPL at $160 = $8,000 total
- Average cost = ($7,000 + $8,000) ÷ 100 shares = $150 per share

This average cost is stored in the database and used for unrealized P&L calculations.

#### Backend ACB Calculation (When You Buy Stocks)

**Location**: `add_stock()` function in app.py

```python
def add_stock():
    # ... validation code ...
    
    # Check if you already own this stock
    stock = Stock.query.filter_by(symbol=symbol).first()
    
    if stock:
        # You already own this stock - update ACB
        old_quantity = stock.quantity
        old_total_cost = old_quantity * stock.unit_price  # What you spent before
        
        new_quantity = quantity  # Shares you're buying now
        new_total_cost = quantity * unit_price  # What you're spending now
        
        # Calculate new ACB
        total_shares = old_quantity + new_quantity
        total_cost = old_total_cost + new_total_cost
        new_acb = total_cost / total_shares
        
        # Update database
        stock.quantity = total_shares
        stock.unit_price = new_acb  # This is your new average cost
        
    else:
        # First time buying this stock - ACB equals purchase price
        stock = Stock(symbol=symbol, quantity=quantity, unit_price=unit_price, name=name)
        db.session.add(stock)
```

**Real Example - Multiple Purchases:**

Let's say you buy AAPL three times:

```python
# Purchase 1: Buy 100 AAPL at $140
# Database: AAPL: quantity=100, unit_price=$140.00

# Purchase 2: Buy 50 AAPL at $160
# ACB Calculation:
old_total_cost = 100 * 140 = $14,000
new_total_cost = 50 * 160 = $8,000
total_cost = $14,000 + $8,000 = $22,000
total_shares = 100 + 50 = 150
new_acb = $22,000 / 150 = $146.67

# Database: AAPL: quantity=150, unit_price=$146.67

# Purchase 3: Buy 25 AAPL at $180
# ACB Calculation:
old_total_cost = 150 * 146.67 = $22,000
new_total_cost = 25 * 180 = $4,500
total_cost = $22,000 + $4,500 = $26,500
total_shares = 150 + 25 = 175
new_acb = $26,500 / 175 = $151.43

# Final Database: AAPL: quantity=175, unit_price=$151.43
```

**Important**: ACB only changes when you BUY more shares. When you sell shares, the ACB stays the same because you're selling from the same "pool" of shares at the same average cost.

**Why Use ACB for Unrealized P&L?**
- **Simplicity**: One price per stock instead of tracking every individual purchase
- **Real-time Performance**: Fast calculation for live dashboard updates  
- **Standard Practice**: Most investment apps show unrealized P&L this way
- **Easy to Understand**: Clear comparison between average cost and current price
- **Real-Time Performance**: Fast calculation suitable for live updates
- **Standard Practice**: Most brokerages show unrealized P&L using average cost
- **User Friendly**: Easier to understand than complex FIFO matching

### **Part 3: Total P&L Calculation - Where Both Methods Come Together**

**Location**: Frontend Header.js component (lines 77-84)
**Purpose**: Combines both realized (FIFO) and unrealized (ACB) P&L calculations into a single performance summary

#### **Complete Data Flow and Calculation Process**

**Step 1: Gather Data from Multiple Sources**
```javascript
const fetchAccountInfo = async () => {
    // Source 1: Get realized P&L from backend (FIFO calculation)
    const realizedPnLResponse = await fetch('http://127.0.0.1:5050/api/portfolio/realized-pnl');
    const realizedPnLData = await realizedPnLResponse.json();
    
    // Source 2: Get current holdings (ACB data from Stock table)
    const stocksResponse = await fetch('http://127.0.0.1:5050/api/stocks');
    const stocksData = await stocksResponse.json();
    
    // Source 3: Calculate invested amount using ACB
    let totalInvested = 0;
    for (const stock of stocksData) {
        totalInvested += (stock.unit_price * stock.quantity);  // ACB × quantity
    }
    
    // Source 4: Get current market values using live prices
    let totalCurrentValue = 0;
    for (const stock of stocksData) {
        const priceResponse = await fetch(`http://127.0.0.1:5050/api/search/${stock.symbol}`);
        const priceData = await priceResponse.json();
        totalCurrentValue += priceData.current_price * stock.quantity;
    }
    
    // Store all data for calculations
    setAccountInfo({
        totalInvested: totalInvested,           // ACB cost basis
        totalValue: totalCurrentValue,          // Live market value
        realizedPnL: realizedPnLData.total_realized_pnl  // FIFO result from backend
    });
};
```

**Step 2: Combine Both P&L Methods (The Integration Point)**
```javascript
// Frontend calculation combining both methods
const unrealizedPnL = accountInfo.totalValue - accountInfo.totalInvested;  // ACB method
const totalPnL = unrealizedPnL + accountInfo.realizedPnL;                 // Combined result

// Calculate percentage for complete performance view
const totalEverInvested = accountInfo.totalInvested + Math.max(0, accountInfo.realizedPnL);
const totalPnLPercentage = totalEverInvested > 0 ? (totalPnL / totalEverInvested) * 100 : 0;
```

#### **Real-World Example: Complete P&L Integration**

**Scenario**: Portfolio with both completed sales and current holdings

**Background Trading History:**
```
Day 1: Buy 100 AAPL at $140 = $14,000
Day 2: Buy 50 AAPL at $160 = $8,000  → ACB now $146.67
Day 3: Buy 25 GOOGL at $2700 = $67,500
Day 4: Sell 75 AAPL at $170 = $12,750 (realized gain using FIFO)
```

**Current State in Database:**
```
Stock Table (current holdings):
- AAPL: 75 shares at $146.67 ACB
- GOOGL: 25 shares at $2700.00 ACB

Transactions Table (FIFO calculation):
- Realized P&L from AAPL sale: +$1,750 (calculated by backend)
```

**Step-by-Step Frontend Integration:**

**1. Data Collection:**
```javascript
// From backend API calls:
accountInfo = {
    totalInvested: (75 × 146.67) + (25 × 2700) = $78,500    // ACB method
    totalValue: (75 × 180) + (25 × 2850) = $84,750          // Live prices
    realizedPnL: 1750                                        // FIFO from backend
}
```

**2. P&L Calculations:**
```javascript
// Unrealized P&L (ACB method)
const unrealizedPnL = 84750 - 78500;  // = $6,250

// Total P&L (FIFO + ACB combined)
const totalPnL = 6250 + 1750;         // = $8,000

// Percentage calculation
const totalEverInvested = 78500 + 1750;  // = $80,250
const totalPnLPercentage = (8000 / 80250) * 100;  // = 9.97%
```

**3. Display Results:**
```javascript
// Header component display
<div className='balance-item'>
    <span className='label'>Total P&L:</span>
    <span className={`amount ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
        ${totalPnL.toFixed(2)} ({totalPnLPercentage >= 0 ? '+' : ''}{totalPnLPercentage.toFixed(2)}%)
    </span>
</div>
<div className='balance-item pnl-breakdown'>
    <span className='label'>└ Unrealized:</span>
    <span className='amount small profit'>$6,250.00</span>
</div>
<div className='balance-item pnl-breakdown'>
    <span className='label'>└ Realized:</span>
    <span className='amount small profit'>$1,750.00</span>
</div>
```

#### **Key Integration Features**

**No Double Counting:**
- Each dollar of investment is tracked exactly once
- Sold shares contribute to realized P&L (FIFO)
- Remaining shares contribute to unrealized P&L (ACB)
- Never counted in both categories

**Real-Time Updates:**
- Unrealized P&L updates as stock prices change throughout the day
- Realized P&L remains constant until new sales occur
- Total P&L percentage adjusts automatically

**Accurate Performance Tracking:**
```javascript
// The formula accounts for:
// - Money made/lost from completed sales (FIFO method)
// - Paper gains/losses on current holdings (ACB method)
// - Total capital deployed over time (for percentage calculation)

Total P&L = (Live Value - ACB Cost) + (FIFO Realized Gains)
Percentage = Total P&L ÷ (Current Holdings Cost + Realized Gains) × 100
```

**Architecture Benefits:**
- **Backend**: Handles complex FIFO calculations once and stores result
- **Frontend**: Performs simple real-time calculations using stored data
- **Separation**: Each method optimized for its specific use case
- **Accuracy**: Mathematical precision maintained across both systems

### **Part 4: Complete P&L System Summary**

### **Part 4: Complete P&L System Summary**

**Final Integration Example:**
```
Portfolio Performance Dashboard:

Cash Available: $25,000
Invested: $84,750 (current market value)
Total Portfolio: $109,750

Total P&L: +$8,000 (+9.97%)
  └ Unrealized: +$6,250 (ACB method - current holdings)
  └ Realized: +$1,750 (FIFO method - completed sales)

Breakdown by Method:
- Unrealized P&L: Current value ($84,750) - ACB cost ($78,500) = +$6,250
- Realized P&L: FIFO calculation from all completed transactions = +$1,750
- Total P&L: $6,250 + $1,750 = +$8,000
- P&L Percentage: $8,000 ÷ $80,250 × 100 = +9.97%
```

### **Key System Features**

**No Double Counting**: Each dollar of gain/loss is counted exactly once - either as realized (if sold) or unrealized (if still held), never both.

**Real-Time Updates**: Unrealized P&L updates automatically as stock prices change throughout the day.

**Accurate Historical Tracking**: Realized P&L is permanent and never changes, providing a true record of your trading performance.

**Weighted Averages**: When you buy the same stock multiple times, the system correctly calculates your average cost basis.

**FIFO Compliance**: Realized P&L calculations follow standard accounting practices for tax and reporting purposes.

**Dual Method Integration**: Combines the precision of FIFO (for realized gains) with the simplicity of ACB (for unrealized gains) in a unified system.

## Calculations

### Portfolio Value
- **Cash Balance**: Available money for purchases
- **Invested Amount**: Sum of (quantity × unit_price) for all holdings  
- **Current Value**: Sum of (quantity × current_price) for all holdings
- **Total Portfolio**: Cash Balance + Current Value

### Portfolio Allocation
```
Stock Allocation % = (Stock Current Value / Total Current Value) × 100
```

### Portfolio Allocation
```
Stock Allocation % = (Stock Current Value / Total Current Value) × 100
```

## Component Architecture & API Integration

### **Component Overview**
The React frontend is organized into modular components, each responsible for specific functionality and API interactions:

#### **App.js** - Main Application Container
- **Purpose**: Root component that orchestrates all child components
- **State Management**: Handles global refresh state across components
- **Layout**: Manages two-column layout (portfolio data + charts)

#### **Header Component**
- **Purpose**: Real-time portfolio overview and complete financial summary
- **API Endpoints Called**:
  - `GET /api/account` - Fetches current cash balance
  - `GET /api/stocks` - Gets all owned stocks for portfolio calculations
  - `GET /api/portfolio/realized-pnl` - Retrieves realized P&L from completed transactions
  - `GET /api/search/{symbol}` - Gets current prices for unrealized P&L calculations
- **Functionality**: 
  - Displays cash balance, invested amount, total portfolio value
  - **Complete P&L Display**:
    - **Total P&L**: Combined realized + unrealized gains/losses
    - **Unrealized P&L**: Current gains/losses on held positions
    - **Realized P&L**: Actual profits/losses from completed sales
  - Color-coded P&L indicators (green for profit, red for loss)
  - Auto-refreshes on transaction completion
  - FIFO (First In, First Out) method for accurate realized P&L calculation

#### **StockContainer Component**
- **Purpose**: Portfolio holdings management and stock list display
- **API Endpoints Called**:
  - `GET /api/stocks` - Retrieves all owned stocks
  - `GET /api/search/{symbol}` - Gets current prices for P&L calculations
- **Functionality**:
  - Displays owned stocks with current values
  - "Buy Stock" button to open transaction modal
  - Manages popup state for buy/sell operations

#### **TransactionContainer Component**
- **Purpose**: Complete transaction history with chronological display
- **API Endpoints Called**:
  - `GET /api/transactions` - Fetches all transaction records
- **Functionality**:
  - Shows buy/sell history in reverse chronological order
  - Displays transaction details (symbol, quantity, price, total amount, date)
  - Auto-refreshes when new transactions occur
  - Real-time updates without manual page refresh

#### **BuySellPopup Component**
- **Purpose**: Stock trading interface for buy/sell operations
- **API Endpoints Called**:
  - `GET /api/search/{query}` - Stock search and live price data
  - `GET /api/stocks` - Current holdings for sell operations
  - `GET /api/account` - Account balance validation
  - `POST /api/stocks` - Execute buy transactions
  - `DELETE /api/stocks/delete_by_symbol` - Execute sell transactions
- **Functionality**:
  - Stock search with live pricing
  - Buy/sell transaction forms with validation
  - Ownership details and P&L per stock
  - Real-time balance and availability checks
  - Error handling for insufficient funds/shares

#### **GraphContainer Component**
- **Purpose**: Portfolio visualization and performance charts
- **API Endpoints Called**:
  - `GET /api/portfolio/value` - Historical portfolio performance data
- **Functionality**:
  - Chart.js integration for data visualization
  - Portfolio performance over time
  - Interactive charts and graphs

### **Data Flow Architecture**
```
User Action (Buy/Sell) 
  ↓
BuySellPopup → API Call → Backend Processing
  ↓
Database Update → Auto-refresh Trigger
  ↓
Header + StockContainer + TransactionContainer → Refresh Display
```

## UI Components

### Header Component
- **Real-time portfolio overview** with complete financial metrics
- **Cash balance**, invested amount, total portfolio value
- **Complete P&L Display**:
  - **Total P&L**: Master metric combining all gains/losses
  - **└ Unrealized**: Breakdown showing potential gains on current holdings  
  - **└ Realized**: Breakdown showing actual profits from completed sales
- **Color-coded indicators**: Green for profits, red for losses
- **Live updates**: Auto-refreshes after every transaction

### Stock Container
- List of owned stocks
- "Buy Stock" button for new purchases

### Transaction Container
- Chronological history of all buy/sell transactions
- Real-time updates when new transactions occur
- Displays transaction type, symbol, quantity, price, and timestamp

### Buy/Sell Popup
- Stock search functionality
- Live price display
- Ownership details and P&L per stock
- Buy/Sell transaction forms

### Graph Container
- Portfolio visualization (Chart.js integration)

## Important Notes

### Database Management
- **Database files are NOT tracked in Git** (see `.gitignore`)
- Each developer gets a fresh database on first run
- Starting balance: $100,000
- No shared data between developers (by design)

### Development Workflow
1. Backend must be running on port 5050
2. Frontend connects to backend via CORS-enabled API
3. Hot reloading enabled for both frontend and backend
4. Live data refreshes automatically via Yahoo Finance API

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Flask backend is running with CORS enabled
2. **API Connection Failed**: Check that backend is on port 5050
3. **Database Errors**: Delete `stocks.db` to reset with fresh data
4. **Live Data Not Loading**: Check internet connection for Yahoo Finance API
5. **Transaction Errors**: If getting `total_amount` errors, ensure database schema is updated (delete and recreate `stocks.db`)
6. **Duplicate Transactions**: Fixed in latest version - ensure you're using updated backend code
7. **Transaction History Not Updating**: Auto-refresh functionality added - ensure frontend components are updated
8. **P&L Calculation Issues**: 
   - If realized P&L shows as $0.00 despite completed sales, check `/api/portfolio/realized-pnl` endpoint
   - Ensure transaction history has both BUY and SELL records with proper timestamps
   - Realized P&L uses FIFO method - first purchases are matched with first sales

### Port Configuration
- Backend: `http://127.0.0.1:5050`
- Frontend: `http://localhost:3000`
- Database: SQLite file (`backendFLASK/instance/stocks.db`)

## Project Structure

```
portfolio_manager_team04/
├── backendFLASK/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   └── instance/
│       └── stocks.db       # SQLite database (auto-generated)
├── portfolio-manager/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Header/     # Portfolio overview
│   │   │   ├── Stock/      # Individual stock display
│   │   │   ├── BuySellPopup/ # Transaction modal
│   │   │   ├── stockContainer/ # Portfolio holdings
│   │   │   ├── GraphContainer/ # Charts
│   │   │   └── TransactionContainer/ # Transaction history
│   │   └── App.js          # Main React component
│   └── package.json        # Node.js dependencies
├── .gitignore              # Git exclusion rules
└── README.md               # This file
```

## Contributing

1. Pull latest changes: `git pull origin main`
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test locally
4. Commit: `git commit -m "description"`
5. Push: `git push origin feature-name`
6. Create pull request

---

**Note**: This application uses live stock market data. Prices and calculations reflect real market conditions during trading hours.

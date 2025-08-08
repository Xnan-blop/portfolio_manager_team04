# Portfolio Manager - Team 04

A full-stack portfolio management application with real-time stock data integration, transaction history tracking, and account balance management.

## Technologies and Tools

### **Backend Technologies**

#### **Flask (Python Web Framework)**
- **Purpose**: Main web server and REST API framework
- **Why we chose it**: Lightweight, flexible, excellent for APIs
- **Key Features**: Route handling, JSON responses, middleware support
- **Used for**: All API endpoints, request/response handling, business logic

#### **SQLAlchemy (Object-Relational Mapping)**
- **Purpose**: Database operations and object mapping
- **Why we chose it**: Pythonic database interactions, automatic schema management
- **Key Features**: Model definitions, relationship management, query building
- **Used for**: All database operations (CRUD), table relationships, data validation

#### **SQLite Database**
- **Purpose**: Local development database
- **Why we chose it**: Zero configuration, file-based, perfect for development
- **Key Features**: ACID transactions, lightweight, embedded
- **Used for**: Storing account data, stock holdings, transaction history, portfolio performance

#### **Flask-CORS (Cross-Origin Resource Sharing)**
- **Purpose**: Enable frontend-backend communication
- **Why we chose it**: Required for React app on different port
- **Key Features**: Automatic CORS headers, configurable origins
- **Used for**: Allowing React (port 3000) to call Flask API (port 5050)

#### **yfinance (Yahoo Finance API)**
- **Purpose**: Real-time stock market data integration
- **Why we chose it**: Free, no API key required, comprehensive data
- **Key Features**: Live prices, company info, historical data
- **Used for**: Stock search, current pricing, company details, portfolio valuation

### **Frontend Technologies**

#### **React 18+ (Component-Based UI Framework)**
- **Purpose**: User interface and user experience
- **Why we chose it**: Component reusability, state management, modern development
- **Key Features**: Hooks, state management, component lifecycle
- **Used for**: All UI components, user interactions, real-time updates

#### **Fetch API (HTTP Client)**
- **Purpose**: Frontend-backend communication
- **Why we chose it**: Native JavaScript, Promise-based, modern approach
- **Key Features**: Async/await support, JSON handling, error management
- **Used for**: All API calls to Flask backend, data fetching, form submissions

#### **Chart.js (Data Visualization)**
- **Purpose**: Portfolio performance charts and graphs
- **Why we chose it**: Responsive charts, extensive customization, React integration
- **Key Features**: Interactive charts, real-time updates, multiple chart types
- **Used for**: Portfolio performance graphs, historical data visualization

#### **CSS3 (Styling and Design)**
- **Purpose**: User interface styling and responsive design
- **Why we chose it**: Native web technology, flexible layouts, animations
- **Key Features**: Flexbox, grid layouts, responsive design, custom properties
- **Used for**: Component styling, responsive layouts, color schemes, animations

### **Development Tools and Environment**

#### **Python 3.10+**
- **Purpose**: Backend runtime environment
- **Key Features**: Type hints, performance improvements, modern syntax
- **Used for**: Running Flask application, data processing, business logic

#### **Node.js 16+**
- **Purpose**: Frontend development environment
- **Key Features**: NPM package management, development server, build tools
- **Used for**: React development, dependency management, build processes

#### **Git Version Control**
- **Purpose**: Source code management and team collaboration
- **Key Features**: Branching, merging, history tracking, collaboration
- **Used for**: Code versioning, team coordination, deployment management

#### **VS Code (Development Environment)**
- **Purpose**: Integrated development environment
- **Key Features**: Syntax highlighting, debugging, extensions, terminal integration
- **Used for**: Code editing, debugging, project management, Git integration

### **Architecture Patterns and Methodologies**

#### **REST API Architecture**
- **Pattern**: RESTful web services with HTTP methods
- **Implementation**: GET, POST, DELETE endpoints with JSON responses
- **Benefits**: Standard conventions, scalable, stateless communication

#### **MVC Pattern (Model-View-Controller)**
- **Models**: SQLAlchemy database models (`models.py`)
- **Views**: React components for user interface
- **Controllers**: Flask route handlers in `app.py`

#### **Separation of Concerns**
- **Backend**: Business logic, data management, API endpoints
- **Frontend**: User interface, user experience, data presentation
- **Database**: Data persistence, relationships, integrity

#### **Component-Based Architecture (React)**
- **Reusable Components**: Header, StockContainer, BuySellPopup, etc.
- **State Management**: React hooks for local and global state
- **Props System**: Data flow between components

### **Integration Technologies**

#### **JSON (Data Exchange Format)**
- **Purpose**: Standardized data communication between frontend and backend
- **Used for**: API requests/responses, configuration files, data storage

#### **HTTP/HTTPS Protocol**
- **Purpose**: Web communication standard
- **Used for**: Frontend-backend communication, external API calls

#### **SQL (Database Query Language)**
- **Purpose**: Database operations and data manipulation
- **Used for**: Complex queries, data relationships, performance optimization

### **Why These Technologies Work Well Together**

1. **Python + Flask**: Rapid API development with minimal boilerplate
2. **React + Fetch API**: Modern frontend with seamless backend integration
3. **SQLAlchemy + SQLite**: Easy database management with Python integration
4. **yfinance Integration**: Real-time financial data without complex API setup
5. **CORS Configuration**: Enables development workflow with separate servers
6. **Component Architecture**: Maintainable, scalable frontend structure

## Application Architecture

### **High-Level System Architecture**

```
┌─────────────────────────────────────────────────────────────────┐
│                    PORTFOLIO MANAGER SYSTEM                     │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (React)              │  Backend (Flask)               │
│  Port: 3000                    │  Port: 5050                    │
│                                │                                │
│  ┌─────────────────────────┐   │  ┌─────────────────────────┐   │
│  │     User Interface      │   │  │     REST API            │   │
│  │  ┌─────────────────┐    │   │  │  ┌─────────────────┐    │   │
│  │  │ Header          │◄───┼───┼──┤  │ Account Mgmt    │    │   │
│  │  │ StockContainer  │    │   │  │  │ Stock Trading   │    │   │
│  │  │ BuySellPopup    │    │   │  │  │ P&L Calculation │    │   │
│  │  │ TransactionList │    │   │  │  │ Transaction Log │    │   │
│  │  │ GraphContainer  │    │   │  │  └─────────────────┘    │   │
│  │  └─────────────────┘    │   │  │                         │   │
│  └─────────────────────────┘   │  └─────────────────────────┘   │
│                                │              │                │
│                                │              ▼                │
│                                │  ┌─────────────────────────┐   │
│                                │  │    Database (SQLite)    │   │
│                                │  │  ┌─────────────────┐    │   │
│                                │  │  │ Account         │    │   │
│                                │  │  │ Stock           │    │   │
│                                │  │  │ Transactions    │    │   │
│                                │  │  │ Portfolio       │    │   │
│                                │  │  └─────────────────┘    │   │
│                                │  └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                ┌─────────────────────────────┐
                │   External API Integration  │
                │                             │
                │  ┌─────────────────────┐    │
                │  │  Yahoo Finance      │    │
                │  │  (yfinance)         │    │
                │  │  - Live Prices      │    │
                │  │  - Company Info     │    │
                │  │  - Historical Data  │    │
                │  └─────────────────────┘    │
                └─────────────────────────────┘
```

### **Component Communication Flow**

```
User Interaction
    ↓
React Components
    ↓ (Fetch API)
Flask REST API
    ↓ (SQLAlchemy)
SQLite Database
    ↓ (External API)
Yahoo Finance
    ↓ (Response Chain)
Flask → React → User Display
```

### **Data Flow Architecture**

#### **Real-Time Stock Data Flow:**
1. User searches for stock in BuySellPopup
2. Frontend calls `/api/search/{symbol}`
3. Flask calls Yahoo Finance via yfinance
4. Live data returned to frontend for display

#### **Transaction Processing Flow:**
1. User submits buy/sell order
2. Frontend validates and calls appropriate API
3. Backend validates funds/ownership
4. Database updated (Account, Stock, Transactions)
5. Success response triggers UI refresh

#### **P&L Calculation Flow:**
1. Header component requests multiple data sources
2. Realized P&L calculated in backend (FIFO method)
3. Unrealized P&L calculated in frontend (ACB method)
4. Combined for total P&L display with percentage

## Data Model and Database Design

### **Database Schema Overview**

Our portfolio management system uses a relational database with four core tables designed for financial data integrity and comprehensive transaction tracking.

#### **Design Principles:**
- **Data Integrity**: Foreign key relationships and constraints
- **Audit Trail**: Immutable transaction history
- **Performance**: Indexed fields for fast queries
- **Scalability**: Normalized structure for growth
- **Simplicity**: Clear table relationships and purposes

### **Complete Database Schema**

#### **1. Account Table - User Balance Management**
```sql
CREATE TABLE account (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    balance REAL NOT NULL DEFAULT 100000.0
);
```
**Purpose**: Tracks available cash for transactions  
**Design Decisions**:
- Single record per user (simple portfolio manager)
- Auto-initialized with $100,000 starting balance
- Real number type for precise financial calculations
- Primary key for future expansion to multiple accounts

**Business Rules**:
- Balance decreases when buying stocks
- Balance increases when selling stocks
- Must have sufficient balance before transactions
- Updated atomically with stock transactions

**Usage in Application**:
- Validated before every purchase transaction
- Displayed in Header component as "Cash Available"
- Updated by both buy and sell operations

#### **2. Stock Table - Current Portfolio Holdings**
```sql
CREATE TABLE stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price REAL NOT NULL
);
```
**Purpose**: Stores current stock holdings with weighted average cost basis (ACB)

**Design Decisions**:
- **symbol**: Stock ticker (e.g., "AAPL") - unique per holding
- **name**: Company name for display purposes
- **quantity**: Current number of shares owned
- **purchase_price**: Weighted average purchase price (ACB)

**Key Business Logic**:
```python
# ACB calculation when buying more of same stock:
old_cost = existing_quantity * current_purchase_price
new_cost = new_quantity * new_purchase_price
total_cost = old_cost + new_cost
total_quantity = existing_quantity + new_quantity
new_purchase_price = total_cost / total_quantity
```

**Critical Features**:
- **Automatic ACB Updates**: Recalculated on each additional purchase
- **Position Removal**: Deleted when all shares sold
- **Quantity Tracking**: Updated on both buy and sell transactions
- **Unique Symbols**: One record per stock symbol (quantities aggregated)

**Usage in Application**:
- Source for unrealized P&L calculations (ACB method)
- Displayed in StockContainer for portfolio overview
- Used for ownership validation in sell transactions

#### **3. Transactions Table - Complete Trading Audit Trail**
```sql
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price REAL NOT NULL,
    total_amount REAL NOT NULL,
    type VARCHAR(4) NOT NULL CHECK (type IN ('BUY', 'SELL')),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
**Purpose**: Immutable record of all buy/sell transactions for FIFO calculations

**Design Decisions**:
- **Immutable Records**: Never updated or deleted (audit trail)
- **Complete Information**: Every transaction fully documented
- **Chronological Order**: Timestamp for FIFO sequencing
- **Type Safety**: CHECK constraint ensures only BUY/SELL types

**Field Explanations**:
- **purchase_price**: Actual price at time of transaction (buy price for BUY transactions, sale price for SELL transactions)
- **total_amount**: quantity × purchase_price (calculated for convenience)
- **type**: 'BUY' or 'SELL' for transaction categorization
- **date**: Precise timestamp with timezone for FIFO ordering

**Important**: The `purchase_price` field serves dual purposes:
- For **BUY transactions**: Stores the actual purchase price per share
- For **SELL transactions**: Stores the actual sale price per share at time of sale

**Critical for FIFO Calculations**:
```python
# FIFO matching algorithm uses this data:
# 1. Order all transactions by date ASC
# 2. For each symbol, track purchase "lots"
# 3. Match sales to oldest purchases first
# 4. Calculate realized P&L per matched lot
```

**Usage in Application**:
- Source data for realized P&L calculations (FIFO method)
- Displayed in TransactionContainer for trading history
- Used for portfolio performance tracking over time

#### **4. Portfolio Table - Historical Performance Data**
```sql
CREATE TABLE portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol VARCHAR(10) NOT NULL,
    date VARCHAR(10) NOT NULL,
    closing_price REAL NOT NULL,
    UNIQUE(symbol, date)
);
```
**Purpose**: Stores historical daily closing prices for portfolio performance charts

**Design Decisions**:
- **Date Storage**: String format 'YYYY-MM-DD' for easy querying
- **Unique Constraint**: One price per symbol per date
- **Automated Population**: Filled via Yahoo Finance on app startup
- **30-Day History**: One month of data for performance tracking

**Data Population Process**:
```python
# Automatic data loading on app startup:
for symbol in owned_stocks:
    price_data = yf.download(symbol, period='1mo')['Close']
    for date, price in price_data.iterrows():
        # Store each day's closing price
        portfolio_entry = Portfolio(
            symbol=symbol,
            date=date.strftime('%Y-%m-%d'),
            closing_price=price
        )
```

**Usage in Application**:
- Powers GraphContainer performance charts
- Enables historical portfolio value calculations
- Tracks performance trends over time

### **Database Relationships and Integrity**

#### **Logical Relationships:**
```
Account (1) ←→ (many) Transactions [via business logic]
Stock (1) ←→ (many) Transactions [via symbol matching]
Portfolio (many) ←→ (1) Stock [via symbol matching]
```

#### **Data Integrity Rules:**
1. **Account Balance**: Must be non-negative after validation
2. **Stock Quantities**: Must be positive (zero quantity = deletion)
3. **Transaction Types**: Must be exactly 'BUY' or 'SELL'
4. **Symbol Consistency**: Same symbol across all tables
5. **Date Integrity**: Transactions ordered chronologically for FIFO

#### **Atomic Transaction Guarantees:**
```python
# All database operations within single transaction:
try:
    # Update account balance
    account.balance -= total_cost
    # Update or create stock holding
    stock.quantity += quantity
    stock.purchase_price = new_acb
    # Create transaction record
    transaction = Transactions(...)
    # Commit all changes together
    db.session.commit()
except:
    # Rollback all changes if any fail
    db.session.rollback()
```

### **Database Design Benefits**

1. **Audit Trail**: Complete transaction history for compliance
2. **Performance**: Indexed queries for fast P&L calculations
3. **Flexibility**: Supports multiple accounting methods (FIFO, ACB)
4. **Scalability**: Normalized design handles portfolio growth
5. **Integrity**: ACID transactions prevent data corruption
6. **Historical Analysis**: Portfolio performance tracking over time

## Tech Stack

### **Backend**
- **Flask** - Python web framework for API endpoints
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database for local development
- **Flask-CORS** - Cross-origin resource sharing for frontend-backend communication
- **yfinance** - Yahoo Finance API integration for real-time stock data

### **Frontend**
- **React 18+** - Component-based UI framework
- **Chart.js** - Data visualization and portfolio charts
- **CSS3** - Custom styling and responsive design
- **Fetch API** - HTTP client for backend communication

## Features

- **Account Balance System**: $100,000 starting balance with buy/sell validation
- **Live Stock Data**: Real-time pricing via Yahoo Finance API
- **Comprehensive P&L Analytics**: Complete profit/loss tracking with realized and unrealized gains/losses
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

The backend provides a comprehensive REST API built with Flask in `app.py`. This file is the heart of our portfolio management system, handling all business logic, database operations, and external API integrations.

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
- **Error Handling**: Comprehensive error responses with meaningful messages

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
- Comprehensive error handling for invalid symbols or network issues
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
- Used by Header component for comprehensive P&L display

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
- **Comprehensive Logging**: Detailed error messages for debugging
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
**Used by**: Header component for comprehensive P&L display

### **API Features:**
- **CORS Enabled**: Frontend-backend communication from different ports
- **Error Handling**: Comprehensive error responses with detailed messages
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
        
        # Fetch comprehensive stock information
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
3. **Comprehensive Data**: Rich financial information beyond just prices
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

## Profit & Loss (P&L) Calculation System

Our portfolio manager uses a sophisticated two-part system to calculate your total profit and loss. This gives you a complete picture of how your investments are performing.

### **What is P&L?**
P&L stands for "Profit and Loss" - it tells you how much money you've made or lost on your investments. We break this down into two types:

1. **Realized P&L**: Money you've actually made or lost from stocks you've sold
2. **Unrealized P&L**: Paper gains or losses on stocks you still own
3. **Total P&L**: Realized + Unrealized = Your complete investment performance

### **Part 1: Realized P&L Calculation**

**What it means**: This calculates the actual profit or loss from stocks you've already sold. Once you sell a stock, those gains or losses become "real" money in your account.

**How we calculate it**: We use something called FIFO (First In, First Out). This means when you sell shares, we match them to your oldest purchases first.

#### **Step-by-Step Algorithm**

**Step 1: Get All Your Transaction History**
```
- Fetch every buy and sell transaction from oldest to newest
- This gives us a complete timeline of your trading activity
```

**Step 2: Track Your Purchases by Stock**
```
For each stock symbol (like AAPL, GOOGL):
- Create an empty list to track purchases
- This list will store: [quantity, price] for each buy
```

**Step 3: Process Each Transaction Chronologically**
```
For each transaction in order:
  If it's a BUY:
    - Add it to the purchase list for that stock
    - Example: Buy 100 AAPL at $150 → Add [100, $150] to AAPL list
  
  If it's a SELL:
    - Use FIFO to match against oldest purchases
    - Calculate profit/loss for each match
    - Remove or reduce the matched purchases
```

#### **Real Example: FIFO in Action**

**Your Trading History:**
```
Day 1: Buy 100 AAPL at $150  →  positions['AAPL'] = [{'quantity': 100, 'price': 150}]
Day 2: Buy 50 AAPL at $160   →  positions['AAPL'] = [{'quantity': 100, 'price': 150}, 
                                                     {'quantity': 50, 'price': 160}]
Day 3: Sell 75 AAPL at $170  →  Now we calculate realized P&L...
```

**FIFO Calculation for the Sale:**
```
Step 1: quantity_to_sell = 75, sale_price = $170

Step 2: Look at oldest purchase first
        oldest_purchase = {'quantity': 100, 'price': 150}

Step 3: Since 100 >= 75, we can cover the entire sale with this purchase
        realized_pnl = (170 - 150) × 75 = $20 × 75 = $1,500 profit
        
Step 4: Update the oldest purchase
        oldest_purchase becomes {'quantity': 25, 'price': 150}  (100 - 75 = 25 remaining)

Final State: positions['AAPL'] = [{'quantity': 25, 'price': 150}, 
                                  {'quantity': 50, 'price': 160}]
Total Realized P&L: $1,500
```

**Why FIFO?**
- **Tax Compliance**: Most tax systems use FIFO by default
- **Fair and Consistent**: Same transactions always give same results
- **No Gaming**: You can't pick and choose which shares to sell to manipulate P&L
- **Standard Practice**: Used by professional accounting systems

**Code Implementation:**
```python
while quantity_to_sell > 0 and positions[symbol]:
    oldest_position = positions[symbol][0]  # Always take oldest first
    
    if oldest_position['quantity'] <= quantity_to_sell:
        # Sell entire oldest position
        realized_pnl = (sale_price - oldest_position['price']) * oldest_position['quantity']
        total_realized_pnl += realized_pnl
        quantity_to_sell -= oldest_position['quantity']
        positions[symbol].pop(0)  # Remove completely sold position
    else:
        # Partial sale of oldest position
        realized_pnl = (sale_price - oldest_position['price']) * quantity_to_sell
        total_realized_pnl += realized_pnl
        oldest_position['quantity'] -= quantity_to_sell
        quantity_to_sell = 0
```

### **Part 2: Unrealized P&L Calculation**

**What it means**: This calculates the paper gains or losses on stocks you still own. If you sold them right now at current market price, this is what you'd make or lose.

**How we calculate it**: We compare the current market value of your holdings to what you originally paid for them using the Average Cost Basis (ACB) method.

#### **Unrealized vs Realized: Key Differences**

**Database Access Pattern:**
- **Realized P&L**: Calculated in backend using direct database queries to Transaction table (FIFO method)
- **Unrealized P&L**: Calculated in frontend using HTTP API calls to multiple endpoints

**Why Different Approaches?**
- **Realized P&L**: Complex FIFO algorithm requires processing all historical transactions, best done server-side
- **Unrealized P&L**: Simple calculation using current holdings + live prices, can be done client-side

#### **Step-by-Step Algorithm (Frontend Calculation)**

**Step 1: Get Your Current Holdings from Database**
```javascript
// Frontend makes HTTP request to backend
const stocksResponse = await fetch('http://127.0.0.1:5050/api/stocks');
const stocksData = await stocksResponse.json();

// Returns: [
//   {symbol: "AAPL", quantity: 100, purchase_price: 156.67, name: "Apple Inc."},
//   {symbol: "GOOGL", quantity: 10, purchase_price: 2800.00, name: "Google"}
// ]
```

**Step 2: Calculate Total Amount Invested Using Regular Loop**
```javascript
// Using simple for loop instead of reduce() for clarity
let totalInvested = 0;
for (const stock of stocksData) {
    totalInvested += (stock.purchase_price * stock.quantity);
}

// Example calculation:
// AAPL: 156.67 × 100 = $15,667
// GOOGL: 2800.00 × 10 = $28,000
// Total Invested: $43,667
```

**Step 3: Get Current Market Prices via Yahoo Finance**
```javascript
let totalCurrentValue = 0;
for (const stock of stocksData) {
    try {
        // Make HTTP request to backend, which calls Yahoo Finance API
        const priceResponse = await fetch(`http://127.0.0.1:5050/api/search/${stock.symbol}`);
        const priceData = await priceResponse.json();
        
        if (priceResponse.ok) {
            // Use live current price
            totalCurrentValue += priceData.current_price * stock.quantity;
        } else {
            // Fallback to ACB if live price unavailable
            totalCurrentValue += stock.purchase_price * stock.quantity;
        }
    } catch {
        // Error fallback: use ACB price
        totalCurrentValue += stock.purchase_price * stock.quantity;
    }
}

// Example with live prices:
// AAPL: $180 × 100 = $18,000 (current market price)
// GOOGL: $2850 × 10 = $28,500 (current market price)  
// Total Current Value: $46,500
```

**Step 4: Calculate Unrealized P&L**
```javascript
const unrealizedPnL = totalCurrentValue - totalInvested;

// Example:
// Unrealized P&L = $46,500 - $43,667 = $2,833 profit
```

#### **Average Cost Basis (ACB) System**

**What is ACB?**
ACB is the weighted average price you paid for each stock, calculated every time you buy more shares.

**When ACB is Calculated (Backend Only):**
```python
# This happens in add_stock() function when buying more of same stock
if stock:  # Stock already exists in portfolio
    stock.quantity += quantity
    
    # ACB Calculation:
    total_shares = stock.quantity
    old_cost = (stock.quantity - quantity) * stock.purchase_price  # Previous total cost
    new_total_cost = old_cost + total_cost                     # Add new purchase cost
    stock.purchase_price = new_total_cost / total_shares           # New weighted average
```

**Real Example: ACB with Multiple Purchases**

**Purchase History:**
```
Day 1: Buy 50 AAPL at $140 → ACB = $140.00
Day 5: Buy 50 AAPL at $160 → ACB = ?

ACB Calculation:
old_cost = 50 × $140 = $7,000
new_cost = 50 × $160 = $8,000
total_cost = $7,000 + $8,000 = $15,000
total_shares = 50 + 50 = 100
new ACB = $15,000 ÷ 100 = $150.00
```

**After Sales (ACB Stays Same):**
```
Day 10: Sell 30 shares → ACB remains $150.00
Remaining: 70 shares at $150.00 ACB

Why ACB doesn't change when selling:
- You're selling from the same "pool" of shares
- Only quantity decreases, average cost per share stays same
- ACB only changes when you BUY more at different prices
```

#### **Frontend vs Backend Responsibilities**

**Backend (Python/Flask):**
- Calculates and stores ACB when buying stocks
- Validates transactions and updates database
- Handles complex FIFO calculations for realized P&L
- Provides clean API endpoints for frontend consumption

**Frontend (React/JavaScript):**
- Reads pre-calculated ACB from Stock table
- Makes HTTP calls to get live stock prices
- Performs simple unrealized P&L calculations
- Displays results in real-time to user

**Why This Architecture?**
- **Security**: Financial calculations happen server-side where they can't be manipulated
- **Performance**: Heavy database operations handled by backend
- **Separation**: Frontend focuses on display, backend handles business logic
- **Data Integrity**: ACB calculated once and stored permanently

#### **Complete Unrealized P&L Example**

**Current Portfolio State:**
```
Stock Table (stored ACB from all purchases):
- AAPL: 100 shares at $150.00 ACB
- GOOGL: 25 shares at $2750.00 ACB
- MSFT: 50 shares at $380.00 ACB
```

**Step-by-Step Frontend Calculation:**
```javascript
// Step 1: Calculate total invested (using stored ACB)
let totalInvested = 0;
totalInvested += (150.00 * 100);   // AAPL: $15,000
totalInvested += (2750.00 * 25);   // GOOGL: $68,750  
totalInvested += (380.00 * 50);    // MSFT: $19,000
// Total Invested: $102,750

// Step 2: Get current market values
let totalCurrentValue = 0;
totalCurrentValue += (175.00 * 100);  // AAPL at $175: $17,500
totalCurrentValue += (2800.00 * 25);  // GOOGL at $2800: $70,000
totalCurrentValue += (390.00 * 50);   // MSFT at $390: $19,500  
// Total Current Value: $107,000

// Step 3: Calculate unrealized P&L
const unrealizedPnL = 107000 - 102750; // = $4,250 profit

// Step 4: Display breakdown
Per Stock P&L:
- AAPL: ($175-$150) × 100 = $2,500 profit
- GOOGL: ($2800-$2750) × 25 = $1,250 profit  
- MSFT: ($390-$380) × 50 = $500 profit
- Total: $4,250 profit
```

**Real-Time Updates:**
- Stock prices update throughout trading day
- Unrealized P&L recalculates automatically
- Green/red color coding shows gains/losses
- Header component refreshes on every transaction

**Why Use ACB Instead of FIFO for Unrealized P&L?**
- **Simplicity**: Single average price per stock vs tracking every purchase lot
- **Real-Time Performance**: Fast calculation suitable for live updates
- **Standard Practice**: Most brokerages show unrealized P&L using average cost
- **User Friendly**: Easier to understand than complex FIFO matching

### **Part 3: Total P&L Calculation - Where Both Methods Come Together**

**Location**: Frontend Header.js component (lines 77-84)
**Purpose**: Combines both realized (FIFO) and unrealized (ACB) P&L calculations into a single comprehensive performance metric

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
- **Purpose**: Real-time portfolio overview and comprehensive financial summary
- **API Endpoints Called**:
  - `GET /api/account` - Fetches current cash balance
  - `GET /api/stocks` - Gets all owned stocks for portfolio calculations
  - `GET /api/portfolio/realized-pnl` - Retrieves realized P&L from completed transactions
  - `GET /api/search/{symbol}` - Gets current prices for unrealized P&L calculations
- **Functionality**: 
  - Displays cash balance, invested amount, total portfolio value
  - **Comprehensive P&L Display**:
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
- **Real-time portfolio overview** with comprehensive financial metrics
- **Cash balance**, invested amount, total portfolio value
- **Comprehensive P&L Display**:
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

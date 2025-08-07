# Portfolio Manager - Team 04

A full-stack portfolio management application with real-time stock data integration, transaction history tracking, and account balance management.

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
    purchase_price REAL NOT NULL
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
    purchase_price REAL NOT NULL,    -- Price per share at time of transaction
    total_amount REAL NOT NULL,      -- Total transaction value (price × quantity)
    type VARCHAR(4) NOT NULL,        -- 'BUY' or 'SELL'
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Purpose**: Immutable record of all buy/sell transactions
**Key Features**:
- Complete audit trail of all trading activity
- Supports both individual share price and total transaction amount
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

## API Endpoints

### Base URL: `http://127.0.0.1:5050/api`

The backend provides a RESTful API with comprehensive endpoints for portfolio management:

#### 1. Account Management
**GET /account** - Retrieve current account balance
```http
GET /account
```
**Response:**
```json
{
    "balance": 95000.0,
    "id": 1
}
```
**Used by**: Header, BuySellPopup for balance validation

#### 2. Portfolio Holdings
**GET /stocks** - Get all owned stocks in portfolio
```http
GET /stocks
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
**Used by**: Header (portfolio calculations), StockContainer (holdings display), BuySellPopup (ownership validation)

#### 3. Stock Search & Live Data
**GET /search/{query}** - Search stocks with real-time pricing
```http
GET /search/AAPL
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
**Used by**: BuySellPopup (stock search, live pricing), StockContainer (current value calculations)

#### 4. Stock Transactions
**POST /stocks** - Execute buy orders
```http
POST /stocks
Content-Type: application/json

{
    "symbol": "AAPL",
    "quantity": 10
}
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
**Used by**: BuySellPopup for buy transactions

**DELETE /stocks/delete_by_symbol** - Execute sell orders
```http
DELETE /stocks/delete_by_symbol
Content-Type: application/json

{
    "symbol": "AAPL",
    "quantity": 5
}
```
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
**Used by**: BuySellPopup for sell transactions

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

## Calculations

### Portfolio Value
- **Cash Balance**: Available money for purchases
- **Invested Amount**: Sum of (quantity × purchase_price) for all holdings
- **Current Value**: Sum of (quantity × current_price) for all holdings
- **Total Portfolio**: Cash Balance + Current Value

### Comprehensive Profit/Loss Calculation
The application now calculates **Total P&L** which includes both realized and unrealized gains/losses:

#### **Unrealized P&L** (Current Holdings)
```
For each currently owned stock:
Unrealized P&L = (current_price - purchase_price) × quantity

Total Unrealized P&L = Sum of all individual stock unrealized P&L
```

#### **Realized P&L** (Completed Transactions)
```
Using FIFO (First In, First Out) method:
For each SELL transaction:
Realized P&L = (sale_price - original_purchase_price) × quantity_sold

Total Realized P&L = Sum of all completed sale transactions
```

#### **Total P&L**
```
Total P&L = Unrealized P&L + Realized P&L
P&L Percentage = (Total P&L / Total Amount Ever Invested) × 100
```

**Example Scenario:**
1. Buy 100 AAPL at $150 → Invested: $15,000
2. Buy 50 AAPL at $160 → Total Invested: $23,000
3. Sell 75 AAPL at $170 → Realized P&L: $1,250 (using FIFO)
4. Current AAPL price: $180 → Unrealized P&L: $2,250 (75 shares × $20)
5. **Total P&L**: $1,250 + $2,250 = $3,500

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

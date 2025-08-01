# 💰 Portfolio Manager - Team 04

A full-stack portfolio management application with real-time stock data integration and account balance tracking.

## 🚀 Features

- **Account Balance System**: $100,000 starting balance with buy/sell validation
- **Live Stock Data**: Real-time pricing via Yahoo Finance API
- **Portfolio Analytics**: P&L calculations, portfolio allocation percentages
- **Responsive UI**: Mobile-friendly design with real-time updates
- **Transaction Management**: Buy and sell stocks with ownership tracking

## 📋 Requirements

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

## 🛠️ Installation & Setup

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

## 🗄️ Database Schema

The application uses SQLite with automatic initialization:

### Account Table
```sql
CREATE TABLE account (
    id INTEGER PRIMARY KEY,
    balance REAL NOT NULL
);
```

### Stock Table
```sql
CREATE TABLE stock (
    id INTEGER PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_price REAL NOT NULL
);
```

**Note**: Database file (`stocks.db`) is automatically created on first run with $100,000 starting balance.

## 🔌 API Endpoints

### Base URL: `http://127.0.0.1:5050/api`

#### 1. Get Account Balance
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

#### 2. Get All Portfolio Stocks
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
    },
    {
        "id": 2,
        "symbol": "GOOGL",
        "name": "Alphabet Inc.",
        "quantity": 5,
        "purchase_price": 2500.0
    }
]
```

#### 3. Search Stocks (Live Data)
```http
GET /search?query=apple
```

**Response:**
```json
[
    {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "current_price": 175.50
    },
    {
        "symbol": "APLE",
        "name": "Apple Hospitality REIT Inc.",
        "current_price": 15.25
    }
]
```

#### 4. Get Stock Details with Live Price
```http
GET /stock/<symbol>
```

**Example:** `GET /stock/AAPL`

**Response:**
```json
{
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "current_price": 175.50,
    "change": 2.30,
    "change_percent": 1.33
}
```

#### 5. Buy Stock
```http
POST /buy
Content-Type: application/json

{
    "symbol": "AAPL",
    "quantity": 10
}
```

**Success Response:**
```json
{
    "message": "Successfully bought 10 shares of AAPL for $1755.00"
}
```

**Error Response (Insufficient Funds):**
```json
{
    "error": "Insufficient funds. Need $1755.00 but only have $1000.00"
}
```

#### 6. Sell Stock
```http
POST /sell
Content-Type: application/json

{
    "symbol": "AAPL",
    "quantity": 5
}
```

**Success Response:**
```json
{
    "message": "Successfully sold 5 shares of AAPL for $877.50"
}
```

**Error Response (Insufficient Shares):**
```json
{
    "error": "Cannot sell 10 shares. You only own 5 shares of AAPL"
}
```

## 🧮 Calculations

### Portfolio Value
- **Cash Balance**: Available money for purchases
- **Invested Amount**: Sum of (quantity × purchase_price) for all holdings
- **Current Value**: Sum of (quantity × current_price) for all holdings
- **Total Portfolio**: Cash Balance + Current Value

### Profit/Loss Calculation
```
For each stock:
P&L = (current_price - purchase_price) × quantity

Total P&L = Sum of all individual stock P&L
P&L Percentage = (Total P&L / Invested Amount) × 100
```

### Portfolio Allocation
```
Stock Allocation % = (Stock Current Value / Total Current Value) × 100
```

## 🎨 UI Components

### Header Component
- Real-time portfolio overview
- Cash balance, invested amount, total value
- P&L with color coding (green/red)

### Stock Container
- List of owned stocks
- "Add Stock" button for new purchases

### Buy/Sell Popup
- Stock search functionality
- Live price display
- Ownership details and P&L per stock
- Buy/Sell transaction forms

### Graph Container
- Portfolio visualization (Chart.js integration)

## 🚨 Important Notes

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

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Flask backend is running with CORS enabled
2. **API Connection Failed**: Check that backend is on port 5050
3. **Database Errors**: Delete `stocks.db` to reset with fresh data
4. **Live Data Not Loading**: Check internet connection for Yahoo Finance API

### Port Configuration
- Backend: `http://127.0.0.1:5050`
- Frontend: `http://localhost:3000`
- Database: SQLite file (`backendFLASK/instance/stocks.db`)

## 📁 Project Structure

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
│   │   │   └── GraphContainer/ # Charts
│   │   └── App.js          # Main React component
│   └── package.json        # Node.js dependencies
├── .gitignore              # Git exclusion rules
└── README.md               # This file
```

## 🤝 Contributing

1. Pull latest changes: `git pull origin main`
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test locally
4. Commit: `git commit -m "description"`
5. Push: `git push origin feature-name`
6. Create pull request

---

**Note**: This application uses live stock market data. Prices and calculations reflect real market conditions during trading hours.

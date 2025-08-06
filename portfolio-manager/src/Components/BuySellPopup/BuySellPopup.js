import './BuySellPopup.css';
import React, {useState, useEffect} from "react";

const BuySellPopup = ({ stockSymbol, closePopup, refreshData }) => {
    const [stockNumberEntered, setStockNumberEntered] = useState(0);
    const [stockNumberBuyEntered, setStockNumberBuyEntered] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [stockInfo, setStockInfo] = useState(null);
    const [ownershipInfo, setOwnershipInfo] = useState(null);
    const [accountBalance, setAccountBalance] = useState(0);
    const [isNewStock, setIsNewStock] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Determine if this is for adding a new stock or managing existing one
    useEffect(() => {
        if (stockSymbol === "Add Stock") {
            setIsNewStock(true);
        } else {
            setIsNewStock(false);
            // Fetch current stock info for existing stocks
            fetchStockInfo(stockSymbol);
            fetchOwnershipInfo(stockSymbol);
        }
        fetchAccountBalance();
    }, [stockSymbol]);

    const fetchAccountBalance = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5050/api/account');
            const data = await response.json();
            if (response.ok) {
                setAccountBalance(data.balance);
            }
        } catch (err) {
            console.error('Error fetching account balance:', err);
        }
    };

    const fetchOwnershipInfo = async (symbol) => {
        try {
            const response = await fetch('http://127.0.0.1:5050/api/stocks');
            const allStocks = await response.json();
            const ownedStock = allStocks.find(stock => stock.symbol === symbol);
            
            if (ownedStock) {
                // Calculate current value
                const priceResponse = await fetch(`http://127.0.0.1:5050/api/search/${symbol}`);
                const priceData = await priceResponse.json();
                const currentPrice = priceResponse.ok ? priceData.current_price : ownedStock.purchase_price;
                const currentValue = currentPrice * ownedStock.quantity;
                const purchaseValue = ownedStock.purchase_price * ownedStock.quantity;
                const profitLoss = currentValue - purchaseValue;
                
                setOwnershipInfo({
                    ...ownedStock,
                    currentPrice: currentPrice,
                    currentValue: currentValue,
                    purchaseValue: purchaseValue,
                    profitLoss: profitLoss,
                    profitLossPercent: ((profitLoss / purchaseValue) * 100)
                });
            }
        } catch (err) {
            console.error('Error fetching ownership info:', err);
        }
    };

    const fetchStockInfo = async (symbol) => {
        if (!symbol || symbol === "Add Stock") return;
        
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`http://127.0.0.1:5050/api/search/${symbol}`);
            const data = await response.json();
            
            if (response.ok) {
                setStockInfo(data);
            } else {
                setError(data.error || 'Failed to fetch stock info');
            }
        } catch (err) {
            setError('Network error while fetching stock info');
        } finally {
            setIsLoading(false);
        }
    };

    const searchForStock = async (query) => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`http://127.0.0.1:5050/api/search/${query}`);
            const data = await response.json();
            
            if (response.ok) {
                setStockInfo(data);
                setError('');
            } else {
                setError(data.error || 'Stock not found');
                setStockInfo(null);
            }
        } catch (err) {
            setError('Network error while searching');
            setStockInfo(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        const res = await fetch('http://127.0.0.1:5050/api/stocks/delete_by_symbol', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symbol: stockSymbol, quantity: parseInt(stockNumberEntered)})
        });
    
        const data = await res.json();
        if (!res.ok) {
            alert(`Error: ${data.error}`);
          } else {
            alert(data.message);
            // Refresh data immediately after successful transaction
            if (refreshData) refreshData();
            // Also refresh transaction history immediately
            if (window.refreshTransactions) {
                window.refreshTransactions();
            }
            closePopup();
          }
    };
    const handleAdd = async () => {
        let symbolToUse = stockSymbol;
        
        // For new stocks, use the searched stock info
        if (isNewStock && stockInfo) {
            symbolToUse = stockInfo.symbol;
        }
        
        if (!symbolToUse || symbolToUse === "Add Stock" || !stockNumberBuyEntered) {
            alert("Please search for a stock and enter quantity.");
            return;
        }

        const stockData = {
            symbol: symbolToUse,
            quantity: parseInt(stockNumberBuyEntered),
            // Don't send purchase_price - let backend fetch current price
        };

        try {
            const response = await fetch("http://127.0.0.1:5050/api/stocks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(stockData),
            });
            
            const data = await response.json();
            if (!response.ok) {
                alert(`Error: ${data.error}`);
            } else {
                alert("Stock added successfully!");
                // Refresh data immediately after successful transaction
                if (refreshData) refreshData();
                // Also refresh transaction history immediately
                if (window.refreshTransactions) {
                    window.refreshTransactions();
                }
                closePopup();
            }
        } catch (err) {
            alert("Network error while adding stock");
        }
    }
    
    return (
        <div>
            <div className="popup-side" onClick={closePopup}></div>
            <div className="popup-overlay">
                <div className="popup">
                    <img src='https://cdn-icons-png.flaticon.com/512/1828/1828778.png' alt='Close' className='popup-close-icon' onClick={closePopup} />
                    {isNewStock ? (
                        <>
                            <h1>Add New Stock</h1>
                            <h3>Search for Stock</h3>
                            <input 
                                type="text" 
                                placeholder="Enter stock symbol (e.g., AAPL, GOOGL)" 
                                className="popup-input" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchForStock(searchQuery)}
                            />
                            <button className="popup-close" onClick={() => searchForStock(searchQuery)}>Search</button>
                            
                            {isLoading && <p>Loading...</p>}
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            
                            {stockInfo && (
                                <div>
                                    <h2>{stockInfo.name} ({stockInfo.symbol})</h2>
                                    <h4> Industry: {stockInfo.industry} <br />
                                    Sector: {stockInfo.sector} <br />
                                    </h4>
                                    <h4>Current Price: ${stockInfo.current_price.toFixed(2)} {stockInfo.currency}</h4>
                                    <div className="stock-info">
                                        <h3>Stock Information</h3>
                                        <div className="stock-info-grid">
                                            <div className="stock-info-item">
                                                <span className="label"> Beta:  </span>
                                                <span className="value">{stockInfo.beta}</span>
                                            </div>
                                            <div className="stock-info-item">
                                                <span className="label"> Dividend Yield:  </span>
                                                <span className="value">{stockInfo.dividend_yield}</span>
                                            </div>
                                            <div className="stock-info-item">
                                                <span className="label"> Previous Close:  </span>
                                                <span className="value">{stockInfo.previous_close}</span>
                                            </div>
                                            <div className="stock-info-item">
                                                <span className="label"> Volume:  </span>
                                                <span className="value">{stockInfo.volume}</span>
                                            </div>
                                            <div className="stock-info-item">
                                                <span className="label"> PE Ratio:  </span>
                                                <span className="value">{stockInfo.pe_ratio}</span>
                                            </div>
                                            <div className="stock-info-item">
                                                <span className="label"> EPS:  </span>
                                                <span className="value">{stockInfo.eps}</span>
                                            </div>
                                        </div>
            
                                </div>
                                    <div className="account-section">
                                        <h4>Account Balance: ${accountBalance.toFixed(2)}</h4>
                                        {stockNumberBuyEntered > 0 && (
                                            <p>Cost: ${(stockInfo.current_price * stockNumberBuyEntered).toFixed(2)}</p>
                                        )}
                                    </div>
                                    
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            
                            {isLoading ? (
                                <p>Loading stock info...</p>
                            ) : stockInfo ? (
                                
                                <>
                                    <h1>{stockInfo.name} ({stockSymbol})</h1>
                                    <h4> Industry: {stockInfo.industry} <br />
                                    Sector: {stockInfo.sector} <br />
                                    </h4>
                                    <h4>
        
                                    Real Time Price: ${stockInfo.current_price} {stockInfo.currency}{' '}
                                    <span style={{ color: stockInfo.current_price - stockInfo.previous_close > 0 ? '#4CAF50' : '#f44336' }}>
                                        ({(stockInfo.current_price - stockInfo.previous_close > 0 ? '+' : '') +
                                        (stockInfo.current_price - stockInfo.previous_close).toFixed(2)})
                                    </span>
                                    </h4>
                                </>
                            ) : (
                                <h4>Loading price data...</h4>
                            )}
                            {stockInfo && (
                                <div className="stock-info">
                                    <h3>Stock Information</h3>
                                    <div className="stock-info-grid">
                                        <div className="stock-info-item">
                                            <span className="label"> Beta:  </span>
                                            <span className="value">{stockInfo.beta.toFixed(2)}</span>
                                        </div>
                                        <div className="stock-info-item">
                                            <span className="label"> Dividend Yield:  </span>
                                            <span className="value">{stockInfo.dividend_yield}</span>
                                        </div>
                                        <div className="stock-info-item">
                                            <span className="label"> Previous Close:  </span>
                                            <span className="value">{stockInfo.previous_close}</span>
                                        </div>
                                        <div className="stock-info-item">
                                            <span className="label"> Volume:  </span>
                                            <span className="value">{stockInfo.volume.toLocaleString()}</span>
                                        </div>
                                        <div className="stock-info-item">
                                            <span className="label"> PE Ratio:  </span>
                                            <span className="value">{stockInfo.pe_ratio.toFixed(2)}</span>
                                        </div>
                                        <div className="stock-info-item">
                                            <span className="label"> EPS:  </span>
                                            <span className="value">{stockInfo.eps}</span>
                                        </div>
                                    </div>
            
                                </div>
                            )

                            }
                            
                            {/* Ownership Information */}
                            {ownershipInfo && (
                                <div className="ownership-section">
                                    <h3>Your Holdings</h3>
                                    <div className="ownership-grid">
                                        <div className="ownership-item">
                                            <span className="label">Shares Owned:</span>
                                            <span className="value">{ownershipInfo.quantity}</span>
                                        </div>
                                        <div className="ownership-item">
                                            <span className="label">Avg. Purchase Price:</span>
                                            <span className="value">${ownershipInfo.purchase_price.toFixed(2)}</span>
                                        </div>
                                        <div className="ownership-item">
                                            <span className="label">Current Value:</span>
                                            <span className="value">${ownershipInfo.currentValue.toFixed(2)}</span>
                                        </div>
                                        <div className="ownership-item">
                                            <span className="label">Purchase Value:</span>
                                            <span className="value">${ownershipInfo.purchaseValue.toFixed(2)}</span>
                                        </div>
                                        <div className="ownership-item">
                                            <span className="label">Profit/Loss:</span>
                                            <span className={`value ${ownershipInfo.profitLoss >= 0 ? 'profit' : 'loss'}`}>
                                                ${ownershipInfo.profitLoss.toFixed(2)} ({ownershipInfo.profitLossPercent.toFixed(2)}%)
                                            </span>
                                        </div>
                                        <div className="ownership-item">
                                            <span className="label">% of Portfolio:</span>
                                            <span className="value">
                                                {((ownershipInfo.currentValue / (accountBalance + ownershipInfo.currentValue)) * 100).toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="account-section">
                                <h4>Account Balance: ${accountBalance.toFixed(2)}</h4>
                            </div>
                        </>
                    )}
                    <div className="action-section">
                        {((isNewStock && stockInfo) || !isNewStock) && (
                            <div>
                                <h3>Buy Stock</h3>
                                <input 
                                    type="number" 
                                    min="1" 
                                    placeholder="Enter quantity" 
                                    className="popup-input" 
                                    value={stockNumberBuyEntered} 
                                    onChange={(e) => setStockNumberBuyEntered(e.target.value)}
                                />
                                <button className="popup-action" onClick={handleAdd}>
                                    Buy
                                </button>
                            </div>
                        )}
                        
                        {!isNewStock && (
                            <div>
                                <h3>Sell Stock</h3>
                                <input 
                                    type="number" 
                                    min="1" 
                                    placeholder="Enter quantity to sell" 
                                    className="popup-input" 
                                    value={stockNumberEntered} 
                                    onChange={(e) => setStockNumberEntered(e.target.value)}
                                />
                                <button className="popup-action" onClick={handleDelete}>
                                    Sell
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <button onClick={closePopup} className="popup-close">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuySellPopup;
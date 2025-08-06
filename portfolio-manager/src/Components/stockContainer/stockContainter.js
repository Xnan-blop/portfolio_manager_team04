import React, {useState, useEffect} from 'react';
import './stockContainer.css';
import Stock from '../Stock/Stock.js';
import BuySellPopup from '../BuySellPopup/BuySellPopup.js';

const StockContainer = ({ refreshData }) => {
    // TODO: populate stockNames with stocks that the user owns
    const [stockNames, setStockNames] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchStocks();
    }, []);

    const [selectedStock, setSelectedStock] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = (stockName) => {
        setSelectedStock(stockName);
        if (!isPopupOpen) {
            setIsPopupOpen(!isPopupOpen);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedStock(null);
        // Refresh the stock list when popup closes
        fetchStocks();
        // Also refresh the parent component data (including header)
        if (refreshData) refreshData();
    }

    const fetchStocks = () => {
        fetch('http://127.0.0.1:5050/api/stocks')
          .then(res => {
            if (!res.ok) throw new Error('Failed to fetch stock names');
            return res.json();
          })
          .then(data => {
            setStockNames(data);
          })
          .catch(err => setError(err));
    };

    return (
        <div className='container dark-mode'>
            <div className='container-header'>
                <h2 style={{margin: 0, color: 'white', fontSize: 'var(--title-font-size)', fontWeight: 'var(--title-font-weight)'}}>Portfolio Holdings</h2>
                <p style={{margin: '5px 0 0 0', color: '#c6baef', fontSize: 'var(--subtitle-font-size)', fontWeight: 'var(--subtitle-font-weight)'}}>
                    {stockNames.length} {stockNames.length === 1 ? 'holding' : 'holdings'}
                </p>
            </div>
            <div className='container-content'>
                {stockNames.map((stock) => (
                    <Stock
                        key={stock.id || stock.symbol}
                        stockName={stock.symbol} 
                        ClickHandler={() => togglePopup(stock.symbol)}
                    />
                ))}
                <Stock
                    stockName="Buy Stock"
                    ClickHandler={() => togglePopup("Add Stock")}
                />
            </div>
            {isPopupOpen && <BuySellPopup stockSymbol={selectedStock} closePopup={closePopup} />}
        </div>
    );
};

export default StockContainer;
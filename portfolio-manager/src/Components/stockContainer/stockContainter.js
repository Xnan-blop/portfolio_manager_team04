import React, {useState, useEffect} from 'react';
import './stockContainer.css';
import Stock from '../Stock/Stock.js';
import BuySellPopup from '../BuySellPopup/BuySellPopup.js';

const StockContainer = () => {
    // TODO: populate stockNames with stocks that the user owns
    const [stockNames, setStockNames] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:5050/api/stocks')  // your Flask route
          .then(res => {
            if (!res.ok) throw new Error('Failed to fetch stock names');
            return res.json();
          })
          .then(data => {
            setStockNames(data);
          })
          .catch(err => setError(err));
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
    }

    return (
        <div className='container dark-mode'>
            <h2>Portfolio Holdings</h2>
            {stockNames.map((stock) => (
                <Stock
                    key={stock.id || stock.symbol}
                    stockName={stock.symbol} // ← pass string, not full object
                    ClickHandler={() => togglePopup(stock.symbol)} // pass full object if needed
                />
                ))}
            {isPopupOpen && <BuySellPopup stockName={selectedStock} closePopup={closePopup} />}
        </div>
    );
};

export default StockContainer;
import React, {useState} from 'react';
import './stockContainer.css';
import Stock from '../Stock/Stock.js';
import BuySellPopup from '../BuySellPopup/BuySellPopup.js';

const StockContainer = () => {
    // TODO: populate stockNames with stocks that the user owns
    const stockNames = ['APPL', 'AMZN', 'MSFT', 'GOOGL', 'NVDA', 'TSLA'];
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
            {stockNames.map((name, i) => (
                <Stock key={i} stockName={name} ClickHandler={() => togglePopup(name)} />
            ))}
            {isPopupOpen && <BuySellPopup stockName={selectedStock} closePopup={closePopup} />}
        </div>
    );
};

export default StockContainer;
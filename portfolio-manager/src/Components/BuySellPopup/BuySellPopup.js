import './BuySellPopup.css';
import React, {useState} from "react";

const BuySellPopup = ({ stockName, closePopup }) => {
    const [stockSymbolEntered, setStockSymbolEntered] = useState('');
    const handleDelete = async (e) => {
        e.preventDefault();
    
        const res = await fetch('http://127.0.0.1:5050/api/stocks/delete_by_symbol', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ symbol: stockSymbolEntered })
        });
    
        const data = await res.json();
        alert(data.message);
      };
    return (
        <div>
            <div className="popup-side" onClick={closePopup}></div>
            <div className="popup-overlay">
                <div className="popup">
                    <h1>{stockName}</h1>
                    <h4>Real Time Price: 100</h4>
                    <h4>holdings: 50</h4>
                    <h4>Avg purchase price: 150</h4>
                    <h3>Buy Stock</h3>
                    <input type="text" id="buy-stock" placeholder="Enter amount" className="popup-input" />
                    <button className="popup-action">
                        Buy
                    </button>
                    <h3>Sell Stock</h3>
                    <input type="text" id="sell-stock" placeholder="Enter amount" className="popup-input" value={stockSymbolEntered} onChange={(e) => setStockSymbolEntered(e.target.value)}/>
                    <button className="popup-action" onClick = {handleDelete}>
                        Sell
                    </button>
                    <button onClick={closePopup} className="popup-close">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuySellPopup;
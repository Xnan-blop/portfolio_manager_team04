import './BuySellPopup.css';
import React, {useState} from "react";

const BuySellPopup = ({ stockSymbol, closePopup }) => {
    const [stockNumberEntered, setStockNumberEntered] = useState(0);
    const [stockNumberBuyEntered, setStockNumberBuyEntered] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(10);
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
            // handle error from server
            alert(`Error: ${data.error}`);
          } else {
            alert(data.message);
          }
    };
    const handleAdd = async () => {
        if (!stockSymbol || !purchasePrice || !stockNumberBuyEntered) {
            alert("Please fill in symbol, purchase price, and quantity.");
            return;
          }
        const stockData = {
        symbol: stockSymbol,
        purchase_price: 100, //Assuming price
        //purchase_price: parseFloat(purchasePrice),
        quantity: parseInt(stockNumberBuyEntered),
        name: stockSymbol, // Assuming name is the same as symbol
        };
        const response = await fetch("http://127.0.0.1:5050/api/stocks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(stockData),
          });
        const data = await response.json();
        if (!response.ok) {
            // handle error from server
            alert(`Error: ${data.error}`);
        } else {
            alert("Stock added successfully!");
        }

    }
    
    return (
        <div>
            <div className="popup-side" onClick={closePopup}></div>
            <div className="popup-overlay">
                <div className="popup">
                    <h1>{stockSymbol}</h1>
                    <h4>Real Time Price: 100</h4>
                    <h4>holdings: 50</h4>
                    <h4>Avg purchase price: 150</h4>
                    <h3>Buy Stock</h3>
                    <input type="number" min = '0' id="buy-stock" placeholder="Enter amount" className="popup-input" value={stockNumberBuyEntered} onChange={(e) => setStockNumberBuyEntered(e.target.value)}/>
                    <button className="popup-action" onClick = {handleAdd}>
                        Buy
                    </button>
                    <h3>Sell Stock</h3>
                    <input type="number" min = '0' id="sell-stock" placeholder="Enter amount" className="popup-input" value={stockNumberEntered} onChange={(e) => setStockNumberEntered(e.target.value)}/>
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
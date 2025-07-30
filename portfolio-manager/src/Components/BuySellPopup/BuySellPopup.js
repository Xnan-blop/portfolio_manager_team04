import './BuySellPopup.css';
import React, {useState} from "react";

const BuySellPopup = ({ stockName, closePopup }) => {
    const [quantity, setQuantity] = useState(0);
    const handleSliderChange = (e) => {
        setQuantity(e.target.value);
        document.getElementById("slide").innerText = e.target.value;
    }
    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Stock Information: {stockName}</h2>
                <h3>Buy Stock</h3>
                <div class="slidecontainer">
                    <input type="range" min="0" max="999" class="slider" id="myRange" onChange={handleSliderChange}/>
                    <p>Quantity: <span id="slide">SELECT</span></p>
                </div>
                <h3>Sell Stock</h3>
                <input type="text" placeholder="Enter amount" className="popup-input" />
                <button className="popup-close">
                    Sell
                </button>
                <button onClick={closePopup} className="popup-close">
                    Close
                </button>
            </div>
        </div>
    );
};

export default BuySellPopup;
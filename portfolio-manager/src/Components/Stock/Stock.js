import React from 'react';
import './Stock.css';

const Stock = ({stockName, ClickHandler}) => {
    return (
        <button className='stock dark-mode' onClick={() => ClickHandler()}>
            {stockName}
        </button>
    );
};

export default Stock;
import React from 'react';
import './Stock.css';

const Stock = ({stockName}) => {
    return (
        <div className='stock dark-mode'>
            {stockName}
        </div>
    );
};

export default Stock;
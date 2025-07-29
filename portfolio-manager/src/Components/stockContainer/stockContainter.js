import React from 'react';
import './stockContainer.css';
import Stock from '../Stock/Stock.js';

const Container = () => {
    // TODO: populate stockNames with stocks that the user owns
    const stockNames = ['APPL', 'AMZN', 'MSFT', 'GOOGL', 'NVDA', 'TSLA'];
    
    return (
        <div className='container'>
            {stockNames.map((name, i) => (
            <Stock key={i} stockName={name} />
            ))}
        </div>
    );
};

export default Container;
import React from 'react';
import './Container.css';
import Stock from '../Stock/Stock.js';

const Container = () => {
    // TODO: Add logic to have multiple Stocks (from how many the user has)
    // TODO: The first stock should have space on the top of the container div
    // TODO: Be able to add or remove stocks based on the portfolio
    return (
        <div className='container'>
        <Stock stockName={"APPL"}/>
        <Stock stockName={"AMZN"}/>
        <Stock stockName={"GOOGL"}/>
        <Stock stockName={"MSFT"}/>
        <Stock stockName={"META"}/>
        <Stock stockName={"NVDA"}/>
        </div>
    );
};

export default Container;
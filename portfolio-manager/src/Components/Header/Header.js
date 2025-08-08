import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ refreshKey }) => {
    const [accountInfo, setAccountInfo] = useState({
        balance: 0,
        totalInvested: 0,
        totalValue: 0,
        realizedPnL: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAccountInfo();
    }, [refreshKey]); // Refresh when refreshKey changes

    const fetchAccountInfo = async () => {
        try {
            // Fetch account balance
            const accountResponse = await fetch('http://127.0.0.1:5050/api/account');
            const accountData = await accountResponse.json();
            
            // Fetch all stocks to calculate invested amount
            const stocksResponse = await fetch('http://127.0.0.1:5050/api/stocks');
            const stocksData = await stocksResponse.json();
            
            // Fetch realized P&L from completed transactions
            const realizedPnLResponse = await fetch('http://127.0.0.1:5050/api/portfolio/realized-pnl');
            const realizedPnLData = await realizedPnLResponse.json();
            
            // Calculate total invested amount using simple for loop for clarity
            let totalInvested = 0;
            for (const stock of stocksData) {
                totalInvested += (stock.purchase_price * stock.quantity);
            }

            // Calculate current total value by fetching current prices
            let totalCurrentValue = 0;
            for (const stock of stocksData) {
                try {
                    const priceResponse = await fetch(`http://127.0.0.1:5050/api/search/${stock.symbol}`);
                    const priceData = await priceResponse.json();
                    if (priceResponse.ok) {
                        totalCurrentValue += priceData.current_price * stock.quantity;
                    } else {
                        // Fallback to purchase price if current price unavailable
                        totalCurrentValue += stock.purchase_price * stock.quantity;
                    }
                } catch {
                    // Fallback to purchase price if API fails
                    totalCurrentValue += stock.purchase_price * stock.quantity;
                }
            }

            setAccountInfo({
                balance: accountData.balance,
                totalInvested: totalInvested,
                totalValue: totalCurrentValue,
                realizedPnL: realizedPnLResponse.ok ? realizedPnLData.total_realized_pnl : 0
            });
        } catch (error) {
            console.error('Error fetching account info:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className='header'>
                <p className='heading dark-mode'>Portfolio Manager</p>
                <div className='account-info'>Loading...</div>
            </div>
        );
    }

    const totalPortfolioValue = accountInfo.balance + accountInfo.totalValue;
    const unrealizedPnL = accountInfo.totalValue - accountInfo.totalInvested;
    const totalPnL = unrealizedPnL + accountInfo.realizedPnL;

    return (
        <div className='header'>
            <p className='heading dark-mode'>
                Portfolio Manager
            </p>
            <div className='account-info'>
                <div className='balance-section'>
                    <div className='balance-item'>
                        <span className='label'>Cash Available:</span>
                        <span className='amount'>${accountInfo.balance.toFixed(2)}</span>
                    </div>
                    <div className='balance-item'>
                        <span className='label'>Invested:</span>
                        <span className='amount'>${accountInfo.totalValue.toFixed(2)}</span>
                    </div>
                    <div className='balance-item'>
                        <span className='label'>Total Portfolio:</span>
                        <span className='amount total'>${totalPortfolioValue.toFixed(2)}</span>
                    </div>
                    <div className='balance-item'>
                        <span className='label'>Total P&L:</span>
                        <span className={`amount ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
                            ${totalPnL.toFixed(2)}
                        </span>
                    </div>
                    <div className='balance-item pnl-breakdown'>
                        <span className='label'>└ Unrealized:</span>
                        <span className={`amount small ${unrealizedPnL >= 0 ? 'profit' : 'loss'}`}>
                            ${unrealizedPnL.toFixed(2)}
                        </span>
                    </div>
                    <div className='balance-item pnl-breakdown'>
                        <span className='label'>└ Realized:</span>
                        <span className={`amount small ${accountInfo.realizedPnL >= 0 ? 'profit' : 'loss'}`}>
                            ${accountInfo.realizedPnL.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header;
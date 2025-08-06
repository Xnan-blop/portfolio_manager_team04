import React, { useState, useEffect } from "react";
import './TransactionContainer.css';

const TransactionContainer = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:5050/api/transactions');
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            } else {
                setError('Failed to fetch transaction history');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="transactions-container">
                <div className="transactions-header">
                    <h3>Transaction History</h3>
                </div>
                <div className="loading">Loading transactions...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="transactions-container">
                <div className="transactions-header">
                    <h3>Transaction History</h3>
                </div>
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h3>Transaction History</h3>
                <div className="transaction-count">{transactions.length} transactions</div>
            </div>
            
            {transactions.length === 0 ? (
                <div className="no-transactions">
                    <p>No transactions yet</p>
                    <p>Start buying stocks to see your transaction history here!</p>
                </div>
            ) : (
                <div className="transactions-list">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="transaction-item">
                            <div className="transaction-main">
                                <div className="transaction-symbol-type">
                                    <span className="symbol">{transaction.symbol}</span>
                                    <span className={`type ${transaction.type.toLowerCase()}`}>
                                        {transaction.type}
                                    </span>
                                </div>
                                <div className="transaction-amount">
                                    <span className={`amount ${transaction.type.toLowerCase()}`}>
                                        {transaction.type === 'BUY' ? '-' : '+'}${transaction.total_amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div className="transaction-details">
                                <div className="detail-group">
                                    <span className="detail-label">Quantity:</span>
                                    <span className="detail-value">{transaction.quantity} shares</span>
                                </div>
                                <div className="detail-group">
                                    <span className="detail-label">Price:</span>
                                    <span className="detail-value">${transaction.purchase_price.toFixed(2)}</span>
                                </div>
                                <div className="detail-group">
                                    <span className="detail-label">Date:</span>
                                    <span className="detail-value">{formatDate(transaction.date)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionContainer;
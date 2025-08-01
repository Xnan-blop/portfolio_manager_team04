import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StockContainer from './Components/stockContainer/stockContainter.js';
import Header from './Components/Header/Header.js';
import GraphContainer from './Components/GraphContainer/graphContainer.js';

function App() {
  const [stocks, setStocks] = useState([]); // Hold response from backend
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger refreshes

  useEffect(() => {
    fetch('http://127.0.0.1:5050/api/stocks')
      .then(res => res.json())
      .then(data => {setStocks(data)})
      .catch(err => console.error('Error fetching from backend:', err));
  }, [refreshKey]);

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  const AddStock = () => {
    const [stockName, setStockName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [Symbol, setSymbol] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://127.0.0.1:5050/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: stockName, quantity: parseInt(quantity), purchasePrice: parseFloat(purchasePrice), symbol: Symbol })
      });
  
      const data = await response.json();
      console.log(data.message);
      refreshData(); // Refresh data after adding stock
    }
  }


  return (
    <div className="App">
      <Header refreshKey={refreshKey} />
      <div className='containers'>
        <StockContainer refreshData={refreshData}/>
        <GraphContainer/>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StockContainer from './Components/stockContainer/stockContainter.js';
import Header from './Components/Header/Header.js';
import GraphContainer from './Components/GraphContainer/graphContainer.js';

function App() {
  const [stocks, setStocks] = useState([]); // Hold response from backend

  useEffect(() => {
    fetch('http://localhost:5050/api/stocks')
      .then(res => res.json())
      .then(data => {setStocks(data)})
      .catch(err => console.error('Error fetching from backend:', err));
  }, []);

  const AddStock = () => {
    const [stockName, setStockName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [Symbol, setSymbol] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://http://127.0.0.1:5050/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: stockName, quantity: parseInt(quantity), purchasePrice: parseFloat(purchasePrice), symbol: Symbol })
      });
  
      const data = await response.json();
      console.log(data.message);
    }
  }

  return (
    <div className="App">

      <Header />

      <div className='containers'>
        <StockContainer/>
        <GraphContainer/>
      </div>
    </div>
  );
}

export default App;

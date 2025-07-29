import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]); // Hold response from backend

  useEffect(() => {
    fetch('http://localhost:5050/api/stocks')
      .then(res => res.json())
      .then(data => {setStocks(data)})
      .catch(err => console.error('Error fetching from backend:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <strong>{stocks.map(stock => (
            <li key={stock.id}>{stock.symbol}</li>
          ))}</strong>
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

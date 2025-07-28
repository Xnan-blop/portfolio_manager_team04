import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Stock from './Components/Stock/Stock'

function App() {
  const [message, setMessage] = useState(''); // Hold response from backend

   useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('Error fetching from backend:', err));
  }, []);

  return (
    <div className="App">
      <Stock stockName="AAPL"/>
      <Stock stockName="AMZN"/>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Components/stockContainer/stockContainter.js';
import Header from './Components/Header/Header.js';

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
      <Header />
      <Container />
    </div>
  );
}

export default App;

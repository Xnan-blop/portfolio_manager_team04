import { useState } from 'react';
import './App.css';
import StockContainer from './Components/stockContainer/stockContainter.js';
import Header from './Components/Header/Header.js';
import GraphContainer from './Components/GraphContainer/graphContainer.js';
import TransactionContainer from './Components/TransactionContainer/TransactionContainer.js';

function App() {
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger refreshes

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };


  return (
    <div className="App">
      <Header refreshKey={refreshKey} />
      <div className='containers'>
        <div className='left-column'>
          <StockContainer refreshData={refreshData}/>
          <TransactionContainer refreshKey={refreshKey} />
        </div>
        <div className='right-column'>
          <GraphContainer/>
        </div>
      </div>
    </div>
  );
}

export default App;

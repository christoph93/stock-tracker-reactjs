import React from 'react';
import logo from './logo.svg';
import './App.css';
import TickerCard from './components/TickerCard';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div>
      <TickerCard symbol='TEST4' />
    </div>
  );
}

export default App;

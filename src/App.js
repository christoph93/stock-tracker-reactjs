import React from 'react';
import logo from './logo.svg';
import './App.css';
import TickerCard from './components/TickerCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import TickerList from './components/TickerList';



function App() {
  return (
    <div>
      <TickerList />      
    </div>
  );
}

export default App;

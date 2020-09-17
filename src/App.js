import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TickerList from './components/Ticker/TickerList';
import Navbar from './components/NavBar';
import PositionList from './components/Position/PositionList'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>        
        <Route exact path="/positions" component={PositionList} />
        <Route exact path="/symbolList" component={TickerList} />
        </Switch>
      </div>

    </Router>



  );
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tickers from './Views/Tickers';
import Navbar from './components/NavBar';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Positions from './Views/Positions'
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import Home from './Views/Home';



function App() {

  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Router history={history}>      
        <Navbar />
        <Switch>          
          <Route path="/home" component={Home} />
          <Route path="/positions" component={Positions} />
          <Route path="/tickers" component={Tickers} />
        </Switch>      
    </Router>

  );
}

export default App;
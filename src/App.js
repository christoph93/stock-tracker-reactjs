import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TickerList from './Views/TickerList';
import Navbar from './components/NavBar';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PositionTable from './Views/PositionTable'
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
      <div id="app" className="d-flex flex-column h-100">
        <Navbar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/positionTable" component={PositionTable} />
          <Route path="/symbolList" component={TickerList} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
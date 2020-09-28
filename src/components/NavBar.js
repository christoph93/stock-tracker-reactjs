import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import LogoutButton from "./LogoutButton";

function NavBar() {

  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Navbar bg="dark" variant="dark" sticky="top" collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">StockTracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && (
            <Nav.Link href="#tickers">Symbols</Nav.Link>
          )}
          {isAuthenticated && (
            <Nav.Link href="#positions">Positions</Nav.Link>
          )}
          {isAuthenticated && (
            <Nav.Link href="#transactions">Transactions</Nav.Link>
          )}
          {isAuthenticated && (
            <Nav.Link href="#dividends">Dividends</Nav.Link>
          )}
        </Nav>        
      </Navbar.Collapse>
      {!isAuthenticated ? <LoginButton /> : <div><LogoutButton /> </div>}



    </Navbar>
  );
}


export default NavBar;
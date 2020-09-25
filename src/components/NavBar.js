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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">StockTracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && (
            <div>
              <Nav.Link href="#tickers">Symbols</Nav.Link>
              <Nav.Link href="#positions">Positions</Nav.Link>
              <Nav.Link href="#transactions">Transactions</Nav.Link>
            </div>
          )}
        </Nav>
        {isAuthenticated ? <p>Auth</p> : <p>Not auth</p>}
      </Navbar.Collapse>
      {!isAuthenticated ? <LoginButton /> : <div><LogoutButton /> </div>}



    </Navbar>
  );
}


export default NavBar;
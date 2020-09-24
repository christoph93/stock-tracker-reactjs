import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

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
                <Nav.Link href="#symbolList">Symbols</Nav.Link>
              )}
              {isAuthenticated && (
                <Nav.Link href="#positionTable">Positions</Nav.Link>
              )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default NavBar;
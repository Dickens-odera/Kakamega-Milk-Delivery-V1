import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Nav, Offcanvas, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';

const NavbarItem = () => {

    const { connectedAccount } = useContext(MilkDeliveryContext);
    return (
        <div className="mb-2">
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Kakamega County Blockchain Milk Delivery DAPP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Delivery Records</Nav.Link>
                            <Nav.Link href="#link">Approved Vendors</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link>
                        {`${connectedAccount.slice(0, 5)}...${connectedAccount.slice(connectedAccount.length - 6)}`}
                    </Nav.Link>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarItem;
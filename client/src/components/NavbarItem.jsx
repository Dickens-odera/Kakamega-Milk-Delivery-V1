import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { MilkDeliveryContext } from "../context/MilkDeliveryContext";
import { GiMilkCarton } from "react-icons/gi";
import "./Components.css";

const NavbarItem = () => {
  const { connectedAccount } = useContext(MilkDeliveryContext);
  return (
    <div className="mb-2">
      <Navbar
        style={{
          background: "#0C7631 !important",
        }}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            style={{
              display: "flex",
            }}
          >
            <GiMilkCarton size={40} color="#fff" />

            <h4
              style={{
                paddingLeft: "7px",
                color: "white",
                paddingTop: "5px",
              }}
            >
              KADAFA
            </h4>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Delivery Records</Nav.Link>
              <Nav.Link href="#link">Approved Vendors</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Nav.Link 
          style={{
            color: "white",
            fontSize: "20px",
          }}
          >
            {`${connectedAccount.slice(0, 5)}...${connectedAccount.slice(
              connectedAccount.length - 6
            )}`}
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarItem;

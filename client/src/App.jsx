import { useState, useContext } from "react";
import {
  NavbarItem,
  Footer,
  MilkDeliveries,
  MilkDeliveryItem,
  Welcome,
  NewDeliveryItem,
  NewVendor,
} from "./components";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/dashboard/Sidebar";
import styled from "styled-components";
import Collectors from "./components/dashboard/Collectors";
import Farmers from "./components/dashboard/Farmers";
import Deliveries from "./components/dashboard/Deliveries";
import Settings from "./components/dashboard/Settings";
import Logout from "./components/dashboard/Logout";
import NewFarmer from "./components/NewFarmer";
// import Login from "./components/dashboard/Login";
//import { MilkDeliveryContext } from './context/MilkDeliveryContext';

const App = () => {
  //const { networkId } = useContext(MilkDeliveryContext);

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Container>
            <Row>
              <NavbarItem />
              <Welcome />
              <NewDeliveryItem />
              {/* <MilkDeliveries /> */}
              <Footer />
            </Row>
          </Container>
        </Route>
        <Route path="/collectors">
          <Sidebar />
          <Collectors />
        </Route>
        <Route path="/farmers">
          <Sidebar />
          <Farmers />
        </Route>
        <Route path="/transactions">
          {/* <Sidebar /> */}
          {/* <Register /> */}
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/payments">
          {/* <Sidebar /> */}
          {/* <Register /> */}
        </Route>
        <Route path="/deliveries">
          <Sidebar />
          <Deliveries />
        </Route>
        <Route path="/settings">
          <Sidebar />
          <Settings />
        </Route>
        {/* <Route path="/login">
          <Sidebar />
          <Login />
        </Route> */}

        <Route path="/new">
          <Sidebar />
          <NewFarmer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

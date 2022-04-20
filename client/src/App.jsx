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
import MilkDelivered from "./components/dashboard/MilkDelivered";
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
            </Row>
          </Container>
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
      {/* dashboard routes */}
      <Sidebar />
      <Switch>
        <Route path="/collectors" exact={true} component={Collectors} />
        <Route path="/farmers" exact={true} component={Farmers} />
        <Route path="/deliveries" exact={true} component={Deliveries} />
        <Route path="/payments" exact={true} component={Deliveries} />
        <Route path="/settings" exact={true} component={Settings} />
        <Route path="/new" exact={true} component={NewFarmer} />
        <Route path="/newdelivery" exact={true} component={MilkDelivered} />
      </Switch>
    </Router>
  );
};

export default App;

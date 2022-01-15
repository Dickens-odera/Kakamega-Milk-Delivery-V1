import { useState } from 'react';
import { NavbarItem, Footer, MilkDeliveries, MilkDeliveryItem, Welcome, NewDeliveryItem } from './components';
import { Container, Row, Col } from 'react-bootstrap';

const App = () =>  {

  return (
   <div className="">
    <Container>
      <Row>
          <NavbarItem />
            <Welcome />
           
            <NewDeliveryItem />
            <MilkDeliveries />
            <Footer />
        
      </Row>
    </Container>
   </div>

  );
}

export default App

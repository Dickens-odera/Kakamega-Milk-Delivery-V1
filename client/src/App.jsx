import { useState, useContext } from 'react';
import { NavbarItem, Footer, MilkDeliveries, MilkDeliveryItem, Welcome, NewDeliveryItem, NewVendor } from './components';
import { Container, Row, Col } from 'react-bootstrap';
import { MilkDeliveryContext } from './context/MilkDeliveryContext';

const App = () =>  {
  const { networkId } = useContext(MilkDeliveryContext);

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

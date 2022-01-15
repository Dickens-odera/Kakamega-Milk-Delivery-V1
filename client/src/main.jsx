import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import { MilkDeliveryProvider } from './context/MilkDeliveryContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

ReactDOM.render(
  <MilkDeliveryProvider >
    <React.StrictMode>
      <Container>
        <App />

      </Container>
    </React.StrictMode>,
  </MilkDeliveryProvider>,
  document.getElementById('root')
)

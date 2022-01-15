import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import { MilkDeliveryProvider } from './context/MilkDeliveryContext';

ReactDOM.render(
  <MilkDeliveryProvider >
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </MilkDeliveryProvider>,
  document.getElementById('root')
)

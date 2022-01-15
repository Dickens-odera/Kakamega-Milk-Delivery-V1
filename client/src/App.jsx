import { useState } from 'react';
import { Navbar, Footer, MilkDeliveries, MilkDeliveryItem, Welcome, NewDeliveryItem } from './components';

const App = () =>  {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <NewDeliveryItem />
      <MilkDeliveries />
      <Footer />
    </div>
  );
}

export default App

import { useState } from 'react'
import { Navbar, Footer, MilkDeliveries, MilkDeliveryItem, Welcome } from './components';

const App = () =>  {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <MilkDeliveries />
      <Footer />
    </div>
  )
}

export default App

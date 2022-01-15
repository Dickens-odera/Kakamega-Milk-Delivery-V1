import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from './context/MilkDeliveryContext';

const Welcome = () => {
    const { connectWallet } = useContext(MilkDeliveryContext);
    return(
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>
    );
}

export default Welcome;
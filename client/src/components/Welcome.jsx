import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';

const Welcome = () => {
    const { connectWallet, connectedtAccount } = useContext(MilkDeliveryContext);
    return(
        <div>
            {!connectedtAccount && 
                <button onClick={connectWallet}>Connect Wallet</button>
            }
        </div>
    );
}

export default Welcome;
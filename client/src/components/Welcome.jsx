import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';
import { Button } from 'react-bootstrap';

const Welcome = () => {
    const { connectWallet, connectedAccount } = useContext(MilkDeliveryContext);
    return(
        <div className="md-3">
            {!connectedAccount && 
                <Button onClick={connectWallet}>Connect Wallet</Button>
            }
        </div>
    );
}

export default Welcome;
import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';
import { Button } from 'react-bootstrap';

const Welcome = () => {
    const { connectWallet, connectedAccount, isConnectedToRinkeby, networkId } = useContext(MilkDeliveryContext);
    return(
        <div className="md-3">
            {!connectedAccount && 
                <Button onClick={connectWallet}>Connect Wallet</Button>
            }

            {networkId && networkId != 4 &&
                <p style={{ color:"red"}}>Please switch your network to Rinkeby Testnet</p>
            }
        </div>
    );
}

export default Welcome;
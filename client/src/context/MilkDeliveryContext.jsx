import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { ContractABI, ContractAddress } from './utils/constants';

export const MilkDeliveryContext = React.createContext();

const { ethereum } = window;

const getMilkDeliveryContract = () => {
    const provider = new ethers.provider.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const MilkDeliveryConract = new ethers.Contract(ContractAddress, ContractABI, signer);

    console.log({
        provider,
        signer,
        MilkDeliveryConract
    })
}

export const MilkDeliveryProvider = ({ children }) => {
    const [connectedtAccount, setConnectedAccount ] = useState('');
     
    const checkIfWalletIsConnected = async() => {
        if(!ethereum) return alret("Please Install Metamask");

        const accounts = await ethereum.request({ method: 'eth_accounts'});

        console.log(accounts);
    }

    const connectWallet = async() => {
        try{
            if (!ethereum) return alret("Please Install Metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);
        }catch(error){
            console.error(error);
            
            throw new Error("No Ethereum object detected");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        <MilkDeliveryContext.Provider value={{ connectWallet }}>
            { children }
        </MilkDeliveryContext.Provider>
    );
}
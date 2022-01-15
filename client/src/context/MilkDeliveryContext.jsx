import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { ContractABI, ContractAddress } from '../utils/constants';

export const MilkDeliveryContext = React.createContext();

const { ethereum } = window;

const getMilkDeliveryContract = () => {
    const provider = new ethers.provider.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const milkDeliveryConract = new ethers.Contract(ContractAddress, ContractABI, signer);

    console.log({
        provider,
        signer,
        milkDeliveryConract
    })

    return milkDeliveryConract;
}

export const MilkDeliveryProvider = ({ children }) => {
    const [connectedtAccount, setConnectedAccount ] = useState('');
    const [formData, setFormData ] = useState({ amount: '',quality: ''});


    const handleChange = (e, name) => {
        setFormData(( prevState) => ( { ...prevState, [name]: e.target.value}));
    }

    const checkIfWalletIsConnected = async() => {
        try{
            if (!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                //getMilkDeliveries()
            }
            console.log(accounts);
        }catch(error){
            console.error(error);
            throw new Error("No Ethereum object detected");
        }
    }

    const connectWallet = async() => {
        try{
            if (!ethereum) return alert("Please Install Metamask");
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
        <MilkDeliveryContext.Provider value={{ connectWallet, connectedtAccount, formData, setFormData }}>
            { children }
        </MilkDeliveryContext.Provider>
    );
}
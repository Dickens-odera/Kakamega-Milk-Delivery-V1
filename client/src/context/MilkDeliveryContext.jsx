import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { ContractABI, ContractAddress } from '../utils/constants';

export const MilkDeliveryContext = React.createContext();

const { ethereum } = window;

const getMilkDeliveryContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const milkDeliveryConract = new ethers.Contract(ContractAddress, ContractABI, signer);

    console.log({
        provider,
        signer,
        milkDeliveryConract
    })
    setDeliveryContract(milkDeliveryConract);
    //return milkDeliveryConract;
}

export const MilkDeliveryProvider = ({ children }) => {
    const [connectedtAccount, setConnectedAccount ] = useState('');
    const [formData, setFormData ] = useState({ quantity: '',quality: ''});
    const [deliveryContract, setDeliveryContract ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const handleChange = (e, name) => {
        setFormData(( prevState ) => ( { ...prevState, [name]: e.target.value}));
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

    const addNewDelivery = async() => {
        const { quantity, quality } = formData;
        try{
            if (!ethereum) return alert("Please Install Metamask");

            getMilkDeliveryContract();
            setIsLoading(true);
            //const tx = await deliveryContract.recordNewDelivery(quantity, quality);
        }catch(error){
            console.error(error);
            //throw new Error("No Ethereum object detected");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        <MilkDeliveryContext.Provider value={{ connectWallet, connectedtAccount, formData, setFormData, handleChange, addNewDelivery, deliveryContract, isLoading }}>
            { children }
        </MilkDeliveryContext.Provider>
    );
}
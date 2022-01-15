import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import swal from 'sweetalert';

import { ContractABI, ContractAddress } from '../utils/constants';

export const MilkDeliveryContext = React.createContext();

const { ethereum } = window;

const getMilkDeliveryContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const milkDeliveryConract = new ethers.Contract(ContractAddress, ContractABI, signer);

    return milkDeliveryConract;
}

export const MilkDeliveryProvider = ({ children }) => {
    const [ connectedAccount, setConnectedAccount ] = useState('');
    const [ formData, setFormData ] = useState({ quantity: '',quality: ''});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ milkDeliveryItems, setMilkDeliveryItems ] = useState([]);

    const handleChange = (e, name) => {
        setFormData(( prevState ) => ( { ...prevState, [name]: e.target.value}));
    }

    const checkIfWalletIsConnected = async() => {
        try{
            if (!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                getMilkDeliveryItems();            
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
            getMilkDeliveryItems();
        }catch(error){
            console.error(error);
            
            throw new Error("No Ethereum object detected");
        }
    }

    const addNewDelivery = async() => {
        const { quantity, quality } = formData;
        try{
            if (!ethereum) return alert("Please Install Metamask");

            const milkDeliveryConract = getMilkDeliveryContract();
            //const listVendor = await milkDeliveryConract.listNewVendor(connectedtAccount,"My Factory","Dickens Odera","dickensodera9@gmail.com");
            //const approveVendor = await milkDeliveryConract.approveVendor(connectedtAccount);

            const tx = await milkDeliveryConract.recordNewDelivery(quantity.toString(), quality.toString());
            
            setIsLoading(true);
            console.log('Loading ....');
            console.log(tx.hash);

            await tx.wait();
            console.log('Sucesss ....');
            console.log(tx.hash);
            setIsLoading(false);
            swal("Delivery Item Added Successfully");
            getMilkDeliveryItems();
        }catch(error){
            swal(error.message);
            console.error(error);
            throw new Error("No Ethereum object detected");
        }
    }

    const getMilkDeliveryItems = async() => {
        try{ 
            if (!ethereum) return alert("Please Install Metamask");
   
            const milkDeliveryConract = getMilkDeliveryContract();

            const deliveryItems = await milkDeliveryConract.listAllDeliveryItems();
            const structuredDeliveryItems = deliveryItems.map(( item, index) => ({ 
                id: item.id.toNumber(),
                quantity: item.quantity.toNumber(),
                quality: item.milkQualityType,
                vendor: item.vendor,
                date: new Date(item.date.toNumber() * 1000).toLocaleString()
            }));
            console.log(structuredDeliveryItems);
            setMilkDeliveryItems(structuredDeliveryItems);
        }catch(error){  
            console.error(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return (
        <MilkDeliveryContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, addNewDelivery, isLoading, milkDeliveryItems }}>
            { children }
        </MilkDeliveryContext.Provider>
    );
}
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
    const [vendorFormData, setVendorFormData] = useState({ name: '', email: '', factory: ' ', address: ' ', isApproved:''});
    const [ contractOwner, setContractOwner ] = useState('');
    const [ vendorFormAddress, setVendorFormAddress ] = useState({ address:''});

    const handleChange = (e, name) => {
        setFormData(( prevState ) => ( { ...prevState, [name]: e.target.value}));
        setVendorFormData(( prevState) => ({ ...prevState, [name]: e.target.value }));
        setVendorFormAddress(( prevState) => ({...prevState, [name]: e.target.value}));
    }

    const checkIfWalletIsConnected = async() => {
        try{
            if (!ethereum) return alert("Please Install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                getContractOwnerAddress();
                getMilkDeliveryItems();
                getWalletAddress();            
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
            getContractOwnerAddress();
            getWalletAddress();
            getMilkDeliveryItems();
        }catch(error){
            console.error(error);
            
            throw new Error("No Ethereum object detected");
        }
    }

    const getWalletAddress = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected Address", userAddress);
        //return userAddress;
        setConnectedAccount(userAddress);
    }

    const getContractOwnerAddress = async() => {
        try{
            const milkDeliveryConract = getMilkDeliveryContract();
            const owner = await milkDeliveryConract.owner();
            console.log("Owner Address", owner);
            setContractOwner(owner);
        }catch(error){
            console.error(error);
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
    
    const listVendor = async () => {
        const { name, email, address, factory, isApproved } = vendorFormData;

        try{
            if (!ethereum) return alert("Please Install Metamask");

            const milkDeliveryContract = getMilkDeliveryContract();
            if(!ethers.utils.isAddress(address)) return swal("Invalid Ethereum Address");
            const tx = await milkDeliveryContract.listNewVendor(address, factory, name, email);
            
            if (isApproved === "yes"){
                approveVendor(address);
            }

            setIsLoading(true);
            console.log('Loading ....');
            console.log(tx.hash);

            await tx.wait();

            console.log('Sucesss ....');
            console.log(tx.hash);
            setIsLoading(false);
            swal("New Vendor Added Successfully");

        }catch(error){
            console.error(error);
            swal(error.message);
            throw new Error("No Ethereum object detected");
        }
    }

    const approveVendor = async() => {
        const { address } = vendorFormAddress;
        try{
            if(!ethereum) return alert("Please Install Metamask");
            const milkDeliveryConract = getMilkDeliveryContract();
            if(!ethers.utils.isAddress(address)) return swal("Invalid Ethereum Address");
            const tx = await milkDeliveryConract.approveVendor(address);
            setIsLoading(true);

            await tx.wait();

            setIsLoading(false);
            swal("Vendor Approved Successfully");
        }catch(error){
            swal(error.message);
            console.log(error);
        }
    }

    const detectAccountChange = async() => {
        ethereum.on('accountsChanged', async(accounts) => {
            await setConnectedAccount(accounts[0]);
            await getWalletAddress();
        })
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        detectAccountChange();
    },[]);

    return (
        <MilkDeliveryContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, 
            handleChange, addNewDelivery, isLoading, milkDeliveryItems, vendorFormData, 
            listVendor, contractOwner, vendorFormAddress, approveVendor }}>
            { children }
        </MilkDeliveryContext.Provider>
    );
}
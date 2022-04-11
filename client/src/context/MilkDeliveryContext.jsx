import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import swal from 'sweetalert';

import { LocalContractABI, LocalContractAddress, RinkebyContractAddress, RinkebyContractABI} from '../utils/constants';

export const MilkDeliveryContext = React.createContext();

const { ethereum } = window;
const rinkebyNetworkId = 4;

export const MilkDeliveryProvider = ({ children }) => {
    const [ connectedAccount, setConnectedAccount ] = useState('');
    const [ formData, setFormData ] = useState({ quantity: '',quality: ''});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isFormLoading, setIsFormLoading] = useState(false);
    const [ milkDeliveryItems, setMilkDeliveryItems ] = useState([]);
    const [ vendorFormData, setVendorFormData] = useState({ name: '', email: '', factory: ' ', address: ' ', isApproved:''});
    const [ contractOwner, setContractOwner ] = useState('');
    const [ vendorFormAddress, setVendorFormAddress ] = useState({ address:''});
    const [ networkId, setNetworkId ] = useState();
    const [ milkQualityTypes, setMilkQualityTypes ] = useState([]);
    const [ isConnectedToRinkeby, setIsConnectedToRinkeby] = useState(false);
    const [ vendorData, setVendorData ] = useState([]);
    const [ farmerData, setFarmerData ] = useState([]);

    const getMilkDeliveryContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const milkDeliveryConract = new ethers.Contract(RinkebyContractAddress, RinkebyContractABI, signer);
        return milkDeliveryConract;
        /*
        if (networkId === rinkebyNetworkId) {
            milkDeliveryConract = new ethers.Contract(RinkebyContractAddress, RinkebyContractABI, signer);
        }else {
            milkDeliveryConract = new ethers.Contract(LocalContractAddress, LocalContractABI, signer);
        }
        return milkDeliveryConract;
        */
    }

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
                detectChangeInNetwork();
                getMilkDeliveryItems();
                getWalletAddress(); 
                listAllVendors();
                listAllFarmers();           
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
            detectChangeInNetwork();
            getMilkDeliveryItems();
            listAllVendors();
            listAllFarmers();
        }catch(error){
            console.error(error);
            
            throw new Error("No Ethereum object detected");
        }
    }

    const getWalletAddress = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        //return userAddress;
        setConnectedAccount(userAddress);
    }

    const getContractOwnerAddress = async() => {
        try{
            const milkDeliveryConract = getMilkDeliveryContract();
            const owner = await milkDeliveryConract.owner();
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
            setFormData({
                quality:'',
                quantity:''
            });
            getMilkDeliveryItems();
            listAllVendors();
            listAllFarmers();
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
            const validAddress = ethers.utils.getAddress(address);
            if (!ethers.utils.isAddress(validAddress)) return swal("Invalid Ethereum Address, Please enter a valid address");
            const tx = await milkDeliveryContract.listNewVendor(validAddress, factory, name, email);
            
            // if (isApproved === "yes"){
                
            // }

            setIsFormLoading(true);
            console.log('Loading ....');
            console.log(tx.hash);

            await tx.wait();

            console.log('Sucesss ....');
            console.log(tx.hash);
            setIsFormLoading(false);
            approveVendor(address);
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
            const validVendorAddress = ethers.utils.getAddress(address);
            if (!ethers.utils.isAddress(validVendorAddress)) return swal("Invalid Ethereum Address, Please enter a valid address");
            const tx = await milkDeliveryConract.approveVendor(validVendorAddress);
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

    const detectChangeInNetwork = async() => {
        ethereum.on('networkChanged', async(networkId) => {
            setNetworkId(networkId);
        });
    }

    const getMilkQualityTypes = async() => {
        try{
            if(!ethereum) return alert("Please Install Metamask");

            const milkDeliveryContract = getMilkDeliveryContract();
            const tx = await milkDeliveryContract.milkQualityType().then(( data ) => {
                console.log("Milk Quality Types",data);
                setMilkQualityTypes(data);
            }).catch(( error) => console.error(error));
        }catch(error){
            console.error(error);
        }
    }

    const listAllVendors = async() => {
        try{
            if(!ethereum) return alert("Please Install Metamask");
            const milkDeliveryContract = getMilkDeliveryContract();
            const data = await milkDeliveryContract.vendorList();
            const structuredVendorItems = data.map((item, index) => ({
                id: item.id.toNumber(),
                factory: item.milkFactory,
                name: item.name,
                email: item.email,
                date: new Date(item.createdAt.toNumber() * 1000).toLocaleString()
            }));
            console.log("Vemdor Data: ", structuredVendorItems);
            setVendorData(structuredVendorItems);

        }catch(error){
            console.log(error);
        }
    }

    const listAllFarmers = async() => {
        try{
            if (!ethereum) return alert("Please Install Metamask");
            const milkDeliveryContract = getMilkDeliveryContract();
            const data = await milkDeliveryContract.listAllFarmers();
            const structuredFarmerData = data.map((item, index) => ({
                id: item.id.toNumber(),
                fisrt_name: item.factory,
                last_name: item.name,
                email: item.email,
                phoneNumber: item.phoneNumber,
                idNumber: item.idNumber.toNumber(),
                location: item.location,
                walletAddress: item.farmerAddress,
                createdAt: new Date(item.createdAt.toNumber() * 1000).toLocaleString()
            }));
            console.log("Farmer Data: ", structuredFarmerData);
            setFarmerData(structuredFarmerData);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getMilkQualityTypes();
        detectAccountChange();
        detectChangeInNetwork();
    },[]);

    return (
        <MilkDeliveryContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, addNewDelivery, isLoading, milkDeliveryItems, vendorFormData, 
            listVendor, contractOwner, vendorFormAddress, approveVendor, networkId, milkQualityTypes, isFormLoading, isConnectedToRinkeby, vendorData, farmerData }}>
            { children }
        </MilkDeliveryContext.Provider>
    );
}
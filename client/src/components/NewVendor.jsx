import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';
import { Container, Row, Form, Spinner, Button } from 'react-bootstrap';
//import Input from './Input';

const NewVendor = () => {
    const { connectedAccount, vendorFormData, listVendor, handleChange, contractOwner, isFormLoading } = useContext(MilkDeliveryContext);
    const { name, email, address, factory, isApproved } = vendorFormData;

    const Input = ({ placeholder, type, name, value, handleChange }) => {
        return (
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={(e) => handleChange(e, name)}
                className="form-control justify-content-center"
                value={value}
                step={"0.001"}
            ></input>
        );
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log({
            name,
            email,
            address,
            factory,
            isApproved
        });

        if (!name || !email || !address || !factory) return;
        await listVendor();
    }

    return(
        <div className="">
            {connectedAccount && connectedAccount == contractOwner && 
                    <div className="card mb-2">
                        <div className="card-header">
                            <div className="card-title"><h6>Add New Vendor</h6></div>
                        </div>
                        <div className="card-body">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                {/* <Form.Control type="text" name="name" placeholder="Enter vendor Name" handleChange={handleChange}/> */}
                                <Input name="name" placeholder="Enter Vendor Name" type="text" handleChange={handleChange} value={name}></Input>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Email</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                <Input name="email" placeholder="Enter Vendor Email" type="email" handleChange={handleChange} value={email}></Input>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Ethereum Address</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                <Input name="address" placeholder="Enter Vendor Walllet Address" type="text" handleChange={handleChange} value={address}></Input>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Milk Factory Name</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                        <Input name="factory" placeholder="Enter Vendor Milk Factory" type="text" handleChange={handleChange} value={factory}></Input>

                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label style={{ color:"red"}}>Do You Want To Approve this Vendor for Milk Vending?</Form.Label><br></br>
                                        <Form.Control type="text" name="quality" placeholder="Select Quality"/>
                                        <input name="isApproved" type="radio" handleChange={handleChange} value="yes"></input> Yes <br></br>
                                        <input name="isApproved" type="radio" handleChange={handleChange} value="no"></input> No
                                    </Form.Group> */}

                            {isFormLoading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <div>
                                            <Button variant="success" type="submit" className="mb-3">
                                                List New Vendor
                                            </Button>
                                        </div>
                                    )

                                    }
                                </Form>
                        </div>
                    </div>
                }
        </div>
    );
}

export default NewVendor;
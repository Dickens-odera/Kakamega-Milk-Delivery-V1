import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';
import { Container, Row, Form, Spinner, Button } from 'react-bootstrap';
//import Input from './Input';

const NewVendor = () => {
    const { connectedAccount, vendorFormData, listVendor, handleChange, contractOwner, isLoading } = useContext(MilkDeliveryContext);

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
        const { name, email, address, factory } = vendorFormData;
        console.log({
            name,
            email,
            address,
            factory
        });

        if(!name || !email || !address || !factory) return;
        await listVendor();
    }

    return(
        <div className="">
            {connectedAccount == contractOwner && 
                    <div className="card mb-2">
                        <div className="card-header">
                            <div className="card-title"><h6>Add New Vendor</h6></div>
                        </div>
                        <div className="card-body">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                {/* <Form.Control type="text" name="name" placeholder="Enter vendor Name" handleChange={handleChange}/> */}
                                        <Input name="name" placeholder="Enter Vendor Name" type="text" handleChange={handleChange} ></Input>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Email</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                        <Input name="email" placeholder="Enter Vendor Email" type="email" handleChange={handleChange}></Input>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Ethereum Address</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                        <Input name="address" placeholder="Enter Vendor Walllet Address" type="text" handleChange={handleChange}></Input>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Milk Fatcory Name</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                        <Input name="factory" placeholder="Enter Vendor Milk Factory" type="text" handleChange={handleChange}></Input>

                                    </Form.Group>

                                    {isLoading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <div>
                                            <Button variant="primary" type="submit" className="mb-3">
                                                Add Vendor
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
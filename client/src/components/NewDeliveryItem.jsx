import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';
import NewVendor from './NewVendor';
//import Input from './Input';

const NewDeliveryItem = () => {
    const { handleChange, formData, addNewDelivery, isLoading, connectedAccount } = useContext(MilkDeliveryContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { quantity, quality } = formData;

        if (!quantity || !quality) return;
        console.log(quantity);
        addNewDelivery();
    }

    const Input = ({ placeholder, name, type, value, handleChange }) => {
        return(
            <input
                placeholder={placeholder}
                name={name}
                type={type}
                value={value}
                onChange={(e) => handleChange(e, name)}
                className="form-control"
                step={"0.001"}
            ></input>
        );
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <div classame="mb-2">
                    {connectedAccount &&
                        <div className="card mb-3">
                            <div className="card-header">
                                <div className="card-title"><h6>Record New Milk Delivery Record</h6></div>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Quantity</Form.Label>
                                        {/* <Form.Control type="number" name="quantity" placeholder="Enter Milk Quantity"/> */}
                                        <Input name="quantity" placeholder="Enter Quantity" type="number" handleChange={handleChange}></Input>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Quality</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                        <Input name="quality" placeholder="Enter Quality" type="number" handleChange={handleChange}></Input>

                                    </Form.Group>

                                    {isLoading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <div>
                                            <Button variant="primary" type="submit" className="mb-3">
                                                Submit Record
                                            </Button>
                                        </div>
                                    )

                                    }
                                </Form>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="col-md-6">
                <NewVendor />
            </div>
        </div>
    );
}

export default NewDeliveryItem;
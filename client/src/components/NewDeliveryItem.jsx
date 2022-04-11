import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';
import NewVendor from './NewVendor';
//import Input from './Input';

const NewDeliveryItem = () => {
    const { handleChange, formData, addNewDelivery, isLoading, connectedAccount } = useContext(MilkDeliveryContext);
    const { quantity, quality,farmerId } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!quantity || !quality || !farmerId) return;
        if (quality > 3) return swal("Invalid Quality Type: Please Chose either:0-GOOD, 1-STALE, 2- PERFECT, 3-BAD");
        console.log(formData);
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
                min="0"
            ></input>
        );
    }

    return (
        <div className="row" style={
            {
                width: '100%',
            }
        }>
            <div className="col-md-6">
                <div classame="mb-2">
                    {connectedAccount &&
                        <div className="card mb-3">
                            <div className="card-header">
                                <div className="card-title"><h6>Record New Milk Delivery Record</h6></div>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={handleSubmit} >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Farmer ID</Form.Label>
                                        {/* <Form.Control type="number" name="quantity" placeholder="Enter Milk Quantity"/> */}
                                        <Input name="farmerId" placeholder="Farmer ID" type="number" handleChange={handleChange} value={farmerId}></Input>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Quantity</Form.Label>
                                        {/* <Form.Control type="number" name="quantity" placeholder="Enter Milk Quantity"/> */}
                                        <Input name="quantity" placeholder="Enter Quantity" type="number" handleChange={handleChange} value={quantity}></Input>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Quality</Form.Label>
                                        {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                                        <Input name="quality" placeholder="Enter Quality" type="number" handleChange={handleChange} value={quality}></Input>

                                    </Form.Group>

                                    {isLoading ? (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <div>
                                            <Button  variant="primary" type="submit" className="mb-3" style={{
                                                backgroundColor: "#0c7631",
                                            }}>
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
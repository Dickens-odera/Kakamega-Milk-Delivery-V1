import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';

const NewDeliveryItem = () => {
    const { handleChange, formData, addNewDelivery, isLoading } = useContext(MilkDeliveryContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { quantity, quality } = formData;

        // if (!quantity || !quality) return;
        console.log(quantity);
        addNewDelivery();
    }

    const Input = ({ placeholder, type, name, value }) => {
        return(
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={(e) => handleChange(e, name)}
                className="form-control mb-2 justify-content-center"
                value={value}
                step={"0.001"}
            ></input>
        );
    }
    return (
        <div classame="mb-3">
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
    );
}

export default NewDeliveryItem;
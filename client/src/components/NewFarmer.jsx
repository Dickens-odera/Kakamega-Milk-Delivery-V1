import React, { useState, useEffect, useContext } from "react";
import { MilkDeliveryContext } from "../context/MilkDeliveryContext";
import { Container, Row, Form, Spinner, Button } from "react-bootstrap";
//import Input from './Input';

const NewFarmer = () => {
  const {
    connectedAccount,
    vendorFormData,
    listVendor,
    handleChange,
    contractOwner,
    isFormLoading,
  } = useContext(MilkDeliveryContext);
  const {
    firstName,
    lastName,
    location,
    phoneNumber,
    deliveryNumber,
    email,
    farmerAddress,
  } = vendorFormData;

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      location,
      phoneNumber,
      deliveryNumber,
      email,
      farmerAddress,
    });

    if (
      !firstName ||
      !lastName ||
      !location ||
      !phoneNumber ||
      !deliveryNumber ||
      !email ||
      !farmerAddress
    )
      return;
    await listVendor();
  };

  return (
    <div className="">
      {connectedAccount && (
        <div className="card mb-2">
          <div className="card-header">
            <div className="card-title">
              <h6>Add New Farmer</h6>
            </div>
          </div>
          <div className="card-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                {/* <Form.Control type="text" name="name" placeholder="Enter vendor Name" handleChange={handleChange}/> */}
                <Input
                  name="firstName"
                  placeholder="Enter First Name"
                  type="text"
                  handleChange={handleChange}
                  value={firstName}
                ></Input>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>LastName</Form.Label>
                {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                <Input
                  name="email"
                  placeholder="Enter Last Name"
                  type="text"
                  handleChange={handleChange}
                  value={lastName}
                ></Input>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Farmer Address</Form.Label>
                {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                <Input
                  name="farmerAddress"
                  placeholder="Farmer Address"
                  type="text"
                  handleChange={handleChange}
                  value={farmerAddress}
                ></Input>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Location</Form.Label>
                {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                <Input
                  name="location"
                  placeholder="Enter Location"
                  type="text"
                  handleChange={handleChange}
                  value={location}
                ></Input>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Phone Number</Form.Label>
                {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                <Input
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  type="text"
                  handleChange={handleChange}
                  value={phoneNumber}
                ></Input>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                <Input
                  name="email"
                  placeholder="Enter Email"
                  type="text"
                  handleChange={handleChange}
                  value={email}
                ></Input>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Delivery Number</Form.Label>
                {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                <Input
                  name="deliveryNumber"
                  placeholder="Enter Delivery Number"
                  type="text"
                  handleChange={handleChange}
                  value={deliveryNumber}
                ></Input>
              </Form.Group>
              {isFormLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <div>
                  <Button variant="success" type="submit" className="mb-3">
                    List New Farmer
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewFarmer;

import React, { useState, useEffect, useContext } from "react";
import { MilkDeliveryContext } from "../context/MilkDeliveryContext";
import { Container, Row, Form, Spinner, Button } from "react-bootstrap";
//import Input from './Input';
import styled from "styled-components";

const NewFarmer = () => {
  const {
    connectedAccount,
    farmerFormData,
    listVendor,
    handleChange,
    contractOwner,
    addNewFarmer,
    isFormLoading,
  } = useContext(MilkDeliveryContext);
  const {
    first_name,
    last_name,
    location,
    phone_number,
    id_number,
    email,
    address,
  } = farmerFormData;

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
      first_name,
      last_name,
      location,
      phone_number,
      id_number,
      email,
      address,
    });

    if (
      !first_name ||
      !last_name ||
      !location ||
      !phone_number ||
      !id_number ||
      !email ||
      !address
    )
      return;
    await addNewFarmer();
  };

  return (
    <Section>
      <div className="grid">
        <div className="">
          {connectedAccount && (
            <div
              className="card mb-2"
              style={{
                width: "60%",
                // margin: "0 auto",
                // paddingTop: "10px",
                // marginTop: "10px",
              }}
            >
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
                      name="first_name"
                      placeholder="Enter First Name"
                      type="text"
                      handleChange={handleChange}
                      value={first_name}
                    ></Input>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Last Name</Form.Label>
                    {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                    <Input
                      name="last_name"
                      placeholder="Enter Last Name"
                      type="text"
                      handleChange={handleChange}
                      value={last_name}
                    ></Input>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Farmer Address</Form.Label>
                    {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                    <Input
                      name="address"
                      placeholder="Farmer Address"
                      type="text"
                      handleChange={handleChange}
                      value={address}
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
                      name="phone_number"
                      placeholder="Enter Phone Number"
                      type="text"
                      handleChange={handleChange}
                      value={phone_number}
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
                    <Form.Label>ID Number</Form.Label>
                    {/* <Form.Control type="text" name="quality" placeholder="Select Quality"/> */}
                    <Input
                      name="id_number"
                      placeholder="Enter Delivery Number"
                      type="text"
                      handleChange={handleChange}
                      value={id_number}
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
      </div>
    </Section>
  );
};

export default NewFarmer;

const Section = styled.section`
  margin-left: 12vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .custom-card {
      width: 1000px !important;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

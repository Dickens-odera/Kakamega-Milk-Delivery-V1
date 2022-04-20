import React, { useState, useEffect, useContext } from "react";
import {Section} from './CommonStyle'
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { MilkDeliveryContext } from "../../context/MilkDeliveryContext";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
// import axios from "axios";

const MilkDelivered = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleShow = () => setShow(true);

  const url = "http://localhost:8080/delivery/add";

  const [delivery, setDelivery] = useState({
    member_id: "",
    milk_quantity: "",
    milk_quality: "",
    collectors_id: "",
  });

  const handleChange = (e) => {
    const newDelivery = { ...delivery };
    newDelivery[e.target.id] = e.target.value;
    setDelivery(newDelivery);
    console.log(newDelivery);
  };

  //   function to fetch all farmsers in db
  async function fetchData() {
    const result = await axios.get("http://localhost:8080/delivery/all");
    console.log(result.data);
    setDelivery(result.data);
  }

  // get farmer phoneNumber,milk quality and milk quantity after being saved to db then send SMS
  async function sendSMS(phoneNumber, milkQuality, milkQuantity) {
    const result = await axios
      .post("http://localhost:3005/", {
        to: [phoneNumber],
        message: `Your milk delivery of ${milkQuantity} litres of ${milkQuality} quality has been recorded. Thank you for using KADAFI.`,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(result);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // // get farmer phoneNumber by getting his details from the db
  async function getFarmerPhoneNumber(id) {
    const result = await axios.get(`http://localhost:8080/farmer/member/${id}`);
    console.log(result.data);
    return result.data.phoneNumber;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(url, delivery);
    console.log(result);
    handleClose();
    fetchData();

    //get phone number
    const phoneNumber = await getFarmerPhoneNumber(delivery.member_id);
    const milkQuality = delivery.milk_quality;
    const milkQuantity = delivery.milk_quantity;
    //send SMS
    sendSMS(phoneNumber, milkQuality, milkQuantity);

    //reload the page to update the table
    history.push("/newdelivery");
  };

  return (
    <>
      <Section>
        <div className="grid">
          <div className="">
            <div className="row d-flex justify-content-between">
              <div className="col-6">
                <h3>Deliveries</h3>
              </div>
              <div>
                <Button
                  variant="primary"
                  style={{
                    marginBottom: "1rem",
                    backgroundColor: "#0C7631",
                  }}
                  onClick={handleShow}
                >
                  New Delivery
                </Button>

                <br />

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>New Delivery</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        <form
                          style={{
                            width: "100%",
                            margin: "0 auto",
                            marginTop: "2rem",
                          }}
                          onSubmit={(e) => handleSubmit(e)}
                        >
                          <div className="form-row">
                            <div class="form-group">
                              <label for="fName">Member ID</label>
                              <input
                                type="text"
                                class="form-control"
                                id="member_id"
                                name="member_id"
                                aria-describedby="emailHelp"
                                placeholder="Member ID"
                                required
                                onChange={(e) => handleChange(e)}
                                value={delivery.member_id}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Milk Quantity
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="milk_quantity"
                                name="milk_quantity"
                                placeholder="Milk Quantity"
                                required
                                onChange={(e) => handleChange(e)}
                                value={delivery.milk_quantity}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div class="form-group">
                              <label for="fName">Milk Quality</label>
                              <input
                                type="number"
                                class="form-control"
                                id="milk_quality"
                                name="milk_quality"
                                aria-describedby="emailHelp"
                                placeholder="Milk Quality"
                                required
                                onChange={(e) => handleChange(e)}
                                value={delivery.milk_quality}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Collectors ID
                              </label>
                              <input
                                type="number"
                                class="form-control"
                                id="collectors_id"
                                name="collectors_id"
                                placeholder="Collectors ID"
                                required
                                onChange={(e) => handleChange(e)}
                                value={delivery.collectors_id}
                              />
                            </div>
                          </div>
                          <br />
                          <br />
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          {/* space */}
                          &nbsp; &nbsp;
                          <Button variant="primary" onClick={handleSubmit}>
                            Add
                          </Button>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card custom-card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <h5 className="card-title">
                          <span className="text-primary">
                            {/* <FaAddressCard size={50} /> */}
                          </span>
                          <span
                            className="text-dark"
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Farmers
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>Member ID</th>
                              <th>Quality</th>
                              <th>Quantity</th>
                              <th>Collector ID</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {delivery.length > 0 ? (
                              delivery.map((delivery) => (
                                <tr key={delivery.delivery_id}>
                                  <td>{delivery.member_id}</td>
                                  <td>{delivery.milk_quality}</td>
                                  <td>{delivery.milk_quantity}</td>
                                  <td>{delivery.collectors_id}</td>
                                  <td>{delivery.dateOfDelivery}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={5}>No data</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default MilkDelivered;

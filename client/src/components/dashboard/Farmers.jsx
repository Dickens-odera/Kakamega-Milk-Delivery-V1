import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaAddressCard } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
// import axios from "axios";

const Farmers = () => {
  const [show, setShow] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const url = "http://localhost:8080/farmer/add";
  const [userData, setUserDaata] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    location: "",
    phoneNumber: "",
    member_id: "",
  });

  const handleChange = (e) => {
    const newUserData = { ...userData };
    newUserData[e.target.id] = e.target.value;
    setUserDaata(newUserData);
    console.log(newUserData);
  };

  //function to fetch all farmsers in db
  // async function fetchData() {
  //   // const result = await axios.get("http://localhost:8080/farmer/all");
  //   setFarmers(result.data);
  // }

  useEffect(() => {
    // fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios
    //   .post(url, userData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // setShow(false);
  };

  return (
    <>
      <Section>
        <div className="grid">
          <div className="">
            <div className="row d-flex justify-content-between">
              <div className="col-6">
                <h3>Farmers</h3>
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
                  Add Farmer
                </Button>

                <br />

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Register Farmer</Modal.Title>
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
                              <label for="fName">First Name</label>
                              <input
                                type="text"
                                class="form-control"
                                id="firstName"
                                name="firstName"
                                aria-describedby="emailHelp"
                                placeholder="First Name"
                                required
                                onChange={(e) => handleChange(e)}
                                value={userData.firstName}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                required
                                onChange={(e) => handleChange(e)}
                                value={userData.lastName}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div class="form-group">
                              <label for="fName">ID Number</label>
                              <input
                                type="text"
                                class="form-control"
                                id="idNumber"
                                name="idNumber"
                                aria-describedby="emailHelp"
                                placeholder="ID Number"
                                required
                                onChange={(e) => handleChange(e)}
                                value={userData.idNumber}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Location
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="location"
                                name="location"
                                placeholder="Location"
                                required
                                onChange={(e) => handleChange(e)}
                                value={userData.location}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label for="fName">Phone Number</label>
                              <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                aria-describedby="emailHelp"
                                placeholder="Phone Number"
                                required
                                onChange={(e) => handleChange(e)}
                                value={userData.phoneNumber}
                              />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputPassword1">
                                Member ID
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="member_id"
                                name="member_id"
                                placeholder="Member ID"
                                onChange={(e) => handleChange(e)}
                                value={userData.member_id}
                                // value={lName}
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
                              <th>First Name</th>
                              <th>LastName</th>
                              <th>ID Number</th>
                              <th>Location</th>
                              <th>Phone Number</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* loop through the farmer data and display in a table */}
                            {farmers.map((farmer) => (
                              <tr key={farmer.id}>
                                <td>{farmer.firstName}</td>
                                <td>{farmer.lastName}</td>
                                <td>{farmer.idNumber}</td>
                                <td>{farmer.location}</td>
                                <td>{farmer.phoneNumber}</td>
                              </tr>
                            ))}
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

export default Farmers;

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

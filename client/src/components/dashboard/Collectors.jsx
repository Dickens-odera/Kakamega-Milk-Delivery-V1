import React, { useContext } from "react";
import styled from "styled-components";
import { FaAddressCard } from "react-icons/fa";
import {Link } from 'react-router-dom';
import { MilkDeliveryContext } from "../../context/MilkDeliveryContext";

const Collectors = () => {
  const { vendorData } = useContext(MilkDeliveryContext);
  console.log(vendorData);
  return (
    <>
      <Section>
        <div className="grid">
          <div className="">
            <div className="row d-flex justify-content-between">
              <div className="col-6">
                <h3>Collectors</h3>

                {/* <button
                  className="btn btn-primary"
                  style={{
                    marginBottom: "1rem",
                    backgroundColor: "#0C7631",
                  }}
                >
                  Add Collector
                </button> */}
                <br />
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
                            Collectors
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Factory</th>
                              <th>EMail</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* map through the venders and display data on table */}
                            {vendorData.map((vendor, index) => {
                              return (
                                <tr key={index}>
                                  <td>{vendor.id}</td>
                                  <td>{vendor.name}</td>
                                  <td>{vendor.factory}</td>
                                  <td>{vendor.email}</td>
                                  <td>{vendor.date}</td>
                                </tr>
                              );
                            })}
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

export default Collectors;

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

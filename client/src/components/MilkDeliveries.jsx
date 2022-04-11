import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';

const MilkDeliveries = () => {
    const { milkDeliveryItems, connectedAccount } = useContext(MilkDeliveryContext);
    const deliveryItems = milkDeliveryItems.sort(( a, b) => {
        return b.id - a.id;
    });
    return(
        <div className="row">
        {/* display the data in a table */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <h6>Milk Delivery Items</h6>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vendor</th>
                    <th>Quantity</th>
                    <th>Quality</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {connectedAccount &&
                    deliveryItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.vendor}</td>
                          <td>{item.quantity}</td>
                          <td>
                            {item.quality === 0 && "GOOD"}
                            {item.quality === 1 && "STALE"}
                            {item.quality === 2 && "PERFECT"}
                            {item.quality === 3 && "BAD"}
                          </td>
                          <td>{item.date}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MilkDeliveries;
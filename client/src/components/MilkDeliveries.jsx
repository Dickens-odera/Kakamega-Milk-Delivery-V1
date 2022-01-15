import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';

const MilkDeliveries = () => {
    const { milkDeliveryItems, connectedtAccount } = useContext(MilkDeliveryContext);
    return(
        <div className="row">
            {connectedtAccount && 
                milkDeliveryItems.reverse().map((item, index) => (
                    <div key={item.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Delivery Item: {item.id}</div>
                            </div>
                            <div className="card-body">
                                <p>Vendor: {item.vendor}</p>
                                <p>Quality: {item.quality}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    </div>
                )) 
            }
        </div>
    );
}

export default MilkDeliveries;
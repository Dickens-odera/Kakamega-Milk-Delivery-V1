import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';

const MilkDeliveries = () => {
    const { milkDeliveryItems, connectedAccount } = useContext(MilkDeliveryContext);
    const deliveryItems = milkDeliveryItems.sort(( a, b) => {
        return b.id - a.id;
    });
    return(
        <div className="row">
            {connectedAccount && 
                deliveryItems.map((item, index) => (
                    <div key={item.id} className="col-md-3 mb-2">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Delivery Item: {item.id}</div>
                            </div>
                            <div className="card-body">
                                <p>Date: {item.date}</p>
                                <p>Vendor: {item.vendor}</p>
                                <p>Quality: {
                                    item.quality === 0 && "GOOD"
                                }
                                {
                                    item.quality === 1 && "STALE"
                                }
                                {
                                    item.quality === 2 && "PERFECT"
                                } 
                                {
                                    item.quality === 3 && "BAD"
                                
                                }
                                </p>
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
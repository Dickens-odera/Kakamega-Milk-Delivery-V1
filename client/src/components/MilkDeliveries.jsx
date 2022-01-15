import React, { useState, useEffect, useContext } from 'react';
import { MilkDeliveryContext } from '../context/MilkDeliveryContext';

const MilkDeliveries = () => {
    const { milkDeliveryItems, connectedtAccount } = useContext(MilkDeliveryContext);
    return(
        <div>
            {connectedtAccount && 
                milkDeliveryItems.reverse().map((item, index) => (
                    <div key={index}> {item.vendor}</div>
                )) 
            }
        </div>
    );
}

export default MilkDeliveries;
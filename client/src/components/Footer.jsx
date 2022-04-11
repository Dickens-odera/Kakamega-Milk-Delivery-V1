import React, { useState, useEffect } from 'react';


const Footer = () => {
    return (
        <div className="container my-5">
                <div className="text-center text-dark p-3" style={{ "background-color": "#0C7631" }}>
                    <p style={{
                        color: "white",
                    }}>© 2022 Copyright:</p>
                {/* <a className="text-dark" href="https://github.com/Dickens-odera/Kakamega-Milk-Delivery-V1" target="_blank">Give a star on Github</a><br></br>
                <a className="text-dark" href="https://rinkeby.etherscan.io/address/0x55431c6282be3260041a98dE94203Eb60EccaF57" target="_blank">View On Etherscan</a> */}
                </div>
        </div>
    );
}

export default Footer;

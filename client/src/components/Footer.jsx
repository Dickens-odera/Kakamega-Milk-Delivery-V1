import React, { useState, useEffect } from 'react';


const Footer = () => {
    return (
        <div className="container my-5">
                <div className="text-center text-dark p-3" style={{ "background-color": "rgba(0, 0, 0, 0.2)" }}>
                    <p>© 2022 Copyright:</p>
                <a className="text-dark" href="https://github.com/Dickens-odera/Kakamega-Milk-Delivery-V1">Give a star on Github</a>
                </div>
                <div className="container pt-4">
                    <div className="mb-4">
                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><i className="fab fa-github"></i
                        ></a>
                    </div>
                </div>
        </div>
    );
}

export default Footer;

import React from "react";

const Logout = () => {
  return (
    <>
      <div className="container">
        <div className="text-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ukulimasoko-32a56.appspot.com/o/Quitting%20a%20job-rafiki%20(1).png?alt=media&token=6546065f-c858-4abc-8533-9c28c6bc48d1"
            alt="logo"
            style={
                {
                    width: "400px",
                    // margin: "0 auto !important",
                    height: "400px",
                }
            }
          />
          <h1
            style={{
              padding: "1rem",
            }}
          >
            Successfully Logged Out of the System
          </h1>
        </div>
      </div>
    </>
  );
};

export default Logout;

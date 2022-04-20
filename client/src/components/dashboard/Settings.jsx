import React from "react";
import { Section } from "./CommonStyle";
// import settingsGif from "../../../assets/images/settings.gif";

const Settings = () => {
  return (
    <>
      <Section>
        <div className="grid">
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            Settings
          </h1>
          <div className="row">
            <div className="col-12">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ukulimasoko-32a56.appspot.com/o/settings.gif?alt=media&token=bad3b834-2277-4f23-8424-3669f73d5acc"
                alt="settings"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto !important",
                  marginLeft: "180px",
                }}
              />
            </div>
          </div>
          <div className="row">
            <h3
              style={{
                marginLeft: "260px",
                fontWeight: "bold",
              }}
            >
              Under Development !!!
            </h3>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Settings;

import React from "react";
import styled from "styled-components";
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

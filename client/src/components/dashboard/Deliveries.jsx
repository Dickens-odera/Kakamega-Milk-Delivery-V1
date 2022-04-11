import React from "react";
import MilkDeliveries from "../MilkDeliveries";
import styled from "styled-components";

const Deliveries = () => {
  return (
    <>
      <Section>
      {/* <div className="grid"> */}
          <MilkDeliveries />
        {/* </div> */}
      </Section>
    </>
  );
};

export default Deliveries;

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

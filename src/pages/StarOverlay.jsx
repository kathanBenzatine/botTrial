import React from "react";

import SparklingStar from "./SparklingStar";
import TinyStarIcon from "../../assets/TinyStarIcon.jsx";
import TelegramStarIcon from "../../assets/TelegramStarIcon.jsx";
const StarOverlay = () => {
  return (
    <div className="d-flex justify-content-center align-items-center premium-user-stepper">
      <SparklingStar
        leftz={"-20"}
        id={1}
        const
        starPositions={[
          { top: 70, left: -1 },
          { top: 50, left: -27 },
          { top: 19, left: 16 },
        ]}
      />
      <div className="tele-parent" style={{ zIndex: "9999" }}>
        <TelegramStarIcon />
        <TinyStarIcon position={{ left: 25, top: 31, size: "4" }} />
        <TinyStarIcon position={{ left: 18, top: 26 }} fill={"#ffffff3d"} />
        <TinyStarIcon position={{ left: 56, top: 26, size: "4" }} />
        <TinyStarIcon position={{ left: 61, top: 33 }} fill={"#ffffff3d"} />
        <TinyStarIcon position={{ left: 68, top: 30 }} fill={"#ffffff3d"} />
        {/*  */}
        <TinyStarIcon position={{ left: 67, top: 57 }} fill={"#ffffff3d"} />
        <TinyStarIcon position={{ left: 73, top: 63, size: "4" }} />
        <TinyStarIcon position={{ left: 17, top: 52, size: "4" }} />
        <TinyStarIcon position={{ left: 29, top: 55 }} fill={"#ffffff3d"} />
        <TinyStarIcon position={{ left: 22, top: 61 }} fill={"#ffffff3d"} />
      </div>
      <SparklingStar
        leftz={"50"}
        id={2}
        starPositions={[
          { top: 70, left: 20 },
          { top: 50, left: 10 },
          { top: 20, left: 50 },
        ]}
      />
    </div>
  );
};

export default StarOverlay;

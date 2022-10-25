import React from "react";
import Card from "../card/Card";
import "../dashboard/dashboard.css";
import spaceXLogo from "../../assets/spaceXLogo-removebg-preview.png";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="brand-feature">
        <img src={spaceXLogo} alt="SpaceX-logo" />
        {/* <h1>LAUNCHES</h1> */}
        <Link to="/launch" element={<Card />}>
          Click Here to view Launches
        </Link>
      </div>
    </>
  );
}

import React from "react";
import "../launch/launch.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Launch() {
  const navigate = useNavigate();
  const [rocketDetails, setrocketDetails] = useState({});
  useEffect(() => {
    const url = "https://api.spacexdata.com/v3/rockets/falcon1";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        setrocketDetails(jsonResponse);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  console.log(rocketDetails);
  return (
    <>
      <div className="rocket-landing">
        {
          <table class="table table-striped container">
            <thead>
              <tr>
                <th scope="col" colSpan={2}>
                  Rocket Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{rocketDetails.rocket_name}</td>
              </tr>
              <tr>
                <th scope="row">Success Rate</th>
                <td>{rocketDetails.success_rate_pct}</td>
              </tr>
              <tr>
                <th scope="row">Wikipedia Link</th>
                <td> {rocketDetails.wikipedia}</td>
              </tr>
              <tr>
                <th scope="row">Rocket Name</th>
                <td>{rocketDetails.rocket_name}</td>
              </tr>
              <tr>
                <th scope="row">Company Name</th>
                <td>{rocketDetails.company}</td>
              </tr>
              <tr>
                <th scope="row">Country</th>
                <td>{rocketDetails.country}</td>
              </tr>
            </tbody>
          </table>
        }

        <div className="footer">
          <button
            className="btn btn-large btn-secondary"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import "../card/card.css";
import { Link, useNavigate } from "react-router-dom";
import Launch from "../launch/Launch";
import InfiniteScroll from "react-infinite-scroll-component";
import loadingGif from "../../assets/loader.gif";

export default function Card() {
  const navigate = useNavigate();
  const [LaunchCard, setLaunchCard] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [offset, setOffset] = useState(3);

  useEffect(() => {
    const url = "https://api.spacexdata.com/v3/launches?limit=3";
    const fetchLaunchData = async () => {
      try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        setLaunchCard(jsonResponse);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchLaunchData();
  }, []);

  const fetchMoreLaunchData = async () => {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?limit=3&offset=${offset}`
      );
      const newJsonResponse = await response.json();
      return newJsonResponse;
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchData = async () => {
    const moreLaunches = await fetchMoreLaunchData();
    setLaunchCard([...LaunchCard, ...moreLaunches]);
    if (moreLaunches.length === 0 || moreLaunches.length < 3) setnoMore(false);
    setOffset(offset + 3);
  };

  return (
    <>
      <div className="nav">
        <button
          className="btn btn-large btn-primary"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>

      <InfiniteScroll
        dataLength={LaunchCard.length} //This is important field to render the next data
        next={fetchData}
        hasMore={noMore}
        loader={<img src={loadingGif} alt="loading Gif" />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="card-grid">
          {LaunchCard.map((CardElement, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                <img
                  src={
                    CardElement.links.mission_patch_small
                      ? CardElement.links.mission_patch_small
                      : "https://picsum.photos/200"
                  }
                  className="card-img-top"
                  alt="..."
                  style={{
                    borderRadius: "50%",
                    height: 100,
                    width: 100,
                    display: "block",
                    margin: "auto",
                  }}
                />
                <p className="card-title">
                  <strong>Mission Name :</strong> {CardElement.mission_name}
                </p>
                <p>
                  <strong>Launch Date :</strong> {CardElement.launch_date_local}
                </p>
                <p>
                  <strong>Flight Number :</strong> {CardElement.flight_number}
                </p>
                <p className="card-text">
                  <strong>Details</strong> (if any) :<br />
                  {CardElement.details
                    ? CardElement.details
                    : "No Description found"}
                </p>
                <Link
                  className="btn btn-primary"
                  to={String(CardElement.flight_number)}
                  element={<Launch />}
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

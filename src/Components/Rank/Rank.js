import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div className="rank-text">
      <h1 className="rank-header">
        FaceFinder{" "}
        <span className="rank-header-attention"> detects faces </span> in your
        pictures.
      </h1>
      <p className="rank-entries">
        Give it a try! Paste a link to an image on the web to see it in action.
      </p>
      {/* Displays name and entry count. Will leave out of the app as it doesn't make a lot of functional sense */}
      {/* <p className="rank-entries">
        {` ${name}, your current entry count is `}
        {`${entries}.`}
      </p> */}
    </div>
  );
};

export default Rank;

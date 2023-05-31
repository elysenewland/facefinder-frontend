import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <h1 className="hero-header">
        FaceFinder{" "}
        <span className="hero-header-attention"> detects faces </span> in your
        pictures.
      </h1>
      <p className="hero-text">
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

export default Hero;

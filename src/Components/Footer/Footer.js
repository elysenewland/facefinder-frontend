import React from "react";
import "./Footer.css";

// Displays footer when user is signed in
const Footer = ({ isSignedIn }) => {
  if (!isSignedIn) {
    return null;
  }
  return (
    <footer className="footer">
      <p className="footer-text">
        Built with{" "}
        <a
          className="footer-link"
          href="https://clarifai.com/clarifai/main/models/face-detection"
        >
          the Clarifai API
        </a>{" "}
        – View{" "}
        <a className="footer-link" href="https://github.com/elysenewland">
          Github
        </a>
      </p>
    </footer>
  );
};

export default Footer;

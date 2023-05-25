import React from "react";
import "./Navigation.css";

// If user is signed in, display sign out navigation. Otherwise, don't display navigation
const Navigation = ({ onRouteChange, isSignedIn, currentPage }) => {
  if (isSignedIn && currentPage !== "signin" && currentPage !== "register") {
    return (
      <header className="navigation-wrapper">
        <nav className="navigation-bar">
          <a className="navigation-logo-link" aria-label="Home" href="/">
            <img
              className="navigation-logo"
              src="/images/FaceFinder-Logo.svg"
              alt="Face Finder Logo"
            />
          </a>
          <span
            className="navigation-signout"
            onClick={() => onRouteChange("signin")}
          >
            Sign Out
          </span>
        </nav>
      </header>
    );
  } else {
    return null;
  }
};

export default Navigation;

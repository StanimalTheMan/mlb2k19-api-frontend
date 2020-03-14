import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import Logo from "./mlbdata/Logo";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Logo />
      <Link to="/" className="item">
        <h1>MLB2K19 API</h1>
      </Link>
      <div className="right menu">
        <Link to="/batting" className="item">
          <h3>Batters</h3>
        </Link>
        <Link to="/pitching" className="item">
          <h3>Pitchers</h3>
        </Link>
        <Link to="/" className="item">
          <h3>Homepage</h3>
        </Link>
      </div>
    </div>
  );
};

export default Header;

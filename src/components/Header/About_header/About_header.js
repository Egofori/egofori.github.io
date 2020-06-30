import React from "react";
import { Link } from "react-router-dom";


function Header(){
    return (
      <div className="About_header-headerDiv">
        <div className="About_header-logoDiv"></div>
        <div className="About_header-navBar">
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/help">
              <li>Help</li>
            </Link>
            <Link to="/about">
              <li className="active">About</li>
            </Link>
          </ul>
        </div>
      </div>
    
    );
  }
export default Header;

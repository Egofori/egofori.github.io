import React from "react";
import { Link } from "react-router-dom";


function Help_Header() {
  return (
    <div className="Help_body">
      <div className="Help_header-headerDiv">
        <div className="Help_header-logoDiv"></div>
        <div className="Help_page-title">
          <p>Welcome to Our Help Page</p>
        </div>
        <div className="Help_header-navBar">
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/help">
              <li className="active">Help</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
          </ul>

        </div>
      </div>

    </div>


  );
}
export default Help_Header;
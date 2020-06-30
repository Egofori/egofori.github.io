import React from "react";
import { Link } from "react-router-dom";

class Home_header extends React.Component {
  render() {
    return (

      <div className="Home_header-headerDiv">
        <div className="Home_header-logoDiv"></div>
        <div className="Home_header-navBar">
          <ul>
            <Link to="/">
              <li className="active">Home</li>
            </Link>
            <Link to="/help">
              <li>Help</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home_header;

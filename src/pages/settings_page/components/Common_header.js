import React from 'react'
import { useState } from 'react'
import dropUp from "../../../images/Dropup.png"
import dropDown from "../../../images/Header_dropdown.png"
import { Link } from 'react-router-dom'



function Common_header(props) {
  const [dropped, setDropped] = useState(false);
  //const [active, setActive] = useState("Dashboard");

  function handleClick() {
    setDropped(!dropped);
  }

  const droppedURL = dropped ? dropUp : dropDown;
  const droppedMenu = dropped ? "block" : "none";

  return (
    <div >
      <div className="Common_header-headerDiv">
        <div
          style={
            {
              display: "inline-block",
              marginTop: "15px",
              marginLeft: "5px",
              marginRight: "20px",
              position: "absolute"
            }}
        >
          <i className="arrow left icon large" style={{ color: "white" }}></i>
        </div>

        <div className="Common_header-profile_block">

          <div className="Common_header-profile"></div>
          <div className="dropdown-icon" style={{ backgroundImage: `url(${droppedURL})` }} onClick={handleClick}></div>
        </div>

        <div className="Common_header-text_input" >
          <p>{props.title}</p>
        </div>

        <div className="Common_header-navBar">
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/dashboard/manage_reports">
              <li className="active">Dashboard</li>
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

      <div className="Common_header-dropdown-content" style={{ display: droppedMenu }}>
        <ul>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/dashboard/create_report">
            <li>Add a report</li>
          </Link>
          <Link to="/dashboard/manage_templates">
            <li>Manage report templates</li>
          </Link>
          <Link to="/settings">
            <li>Settings</li>
          </Link>
          <Link to="/">
            <li>Logout</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
export default Common_header


import React from 'react'
import { useState, useEffect } from 'react'
import dropUp from "../../../images/Dropup.png"
import dropDown from "../../../images/Header_dropdown.png"
import { Link } from 'react-router-dom'
import profile_image from "../../../images/profile_image.png";
import { useCookies } from 'react-cookie'
import axios from 'axios'


function Common_header(props) {
  //holds a boolean value to tell if the dropdown menu is droped or not
  const [dropped, setDropped] = useState(false);
  //holds the path to the image that shows on the header  
  const [imagePath, setImagePath] = useState(profile_image)
  //holds the cookies for this site
  const [cookies, setCookie, removeCookie] = useCookies(['info'])

  useEffect(() => {
    //check if the image of the staff exits
    axios.get(`/images/exists/${cookies.info.staff.email}.jpg`).then(({ data }) => {
      const path = JSON.parse(data) === true ? `/images/${cookies.info.staff.email}.jpg?dummy=${Math.round(Math.random() * 1000)}` : profile_image
      //update the path to the image      
      setImagePath(path)
    })
  }, [])

  //called when the arrow is clicked
  function handleClick() {
    setDropped(!dropped);
  }

  //called when the back button is clicked
  const handleBackClick = () => {
    props.history.goBack()
  }

  //used to log out the user
  const handleLogoutClick = () => {
    removeCookie("info")
    props.history.push('/')
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
          <i className="arrow left icon large" style={{ color: "white", cursor: "pointer" }} onClick={handleBackClick}></i>
        </div>

        <div className="Common_header-profile_block">

          <Link
            to={'/dashboard/profile'}
          >
            <div className="Common_header-profile" >
              <img
                src={imagePath}
                alt="profile_image"
                style={{ height: "40px" }}
              />
            </div>
          </Link>
          <div className="dropdown-icon" style={{ backgroundImage: `url(${droppedURL})`, cursor: "pointer" }} onClick={handleClick}></div>
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

      <div className="Common_header-dropdown-content" style={{ display: droppedMenu }} onClick={() => { setDropped(!dropped) }}>
        <ul>
          <Link to="/dashboard/profile">
            <li>Profile</li>
          </Link>
          <Link to="/dashboard/report_folders">
            <li>Manage reports</li>
          </Link>
          <li onClick={handleLogoutClick} style={{ cursor: "pointer" }}>Logout</li>
        </ul>
      </div>
    </div>
  )
}
export default Common_header


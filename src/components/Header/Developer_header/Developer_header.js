import React from 'react'
import { useState, useEffect } from 'react'
import dropUp from "../../../images/Dropup.png"
import dropDown from "../../../images/Header_dropdown.png"
import { Link } from 'react-router-dom'
import profile_image from "../../../images/profile_image.png";
import { useCookies } from 'react-cookie'
import axios from 'axios'


function Developer_header(props) {
  //tells if the menu has been dropped
  const [dropped, setDropped] = useState(false);

  //holds the path to the image that shows on the header  
  const [imagePath, setImagePath] = useState(profile_image)
  //holds the cookies for this site
  const [cookies, setCookie, removeCookie] = useCookies(['info'])

  useEffect(() => {
    //check if the image of the staff exits
    axios.get(`/images/exists/${cookies.dev.developer.email}.jpg`).then(({ data }) => {
      const path = JSON.parse(data) === true ? `/images/${cookies.dev.developer.email}.jpg?dummy=${Math.round(Math.random() * 1000)}` : profile_image
      //update the path to the image      
      setImagePath(path)
    })
  }, [])

  //runs when the arrow is clicked
  function handleClick() {
    setDropped(!dropped);
  }

  //called when the back button is clicked
  const handleBackClick = () => {
    props.history.goBack()
  }

  //used to log out the user
  const handleLogoutClick = () => {
    props.history.push('/developer/login')
  }


  const droppedURL = dropped ? dropUp : dropDown;
  const droppedMenu = dropped ? "block" : "none";

  return (
    <div >
      <div className="Developer_header-headerDiv">
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

        <div className="Developer_header-profile_block">
          <Link
            to='/developer/profile'>
            <div className="Developer_header-profile" style={{ cursor: "pointer" }}>
              <img
                src={imagePath}
                alt="profile_image"
                style={{ height: "40px" }}
              />
            </div>
          </Link>
          <div className="dropdown-icon" style={{ backgroundImage: `url(${droppedURL})`, cursor: "pointer" }} onClick={handleClick}></div>
        </div>

        <div className="Developer_header-text_input" >
          <p>{props.title}</p>
        </div>
      </div>

      <div className="Developer_header-dropdown-content" style={{ display: droppedMenu, zIndex: "999" }} onClick={() => { setDropped(!dropped) }}>
        <ul>
          <Link to="/developer/profile">
            <li>Profile</li>
          </Link>
          <Link to="/developer/dashboard/schools">
            <li>Schools</li>
          </Link>
          <Link to="/developer/dashboard/template">
            <li>Create Template</li>
          </Link>
          <li onClick={handleLogoutClick} style={{ cursor: "pointer" }}>Logout</li>
        </ul>
      </div>
    </div>
  )
}
export default Developer_header


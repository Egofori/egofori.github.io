import React from "react"
// import Common_header from '../../components/Header/Common_header/Common_header'
import Admin_header from "../../components/Header/Admin_header/Admin_header"
import Common_footer from '../../components/Footer/Common_footer/Common_footer'
import { useCookies } from 'react-cookie'
import { Link, Redirect } from 'react-router-dom'
import Body from "./Body";

function MainComponent(props) {
  //holds the cookies
  const [cookies, setCookie] = useCookies(['info'])

  if (!cookies.hasOwnProperty("info")) {
    return (<Redirect to={{ pathname: "/" }} />)
  }
  else {
    if (cookies.info.loggedIn == true) {
      return (
        <div>
          <Admin_header {...props} title="Account" />
          <Body {...props} />
          <Common_footer />
        </div>
      )
    } else {
      return (<Redirect to={{ pathname: "/" }} />)
    }
  }
}

export default MainComponent;

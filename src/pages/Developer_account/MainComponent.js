import React from "react"
import Developer_footer from '../../components/Footer/Developer_footer/Developer_footer'
import Developer_header from '../../components/Header/Developer_header/Developer_header'
import { useCookies } from 'react-cookie';
import { Link, Redirect } from 'react-router-dom'
import Body from "./Body";

function MainComponent(props) {
  //holds the cookies for this site
  const [cookies, setCookie, removeCookie] = useCookies(['dev'])

  if (!cookies.hasOwnProperty("dev")) {
    return (<Redirect to={{ pathname: "/developer/login" }} />)
  }
  else {
    if (cookies.dev.loggedIn == true) {
      return (
        <div>
          <Developer_header {...props} title="Account" />
          <Body {...props} />
          <Developer_footer />
        </div>
      )
    }
    else {
      return (<Redirect to={{ pathname: "/developer/login" }} />)
    }
  }
}

export default MainComponent;

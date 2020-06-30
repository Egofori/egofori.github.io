import React from 'react'
import Developer_footer from '../../components/Footer/Developer_footer/Developer_footer'
import Developer_header from '../../components/Header/Developer_header/Developer_header'
import Template_form from './Template_form'
import './create_style.css'
import { useCookies } from 'react-cookie';
import { Link, Redirect } from 'react-router-dom'


export default function Create_template(props) {
    //holds the cookies for this site
    const [cookies, setCookie, removeCookie] = useCookies(['dev'])

    if (!cookies.hasOwnProperty("dev")) {
        return (<Redirect to={{ pathname: "/developer/login" }} />)
    }
    else {
        if (cookies.dev.loggedIn == true) {
            return (
                <React.Fragment>
                    <Developer_header {...props} title="Create a new Template" />
                    <Template_form />
                    <Developer_footer />
                </React.Fragment>
            )
        } else {
            return (<Redirect to={{ pathname: "/developer/login" }} />)
        }
    }
}


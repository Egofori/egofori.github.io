import React from 'react'
import Developer_header from '../../components/Header/Developer_header/Developer_header'
import Admin_form from './Admin_form'
import Developer_footer from '../../components/Footer/Developer_footer/Developer_footer'
import './Admin.css'
import { useCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

export default function Admin(props) {
    //holds the cookies
    const [cookies, setCookie] = useCookies(['dev'])

    if (!cookies.dev.hasOwnProperty("school")) {
        return (<p>loading...</p>)
    }
    else {
        if (!cookies.hasOwnProperty("dev")) {
            return (<Redirect to={{ pathname: "/developer/login" }} />)
        }
        else {
            if (cookies.dev.loggedIn == true) {

                return (
                    <React.Fragment>
                        <div className="Admin-body">
                            <Developer_header {...props} title="Administration Form" />
                            <div id="Admin-form">
                                <Admin_form {...props} />
                            </div>
                        </div>
                        <Developer_footer />
                    </React.Fragment>

                )
            } else {
                return (<Redirect to={{ pathname: "/developer/login" }} />)
            }
        }
    }
}



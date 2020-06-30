import React from 'react'
import Template from './Template'
import Common_header from '../../components/Header/Common_header/Common_header'
import Common_footer from '../../components/Footer/Common_footer/Common_footer'
import './Manage_templates_style.css'
import { useCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

function Manage_templates(props) {
    //holds the cookies
    const [cookies, setCookie] = useCookies(['info'])

    if (!cookies.hasOwnProperty("info")) {
        return (<Redirect to={{ pathname: "/" }} />)

    }
    else {

    return (
        <React.Fragment>
            <div className="Manage_templates-body">
                <Common_header {...props} title="Manage templates" />
                <div className="Manage_templates-templates">
                    <Template name="Default" />
                   
                    <div className="Manage_templates-button-image">
                        <button></button>
                    </div>
                </div>
            </div>
            <Common_footer />
        </React.Fragment>
    )
    }
}
export default Manage_templates
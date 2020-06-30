import React, { useEffect } from 'react'
import Developer_header from '../../components/Header/Developer_header/Developer_header'
import Register_form from './Register_form'
import Developer_footer from '../../components/Footer/Developer_footer/Developer_footer'
import './Register.css'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { connect } from 'react-redux'


function Register(props) {
    //holds cookies
    const [cookies, setCookie] = useCookies(['dev'])

    useEffect(() => {
        props.updateDev(cookies.dev.developer)
        props.updateLog(cookies.dev.loggedIn)
    }, [])
    // if (!props.developer.hasOwnProperty("id_designer")) {
    //     return (<p>loading...</p>)
    // }
    // else {

    if (!cookies.hasOwnProperty("dev")) {
        return (<Redirect to={{ pathname: "/developer/login" }} />)

    }
    else {
        if (cookies.dev.loggedIn == true) {

            return (
                <React.Fragment>
                    <div className="Register-body">
                        <Developer_header {...props} title="Register" />
                        <div id="Registration-form">
                            <Register_form {...props} />
                        </div>
                    </div>
                    <Developer_footer />
                </React.Fragment>

            )
        } else {
            return (<Redirect to={{ pathname: "/developer/login" }} />)
        }
    }
    // }
}



const mapState2Props = (state) => {
    return {
        school: state.school,
        developer: state.developer,
        loggedIn: state.loggedIn
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        updateDev: (dev) => { dispatch({ type: 'UPDATE_DEV', value: dev }) },
        updateSchool: (data) => { dispatch({ type: 'UPDATE_SCH', value: data }) },
        updateLog: (log) => { dispatch({ type: 'UPDATE_LOG', value: log }) }
    }

}

export default connect(mapState2Props, mapDispatch2Props)(Register)
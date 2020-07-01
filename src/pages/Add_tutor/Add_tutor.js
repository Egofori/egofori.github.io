import React, { useState, useEffect } from 'react'
import Admin_header from "../../components/Header/Admin_header/Admin_header"
// import Common_header from '../../components/Header/Common_header/Common_header'
import Tutor_form from './Tutor_form'
import Common_footer from '../../components/Footer/Common_footer/Common_footer'
import './Add_tutor.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'


function Add_tutor(props) {
    const [cookies, setCookie] = useCookies(['info'])

    useEffect(() => {
        // props.updateLog(cookies.info.loggedIn)
        // props.updateStaff(cookies.info.staff)
        // props.updateSchool(cookies.info.school)
    }, [])

    // if (!props.staff.hasOwnProperty("id_admin")) {
    //     return (<p>loading...</p>)
    // }
    // else{
    if (!cookies.hasOwnProperty("info")) {
        return (<Redirect to={{ pathname: "/" }} />)
    }
    else {
        if (cookies.info.loggedIn == true) {

            return (
                <React.Fragment>
                    <div className="Add_tutor-body">
                        <Admin_header {...props} title="Add a new tutor" />
                        <div id="Add_tutor-form">
                            <Tutor_form {...props} />
                        </div>
                    </div>
                    <Common_footer />
                </React.Fragment>
            )
        } else {
            return (<Redirect to={{ pathname: "/" }} />)

        }
    }
    // }
}

const mapState2Props = (state) => {
    return {
        staff: state.staff,
        school: state.school,
        loggedIn: state.loggedIn
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        updateStaff: (staff) => { dispatch({ type: 'UPDATE_STAFF', value: staff }) },
        updateSchool: (school) => { dispatch({ type: 'UPDATE_SCH', value: school }) },
        updateLog: (log) => { dispatch({ type: 'UPDATE_LOG', value: log }) }
    }

}

export default connect(mapState2Props, mapDispatch2Props)(Add_tutor);
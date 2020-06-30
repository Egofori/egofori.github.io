import React from 'react'
import Common_header from '../../components/Header/Common_header/Common_header'
import Common_footer from '../../components/Footer/Common_footer/Common_footer'
import './Assess_student.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Assess_form from './Assess_form'

function Assess_student(props) {
    //holds the cookies
    const [cookies, setCookie] = useCookies(['info'])
    // if (!props.staff.hasOwnProperty("id_tutor")) {
    //     // setTimeout(()=>{props.history.push("/")},5000)
    //     return (<p>loading...</p>)
    // }
    // else {

    if (!cookies.hasOwnProperty("info")) {
        return (<Redirect to={{ pathname: "/" }} />)

    }
    else {
        if (cookies.info.loggedIn == true) {

        return (
            <React.Fragment>
                <div className="Create_report-body">
                    <Common_header {...props} title="Fill the report" />
                    <Assess_form {...props}/>
                </div>
                <Common_footer />
            </React.Fragment>
        )
    }else{
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

export default connect(mapState2Props, mapDispatch2Props)(Assess_student)
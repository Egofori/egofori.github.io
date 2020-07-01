import React, { useState, useEffect } from 'react'
import Report_form from './Report_form'
import Common_header from '../../components/Header/Common_header/Common_header'
import Common_footer from '../../components/Footer/Common_footer/Common_footer'
import './Create_report_style.css'
import { Transition, Segment, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'


function Create_report(props) {
    //holds the error message
    var [errorMessage, setErrorMessage] = useState('')
    //holds the cookies
    const [cookies, setCookie] = useCookies(['info'])
    // const [student, setStudent] = useState({})

    //gets error message from the Report_form component
    const getErrorMsg = value => {
        setErrorMessage(value)
    }

    //runs to clear the error message
    const handleCloseClick = () => {
        setErrorMessage('')
    }

    // if (!props.staff.hasOwnProperty("id_tutor")) {
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
                        <Common_header {...props} title="Creating a new report" />
                        <div id="Create_report-form">
                            <Report_form {...props} return2Parent={getErrorMsg} />
                        </div>
                        <Transition visible={errorMessage != ''} animation='scale' duration={200}>
                            <Segment
                                color="orange"
                                style={{
                                    width: "35%",
                                    margin: "-30px auto 0px auto"
                                }}>
                                <div
                                    style={{

                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <p
                                        style={{
                                            display: "inline"
                                        }}
                                    >{errorMessage}</p>
                                    <Icon
                                        name="close"
                                        style={{
                                            marginLeft: "10",
                                            marginTop: "10px",
                                            position: "relative",
                                            cursor: "pointer",
                                        }}
                                        onClick={handleCloseClick} />
                                </div>
                            </Segment>
                        </Transition>
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

export default connect(mapState2Props, mapDispatch2Props)(Create_report)
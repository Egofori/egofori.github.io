import React from 'react'
//import Button from '../../images/button.png'
import './List_reports_style.css'
import Report from './Report'
import Common_header from "../../components/Header/Common_header/Common_header"
import Common_footer from "../../components/Footer/Common_footer/Common_footer"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Popup, Modal, Input, Button } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { useCookies } from 'react-cookie'

function List_reports(props) {
    //holds the list of the reports for a particular folder
    const [reportsList, setReportsList] = useState([])
    //holds the list of students
    const [studentsList, setStudentsList] = useState([])
    //get the id_folder from the parameter in the path name
    const id_folder = props.match.params.reports_folder_id
    //holds the cookies for the site
    const [cookies, setCookie] = useCookies(['info']);
    useEffect(() => {
        //get students of reports belonging to a folder with id id_folder
        axios.get('/report_students/' + id_folder).then(({ data }) => {
            setStudentsList(data)
            //getting all reports from a folder
            axios.get('/folder_report/' + id_folder).then(({ data }) => {
                setReportsList(data)
            })
        })
        // props.updateStaff(cookies.info.staff)
        // props.updateLog(cookies.info.loggedIn)
    }, [])



    const handleAddBtnClick = () => {
        //redirect to this url if the add buttonis clicked
        props.history.push(`/dashboard/report_folders/${id_folder}/reports/edit/student`)
    }


    // if (!props.staff.hasOwnProperty("id_tutor")) {
    //     setTimeout(() => { props.history.push("/") }, 5000)
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
                    <div className="List_reports-body">
                        <Common_header {...props} title="List of Reports" />
                        <div className="List_reports-all">
                            {reportsList.map((report) =>
                                <Report
                                    {...props}
                                    key={report.id_report}
                                    id={report.id_report}
                                    link={`/dashboard/report_folders/${id_folder}/reports/${report.id_report}/edit/student`}
                                    name={studentsList[report.id_report].first_name + ' ' + studentsList[report.id_report].last_name}
                                    sex={studentsList[report.id_report].sex}
                                />
                            )}
                            <div className="List_reports-button-image">
                                <Popup
                                    trigger={<button style={{ cursor: "pointer" }} onClick={handleAddBtnClick}></button>}
                                    content="Add a new report folder"
                                />
                            </div>
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

export default connect(mapState2Props, mapDispatch2Props)(List_reports)
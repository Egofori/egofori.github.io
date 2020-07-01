import React, { useState, useEffect } from 'react'
import { Input, Checkbox, Transition, Segment, Icon } from 'semantic-ui-react'
import './Create_report_style.css'
import { Redirect } from 'react-router-dom'
import vForm from '../../misc/ValidateForm'
import axios from 'axios'
import { useCookies } from 'react-cookie'

function Report_form(props) {
    //holds the cookies
    const [cookies, setCookie] = useCookies(['info'])
    //holds the error message
    var [errorMessage, setErrorMessage] = useState('')
    //holds the form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        sex: 'M',
        age: '',
        level: '',
        id_tutor: cookies.info.staff.id_tutor,
        school_year: '',
        days_open: '',
        days_present: ''
    })

    useEffect(() => {
        if (props.match.params.report_id) {
            //get the student of a report
            const res = axios.get('/report_student/' + props.match.params.report_id).then(({ data }) => {
                setFormData({
                    ...formData,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    sex: data.sex,
                    age: data.age,
                    level: data.level,
                    school_year: data.school_year,
                    days_open: data.days_open,
                    days_present: data.days_present
                })

                setCookie("info", { staff: cookies.info.staff, school: cookies.info.school, loggedIn: cookies.info.loggedIn, student: data }, { path: "/" })

            })
        }

    }, [])

    //determines the form of the data been sent
    const config = {
        first_name: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Invalid first name. "
                })
            ]
        },
        last_name: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Invalid last name. "
                })
            ]
        },
        age: {
            required: true,
            validators: [
                value => ({
                    type: "number",
                    errorMsg: "Invalid age. "
                }),
                value => ({
                    exp: value >= 0,
                    errorMsg: "Invalid age. "
                })
            ]
        },
        level: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Invalid class. "
                })
            ]
        },
        school_year: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Invalid school year. "
                })
            ]
        },
        days_open: {
            required: true,
            validators: [
                value => ({
                    type: "number",
                    errorMsg: "Invalid number of days. "
                }),
                value => ({
                    exp: value >= 0,
                    errorMsg: "Invalid number of days. "
                })
            ]
        },
        days_present: {
            required: true,
            validators: [
                value => ({
                    type: "number",
                    errorMsg: "Invalid number of days. "
                }),
                value => ({
                    exp: value >= 0,
                    errorMsg: "Invalid number of days. "
                })
            ]
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        //update the form data as they change
        setFormData({
            ...formData,
            first_name: (name === "firstName") ? value : formData.first_name,
            last_name: (name === "lastName") ? value : formData.last_name,
            age: (name === "age") ? value : formData.age,
            level: (name === "level") ? value : formData.level,
            school_year: (name === "schoolYear") ? value : formData.school_year,
            days_open: (name === "daysOpen") ? value : formData.days_open,
            days_present: (name === "daysPresent") ? value : formData.days_present
        })

    }

    const handleCheckChange = (event, { name, value }) => {
        //updates the sex
        setFormData({
            ...formData,
            sex: (name === "sex") ? value : formData.sex,
        })
    }

    //runs when the button is clicked
    const handleClick = async () => {
        // setFormData({
        //     ...formData,
        //     first_name: formData.first_name.trim(),
        //     last_name: formData.last_name.trim(),
        //     age: formData.age,
        //     level: cookies.info.staff.level.trim(),
        //     school_year: formData.school_year.trim(),
        //     days_open: formData.days_open,
        //     days_present: formData.days_present
        // })

        const send_data = {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            sex: formData.sex,
            age: formData.age,
            level: cookies.info.staff.level,
            id_tutor: cookies.info.staff.id_tutor,
            school_year: formData.school_year.trim(),
            days_open: formData.days_open,
            days_present: formData.days_present
        }
        var check = vForm.validate(config, send_data)
        if (check.valid) {
            if (props.match.params.hasOwnProperty("report_id")) {
                //update the data on the api
                const response = await fetch('/student/' + cookies.info.student.id_student, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })
                if (response.ok) {
                    props.history.push(`/dashboard/report_folders/${props.match.params.reports_folder_id}/reports/${props.match.params.report_id}/edit/scores`)
                } else {
                    props.return2Parent("An error occurred! Please check internet connection.")
                }
            }
            else {
                //add a new student
                const response = await fetch('/student', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })

                if (response.ok) {
                    response.json().then(async (data) => {
                        //update the cookies
                        setCookie("info", { staff: cookies.info.staff, school: cookies.info.school, loggedIn: cookies.info.loggedIn, student: data }, { path: "/" })

                        //add a new report to the api
                        const response2 = await fetch('/report', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                id_student: data.id_student,
                                id_reports_folder: props.match.params.reports_folder_id,
                                scores: JSON.stringify({
                                    content: '[]',
                                    position: '[]'
                                })
                            })
                        })

                        if (response2.ok) {
                            setFormData({
                                formData,
                                first_name: '',
                                last_name: '',
                                age: '',
                                level: '',
                                school_year: '',
                                days_open: '',
                                days_present: ''
                            })
                            response2.json().then(data => {
                                props.history.push(`/dashboard/report_folders/${props.match.params.reports_folder_id}/reports/${data.id_report}/edit/scores`)
                            })

                        } else {
                            props.return2Parent("An error occurred! Please check internet connection.")
                        }
                    })


                }
            }

        }
        else {
            setErrorMessage(check.msg)
            props.return2Parent(errorMessage)
        }
    }

    //calls handle click when enter is pressed at the last field
    const handleKeyPress = (event) => {
        if (event.which == 13) {
            handleClick()
        }
    }

    if (!props.hasOwnProperty("history")) {
        return (<p>loading...</p>)
    }
    // else {
    //     if (!props.loggedIn) {
    //         return (<Redirect to={{ pathname: "/" }} />)
    //     }
    else {

        return (
            <>
                <div className="Report_form-body">
                    <table border="1" bordercolor="black" cellPadding="2" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td>First name:</td>
                                <td>
                                    <Input
                                        placeholder="eg. John"
                                        name="firstName"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Last name:</td>
                                <td>
                                    <Input
                                        placeholder="eg. Doe"
                                        name="lastName"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Sex:</td>
                                <td id="sexCell">
                                    <Checkbox
                                        radio
                                        label="Male"
                                        name="sex"
                                        value="M"
                                        checked={formData.sex == 'M'}
                                        onChange={handleCheckChange}
                                    />
                                    <Checkbox
                                        radio
                                        label="Female"
                                        name="sex"
                                        value="F"
                                        checked={formData.sex == 'F'}
                                        onChange={handleCheckChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td>
                                    <Input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        placeholder="eg. 3"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Class:</td>
                                <td>
                                    <Input
                                        type="text"
                                        name="level"
                                        value={cookies.info.staff.level}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Name of teacher:</td>
                                <td>
                                    <Input
                                        type="text"
                                        name="tutor"
                                        value={cookies.info.staff.title + " " + cookies.info.staff.first_name + " " + cookies.info.staff.last_name}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>School:</td>
                                <td>
                                    <Input
                                        type="text"
                                        name="school"
                                        value={cookies.info.school.name}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>School year:</td>
                                <td>
                                    <Input
                                        type="text"
                                        name="schoolYear"
                                        value={formData.school_year}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Number of days open:</td>
                                <td>
                                    <Input
                                        type="number"
                                        placeholder="eg. 50"
                                        name="daysOpen"
                                        value={formData.days_open}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Number of days present:</td>
                                <td>
                                    <Input
                                        type="number"
                                        placeholder="eg. 50"
                                        name="daysPresent"
                                        value={formData.days_present}
                                        onChange={handleChange}
                                        onKeyPress={handleKeyPress}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={handleClick}>Next</button>
                </div>

            </>
        )
    }
    // }
}



export default (Report_form)

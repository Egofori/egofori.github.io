import React, { useEffect } from 'react'
import { Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import vForm from '../../misc/ValidateForm'

function Admin_form(props) {
    //holds the cookies
    const [cookies, setCookie] = useCookies(['dev'])
    //holds the error message
    var [errorMessage, setErrorMessage] = useState('')
    //holds the form data
    const [adminData, setAdminData] = useState({
        id_school: null,
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: ""
    })


    // useEffect(() => {
    //     props.updateSchool(cookies.dev.school)
    //     props.updateLog(cookies.dev.loggedIn)
    //     props.updateDev(cookies.dev.developer)
    //     setAdminData({...adminData,id_school:cookies.dev.school.id_school})
    // }, [])
    useEffect(() => {
        if (props.match.params.admin_id) {
            //get the student of a report
            const res = axios.get('/admin/' + props.match.params.admin_id).then(({ data }) => {
                setAdminData({
                    ...adminData,
                    title: data.title,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password
                })
            })
        }

        if (props.match.params.school_id) {
            setAdminData({
                ...adminData,
                id_school: props.match.params.school_id
            })
        } else {
            props.history.push('/developer/dashboard/schools')
        }

    }, [])

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
        email: {
            required: true,
            validators: [
                value => ({
                    type: "email",
                    errorMsg: "Invalid email. "
                })

            ]
        }
    }


    const handleClick = async () => {
        //trim data
        const send_data = {
            id_school: props.match.params.school_id,
            title: adminData.title.trim(),
            first_name: adminData.first_name.trim(),
            last_name: adminData.last_name.trim(),
            email: adminData.email.trim(),
            phone: adminData.phone.trim(),
            password: adminData.password
        }
        var check = vForm.validate(config, adminData)
        if (check.valid) {
            if (props.match.params.hasOwnProperty("admin_id")) {
                //adds new admin to the api
                const response = await fetch('/admin/' + props.match.params.admin_id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })

                if (response.ok) {
                    setAdminData({
                        title: "",
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                        password: ""
                    })
                    props.history.push(`/developer/dashboard/schools/${props.match.params.school_id}/admins`)
                }
            } else {
                const response = await fetch('/admin', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })

                if (response.ok) {
                    setAdminData({
                        title: "",
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                        password: ""
                    })
                    props.history.push(`/developer/dashboard/schools/${props.match.params.school_id}/admins`)
                }
            }
        } else {
            setErrorMessage(check.msg)
            // props.return2Parent(errorMessage)
        }
    }

    //runs when the value in the form field is changed
    const handleChange = (event) => {
        const { name, value } = event.target
        setAdminData({
            ...adminData,
            title: (name === "title") ? value : adminData.title,
            first_name: (name === "firstName") ? value : adminData.first_name,
            last_name: (name === "lastName") ? value : adminData.last_name,
            email: (name === "email") ? value : adminData.email,
            phone: (name === "phone") ? value : adminData.phone,
            password: (name === "password") ? value : adminData.password
        })
    }

    return (
        <div className="Admin-form-body">
            <table border="1" bordercolor="black" cellPadding="2" cellSpacing="0">
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td>
                            <Input
                                name="title"
                                placeholder="eg. Mr."
                                type="text"
                                value={adminData.title}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>First name:</td>
                        <td>
                            <Input
                                name="firstName"
                                placeholder="eg. John"
                                type="text"
                                value={adminData.first_name}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Last name:</td>
                        <td>
                            <Input
                                name="lastName"
                                placeholder="eg. Doe"
                                type="text"
                                value={adminData.last_name}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>
                            <Input
                                name="email"
                                placeholder="johndoe@example.com"
                                type="email"
                                value={adminData.email}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td>
                            <Input
                                name="phone"
                                placeholder="0508101800"
                                type="text"
                                value={adminData.phone}
                                onChange={handleChange}
                            /></td>
                    </tr>

                    <tr>
                        <td>Password:</td>
                        <td>
                            <Input
                                name="password"
                                type="password"
                                value={adminData.password}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
    // }
    // }
}

const mapState2Props = (state) => {
    return {
        school: state.school,
        loggedIn: state.loggedIn,
        developer: state.developer
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        updateDev: (dev) => { dispatch({ type: 'UPDATE_DEV', value: dev }) },
        updateSchool: (data) => { dispatch({ type: 'UPDATE_SCH', value: data }) },
        updateLog: (log) => { dispatch({ type: 'UPDATE_LOG', value: log }) }
    }

}

export default connect(mapState2Props, mapDispatch2Props)(Admin_form)
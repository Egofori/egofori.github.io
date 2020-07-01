import React from 'react'
import { Input, Form } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import vForm from '../../misc/ValidateForm'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Select, Segment, Icon, Transition } from 'semantic-ui-react'


export default function Tutor_form(props) {
    //holds cookies
    const [cookies, setCookie] = useCookies(['dev'])
    //holds the error message
    var [errorMessage, setErrorMessage] = useState('')
    //holds form data containing tutor info
    const [tutorData, setTutorData] = useState({
        id_school: cookies.info.staff.id_school,
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        level: "",
        password: ""
    });

    //hold levels
    var levels = []
    //holds list of schools from the api
    const [levelsList, setLevelsList] = useState([])

    useEffect(() => {
        if (props.match.params.tutor_id) {
            //get the student of a report
            const res = axios.get('/tutor/' + props.match.params.tutor_id).then(({ data }) => {
                setTutorData({
                    ...tutorData,
                    title: data.title,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    level: data.level,
                    password: data.password
                })
            })
        }

        axios.get('/school_default_template/' + cookies.info.staff.id_school).then(({ data }) => {
            setLevelsList(data)
        })
    }, [])

    //push the schools into the schools array
    for (var i = 0; i < levelsList.length; i++) {
        levels.push(
            {
                key: levelsList[i].id_default_template,
                value: levelsList[i].level,
                text: levelsList[i].level
            })
    }

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

    //runs when the button is clicked
    const handleClick = async () => {
        const send_data = {
            id_school: cookies.info.staff.id_school,
            title: tutorData.title.trim(),
            first_name: tutorData.first_name.trim(),
            last_name: tutorData.last_name.trim(),
            email: tutorData.email.trim(),
            phone: tutorData.phone.trim(),
            level: tutorData.level,
            password: tutorData.password
        }
        console.log(send_data)

        var check = vForm.validate(config, tutorData)
        if (check.valid) {
            if (props.match.params.hasOwnProperty("tutor_id")) {
                //update the data on the api
                const response = await fetch('/tutor/' + props.match.params.tutor_id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })

                if (response.ok) {
                    setTutorData({
                        title: "",
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                        level: "",
                        password: ""
                    })
                    props.history.push(`/admin/dashboard/levels`)
                }
            } else {
                //add new tutor to the api
                const response = await fetch('/tutor', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })

                if (response.ok) {
                    setTutorData({
                        title: "",
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone: "",
                        level: "",
                        password: ""
                    })
                    props.history.push(`/admin/dashboard/levels`)
                }
            }

        }
        else {
            setErrorMessage(check.msg)
            // props.return2Parent(errorMessage)
        }
    }

    const handleSelectChange = (event, { name, value }) => {
        //update the school field of the loginData object
        setTutorData({
            ...tutorData,
            level: (name === "level") ? value : tutorData.level,
        })
        console.log(value)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setTutorData({
            ...tutorData,
            title: (name === "title") ? value : tutorData.title,
            first_name: (name === "firstName") ? value : tutorData.first_name,
            last_name: (name === "lastName") ? value : tutorData.last_name,
            email: (name === "email") ? value : tutorData.email,
            phone: (name === "phone") ? value : tutorData.phone,
            password: (name === "password") ? value : tutorData.password
        })
    }


    return (
        <Form name="tutorForm" className="Tutor-form-body">
            <table border="1" bordercolor="black" cellPadding="2" cellSpacing="0">
                <tbody>
                    <tr>
                        <td>Level:</td>
                        <td>
                            <Select
                                className="select"
                                name="level"
                                placeholder='choose a level'
                                options={levels}
                                value={tutorData.level}
                                onChange={handleSelectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Title:</td>
                        <td>
                            <Input
                                name="title"
                                placeholder="eg. Mr."
                                type="text"
                                value={tutorData.title}
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
                                value={tutorData.first_name}
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
                                value={tutorData.last_name}
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
                                value={tutorData.email}
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
                                value={tutorData.phone}
                                onChange={handleChange}
                            /></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <Input
                                name="password"
                                type="password"
                                value={tutorData.password}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" onClick={handleClick}>Add</button>
        </Form>
    )
}
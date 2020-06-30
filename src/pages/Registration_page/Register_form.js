import React from 'react'
import { Input } from 'semantic-ui-react'
//import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import vForm from '../../misc/ValidateForm'
import axios from 'axios'


function Register_form(props) {
    //holds the cookies
    const [cookies, setCookie] = useCookies(['dev'])
    //holds the error message
    var [errorMessage, setErrorMessage] = useState('')
    //holds the data in the form
    const [registerData, setRegisterData] = useState({
        name: "",
        location: "",
    })

    useEffect(() => {
        if (props.match.params.school_id) {
            //get the student of a report
            const res = axios.get('/school/' + props.match.params.school_id).then(({ data }) => {
                setRegisterData({
                    ...registerData,
                    name: data.name,
                    location: data.location
                })
            })
        }

    }, [])

    const config = {
        name: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Invalid school name. "
                })
            ]
        },
        location: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Invalid location. "
                })
            ]
        }
    }

    //runs when the button is clicked
    const handleClick = async () => {
        setRegisterData({
            ...registerData,
            name: registerData.name.trim(),
            location: registerData.location.trim()
        })

        var check = vForm.validate(config, registerData)

        if (check.valid) {
            if (props.match.params.hasOwnProperty("school_id")) {
                //add new school to the api
                const response = await fetch('/school/' + props.match.params.school_id, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registerData)
                })

                if (response.ok) {
                    response.json().then(data => {
                        props.updateSchool(data)
                        setCookie("dev", { ...cookies.dev, school: data }, { path: "/" })
                        props.updateSchool(data)
                    })
                    props.history.push(`/developer/dashboard/schools/${props.match.params.school_id}/admins`)
                }
            } else {
                //add new school to the api
                const response = await fetch('/school', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registerData)
                })

                if (response.ok) {
                    response.json().then(data => {
                        props.updateSchool(data)
                        setCookie("dev", { ...cookies.dev, school: data }, { path: "/" })
                        props.history.push(`/developer/dashboard/schools/${data.id_school}/admins`)
                        props.updateSchool(data)
                    })
                }
            }
        } else {
            setErrorMessage(check.msg)
            // props.return2Parent(errorMessage)
        }
    }

    //runs when there is a form field value changes
    const handleChange = (event) => {
        const { name, value } = event.target
        setRegisterData({
            name: (name === "name") ? value : registerData.name,
            location: (name === "location") ? value : registerData.location
        })
    }


    return (
        <div className="Register-form-body">
            <table border="1" bordercolor="black" cellPadding="2" cellSpacing="0">
                <tbody>
                    <tr>
                        <td>School Name:</td>
                        <td>
                            <Input
                                name="name"
                                placeholder="eg. The Hilltop School"
                                type="text"
                                value={registerData.name}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Location:</td>
                        <td>
                            <Input
                                name="location"
                                placeholder="eg. Ejisu"
                                type="text"
                                value={registerData.location}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleClick}>Register</button>
        </div>
    )
}




export default (Register_form);
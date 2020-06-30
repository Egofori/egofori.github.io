import React from 'react'
import { Input } from 'semantic-ui-react'
//import { connect } from 'react-redux'
import { useState } from 'react'
//import Axios from 'axios';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation'

export default function Tutor_form() {
    const [tutorData, setTutorData] = useState({
        id_school: 1,
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        level: "",
        password: ""
    });

    const handleClick = async () =>{
        const response = await fetch('/tutor',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tutorData)
        })

        if(response.ok){
            console.log("worked!")
        }
        console.log("clicked!")
    }

    const handleChange = (event)=>{
        const {name, value} = event.target
        setTutorData({
            id_school: 1,
            title: (name === "title") ? value: tutorData.title,
            first_name: (name === "firstName") ? value: tutorData.first_name,
            last_name: (name === "lastName") ? value: tutorData.last_name,
            email: (name === "email") ? value: tutorData.email,
            phone: (name === "phone") ? value: tutorData.phone,
            level: (name === "level") ? value: tutorData.level,
            password: (name === "password") ? value: tutorData.password
        })
    }  
    return (
        <div className="Tutor-form-body">
             <table border="1" bordercolor="black" cellPadding="2" cellSpacing="0">
                <tbody>
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
                        <td>Level:</td>
                        <td>
                            <Input
                            name="level"
                            placeholder="kg 1b"
                            type="text"
                            value={tutorData.level}
                            onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td>
                            <Input
                            name="password"
                            type="text"
                            value={tutorData.password}
                            onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}
import React, { useState, useEffect } from 'react'
import { Segment, Form, Transition, Icon } from 'semantic-ui-react'
import axios from 'axios'
import vForm from '../../misc/ValidateForm'

export default function Template_form() {
    //holds error messages to be displayed
    var [errorMessage, setErrorMessage] = useState('')
    //holds the list of schools to be displayed in the select element
    var schools = []
    //holds list of schools from the api
    const [schoolsList, setSchoolsList] = useState([])
    //tells whether to use post or put method
    const [postIt, setPostIt] = useState(false)
    //hold the id_default_template of the fetched data
    const [ID, setID] = useState(null)
    //placeholder
    const placeholder = JSON.stringify([[['subject', 'Total 100%', 'Position'], ['maths'], ['eng']], [['total marks']], [['Conduct'], ['Attitude']]])

    //holds the login data from the login input fields 
    const [templateData, setTemplateData] = useState({
        id_school: '',
        level: '',
        definition: ''
    })

    const config = {
        level: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Enter a level. "
                })
            ]
        },
        definition: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: " Enter a template definition. "
                })
            ]
        }
    }

    useEffect(() => {
        //gets the lists of schools from the api
        axios.get('/school').then(({ data }) => {
            setSchoolsList(data)
        })

    }, [])

    //push the schools into the schools array
    for (var i = 0; i < schoolsList.length; i++) {
        schools.push(
            {
                key: schoolsList[i].id_school,
                value: schoolsList[i].id_school,
                text: schoolsList[i].name
            })
    }


    const handleChange = (event, { name, value }) => {
        //update the templateData object
        setTemplateData({
            ...templateData,
            id_school: (name === "school") ? value : templateData.id_school,
            level: (name === "level") ? value : templateData.level,
            definition: (name === "template") ? value : templateData.definition
        })

        if (name === "level") {
            axios.get('/default_template/' + templateData.id_school + '/' + value).then(({ data }) => {
                if (data.id_default_template) {
                    setTemplateData({ ...templateData, level:value, definition: data.definition })
                    setPostIt(false)
                    setID(data.id_default_template)
                } else {
                    setPostIt(true)
                    setID(null)
                }
            })
        }else if (name === "school") {
            axios.get('/default_template/' + value + '/' + templateData.level).then(({ data }) => {
                if (data.id_default_template) {
                    setTemplateData({ ...templateData, definition: data.definition })
                    setPostIt(false)
                    setID(data.id_default_template)
                } else {
                    setPostIt(true)
                    setID(null)
                }
            })
        }

    }

    const handleClick = async () => {
        const send_data = {
            id_school: templateData.id_school,
            level: templateData.level.trim(),
            definition: templateData.definition.trim()
        }
        console.log(send_data)
        //called the validate function of the ValidateForm class
        var check = vForm.validate(config, send_data)
        if (check.valid) {
            if(postIt){
                const response = await fetch('/default_template', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })
    
                if (response.ok) {
                    setErrorMessage("Saved!")
                } else {
                    setErrorMessage("An error occured. Please try again!")
                }
            }else{
                const response = await fetch('/default_template/'+ID, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(send_data)
                })
    
                if (response.ok) {
                    setErrorMessage("Updated!")
                } else {
                    setErrorMessage("An error occured. Please try again!")
                }
            }
            
        } else {
            setErrorMessage(check.msg)
        }
    }

    const handleCloseClick = () => {
        setErrorMessage('')
    }

    return (
        <div className="Template_form-body">
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select
                        fluid
                        label="School"
                        placeholder="Choose a school"
                        options={schools}
                        name="school"
                        onChange={handleChange}
                    />
                    <Form.Input
                        fluid
                        label="Level"
                        name="level"
                        value={templateData.level}
                        onChange={handleChange}
                    />

                </Form.Group>
                <Form.TextArea
                    label="Template"
                    name="template"
                    style={{ height: "200px" }}
                    value={templateData.definition}
                    placeholder={"eg.  " + placeholder}
                    onChange={handleChange}
                />
                <Form.Button onClick={handleClick}>Save</Form.Button>
            </Form>
            <Transition visible={errorMessage != ''} animation='scale' duration={200}>
                <Segment
                    color="orange"
                    style={{
                        width: "90%",
                        margin: "10px auto 0px auto"
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
    )
}

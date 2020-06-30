import React, { useState } from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import { Select, Segment, Icon, Transition } from 'semantic-ui-react'

function Middle3() {
    //holds error messages to be displayed
    var [errorMessage, setErrorMessage] = useState('')

    //holds email info
    const [mail, setMail] = useState({
        subject: '',
        feedback: '',
        name: '',
        email: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        //update the form data as they change
        setMail({
            ...mail,
            subject: (name === "subject") ? value : mail.subject,
            feedback: (name === "feedback") ? value : mail.feedback,
            name: (name === "email") ? value : mail.name,
            email: (name === "email") ? value : mail.email,
        })
    }

    const handleClick = () => {
        const templateId = "template_WpcTx9BN"
        // const variables = { message_html: setMail.feedback, from_name: setMail.email, reply_to: "jacobbill155@yahoo.com" }
        const variables = {
            "reply_to": "jacobbill155@yahoo.com",
            "from_name": mail.email,
            "to_name": "Scribblers App",
            "message_html": mail.feedback
         }
        
        window.emailjs.send(
            "default_service", templateId,
            variables
        ).then(res => {
            setErrorMessage('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => {
                setErrorMessage("An error occured. Please try again! "+err)
                console.log("Error",err)
        })
    }

    const handleCloseClick = () => {
        setErrorMessage('')
    }

    return (
        <>
            <div className="About_page-Middle3" id="mail">
                <div className="About_page-title1">
                    <p>Write To Us:</p>
                </div>
                <div className="About_page-border">
                    <div className="About_page-inside">

                        <div className="ui icon input" style={{ marginBottom: "10px" }}>
                            <input type="text" name="email" value={setMail.email} placeholder="Email..." onChange={handleChange}></input>
                            <i class="mail square icon"></i>
                        </div><br></br>

                        <div className="ui icon input" style={{ marginBottom: "10px" }}>
                            <input name="subject" value={setMail.subject} type="text" placeholder="Subject..." onChange={handleChange}></input>
                        </div><br></br>

                        <Form className="About_page-textarea" style={{ marginLeft: "-17px" }}>
                            <TextArea name="feedback" value={setMail.feedback} placeholder='message...' onChange={handleChange} />
                        </Form><br></br>

                        <div className="About_page-button">
                            <button type="submit" onClick={handleClick}>Submit</button></div>
                        <br></br><br></br>
                    </div>
                </div>

            </div>
            <Transition visible={errorMessage != ''} animation='scale' duration={200}>
                <Segment
                    color="orange"
                    style={{
                        width: "35%",
                        height: "70px",
                        margin: "-100px auto 0px auto"
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
        </>


    )
}
export default Middle3
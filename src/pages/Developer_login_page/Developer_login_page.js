import React from 'react'
import Developer_home_header from '../../components/Header/Developer_home_header/Developer_home_header'
import "./Developer_style.css"
import Developer_footer from '../../components/Footer/Developer_footer/Developer_footer'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import vForm from '../../misc/ValidateForm'
import { Select, Segment, Icon, Transition } from 'semantic-ui-react'

function Developer_login_page(props) {
    //holds error messages to be displayed
    var [errorMessage, setErrorMessage] = useState('')
    //holds the data in the api
    const [cookies, setCookie, removeCookie] = useCookies(['dev'])
    //holds the form data
    const [devLoginData, setdevLoginData] = useState({
        email: '',
        password: ''
    })

    const config = {
        email: {
            required: true,
            validators: [
                value => ({
                    type: "email",
                    errorMsg: " Invalid email."
                })
            ]
        },
        password: {
            required: false,
        }
    }

    useEffect(() => {
        setCookie("dev", {}, { path: '/' })
    }, [])

    //runs when the value in a form field cahnges
    const handleChange = (event) => {
        const { name, value } = event.target

        setdevLoginData({
            email: (name === "email") ? value : devLoginData.email,
            password: (name === "password") ? value : devLoginData.password
        })
    }

    //to close error message
    const handleCloseClick = () => {
        setErrorMessage('')
    }
    
    //runs when the button is clicked
    const handleClick = async () => {
        const send_data = {
            email: devLoginData.email.trim(),
            password: devLoginData.password.trim()
        }
        //validate login data
        var check = vForm.validate(config, send_data)
        if(check.valid){
        //authenticate the user
        const response = await fetch('/validate/devlogin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(send_data)
        })

        if (response.ok) {
            response.json().then(data => {
                if (data.password == true) {
                    props.updateDev(data.info)
                    props.updateLog(true)
                    setCookie("dev", { loggedIn: true, developer: data.info }, { path: '/' })
                    props.history.push('/developer/dashboard/schools')

                }else{
                    setErrorMessage("Data you've entered can't be found on our database.")
                }
            })
        }else{
            setErrorMessage("An error occurred!")
        }
    }else{
        setErrorMessage(check.msg)
    }
    }

    return (

        <React.Fragment >
            <div className="Developer_login_page-body" >
                <Developer_home_header />
                <div className="Developer_login_page-outerBodyDiv" >
                    <div className="Developer_login_page-innerBodyDiv" >
                        <form >
                            <input type="email"
                                name="email"
                                placeholder="email"
                                onChange={handleChange}
                            /> <br />
                            <input type="password"
                                name="password"
                                placeholder="password"
                                onChange={handleChange}
                            /> <br />
                            <button type="button" onClick={handleClick} > enter </button>
                        </form >
                    </div> </div>
                    <Transition visible={errorMessage != ''} animation='scale' duration={200}>
                    <Segment
                        color="orange"
                        style={{
                            width: "35%",
                            margin: "0px auto 0px auto"
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
            <Developer_footer />
        </React.Fragment>
    )
}

const mapState2Props = (state) => {
    return {
        developer: state.developer,
        loggedIn: state.loggedIn
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        updateDev: (dev) => { dispatch({ type: 'UPDATE_DEV', value: dev }) },
        updateLog: (log) => { dispatch({ type: 'UPDATE_LOG', value: log }) }

    }

}

export default connect(mapState2Props, mapDispatch2Props)(Developer_login_page);
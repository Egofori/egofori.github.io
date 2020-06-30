import React from 'react'
import Home_header from '../../components/Header/Home_header/Home_header'
import "./Login_style.css"
import Common_footer from '../../components/Footer/Common_footer/Common_footer'
import { Select, Segment, Icon, Transition } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import vForm from '../../misc/ValidateForm'
import { useCookies } from 'react-cookie';

function Login_page(props) {
    //holds error messages to be displayed
    var [errorMessage, setErrorMessage] = useState('')
    //holds the list of schools to be displayed in the select element
    var schools = []
    //holds list of schools from the api
    const [schoolsList, setSchoolsList] = useState([])
    //holds the login data from the login input fields 
    const [loginData, setLoginData] = useState({
        school: '',
        email: '',
        password: ''
    })
    //holds the cookies for this site
    const [cookies, setCookie, removeCookie] = useCookies(['info'])
    //used to define how the input data should look like
    const config = {
        school: {
            required: true,
            validators: [
                value => ({
                    type: "text",
                    errorMsg: "Choose a school. "
                })
            ]
        },
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
        //gets the lists of schools from the api
        axios.get('/school').then(({ data }) => {
            setSchoolsList(data)
        })
        removeCookie("info")
    }, [])

    //push the schools into the schools array
    for (var i = 0; i < schoolsList.length; i++) {
        schools.push(
            {
                key: schoolsList[i].id_school,
                value: schoolsList[i].name,
                text: schoolsList[i].name
            })
    }

    //triggered when there is any change in the input fields
    const handleChange = (event) => {
        const { name, value } = event.target
        //update the loginData object
        setLoginData({
            ...loginData,
            email: (name === "email") ? value : loginData.email,
            password: (name === "password") ? value : loginData.password
        })

    }

    const handleSelectChange = (event, { name, value }) => {
        //update the school field of the loginData object
        setLoginData({
            ...loginData,
            school: (name === "school") ? value : loginData.school,
        })

    }
    //it's called when the enter is pressed at the last field
    const handleKeyPress = (event) => {
        if (event.which == 13) {
            handleClick()
        }
    }

    //called when the button on the page is clicked
    const handleClick = async () => {
        setLoginData({ ...loginData, email: loginData.email.trim() })
        //called the validate function of the ValidateForm class
        var check = vForm.validate(config, loginData)
        //check all the values for validity to be sent to the api
        if (check.valid) {
            //api call to authenticate the user
            const response = await fetch('/validate/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            })
            if (response.ok) {
                response.json().then(data => {
                    if (data.password == true) {
                        const school = schoolsList.filter((school) => school.id_school == data.info.id_school)
                        // props.updateStaff(data.info)
                        // props.updateSchool(school[0])
                        // props.updateLog(true)
                        setCookie("info", { staff: data.info, school: school[0], loggedIn: data.password, student: {}}, { path: "/" })
                        if (data.info.hasOwnProperty("id_tutor"))
                            props.history.push('/dashboard/report_folders')
                        else if (data.info.hasOwnProperty("id_admin"))
                            props.history.push('/admin/dashboard/levels')

                    }
                    else if (data.password == false) {
                        setErrorMessage("Please the passsword you entered is incorrect.\nIf you have forgotten it please contact your administrator.\nThank you.")

                        if (data.email == false) {
                            setErrorMessage("It looks like the email you entered is incorrect. Recheck and try again.")
                            if (data.school == false) {
                                setErrorMessage("Your email and password are incorrect.")
                            }
                        }

                    }
                })
            }
            else {
                setErrorMessage("Please check your internet connection.")
            }
        }
        else {
            setErrorMessage(check.msg)
        }


    }

    const handleCloseClick = () => {
        setErrorMessage('')
    }

    return (
        <React.Fragment>
            <div className="Login_page-body">
                <Home_header />
                <div className="Login_page-outerBodyDiv">
                    <div className="Login_page-innerBodyDiv">
                        <form >
                            <Select
                                className="select"
                                name="school"
                                placeholder='choose your school'
                                options={schools}
                                onChange={handleSelectChange}
                            />
                            <br />
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                value={loginData.email}
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                value={loginData.password}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                            />
                            <br />
                            <button type="button" onClick={handleClick}>enter</button>
                        </form>
                    </div>
                </div>
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
            <Common_footer />

        </React.Fragment>
    )
}


const mapState2Props = (state) => {
    return {
        staff: state.staff,
        school: state.school
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        updateStaff: (staff) => { dispatch({ type: 'UPDATE_STAFF', value: staff }) },
        updateSchool: (school) => { dispatch({ type: 'UPDATE_SCH', value: school }) },
        updateLog: (log) => { dispatch({ type: 'UPDATE_LOG', value: log }) }
    }

}

export default connect(mapState2Props, mapDispatch2Props)(Login_page);


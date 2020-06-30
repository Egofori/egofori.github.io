import React from 'react'
import './Schools.css'
import Developer_header from '../../components/Header/Developer_header/Developer_header'
import Common_footer from "../../components/Footer/Developer_footer/Developer_footer"
import { useState, useEffect } from 'react'
import axios from 'axios'
import School from './School'
import { Link, Redirect } from 'react-router-dom'
import { Popup, Modal, Input, Button } from 'semantic-ui-react'
import { useCookies } from 'react-cookie';

function List_schools(props) {
    //holds the list of schools
    const [schoolList, setSchoolList] = useState([])

    //holds the cookies for this site
    const [cookies, setCookie, removeCookie] = useCookies(['dev'])

    useEffect(() => {
        axios.get('/school')
            .then(res => {
                setSchoolList(res.data)
            })
            // .catch(err => {
            //     console.log(err)
            // })
    }, [])

    const handleAddBtnClick = () => {
        props.history.push(`/developer/dashboard/schools/edit/school`)
    }

    if (!cookies.hasOwnProperty("dev")) {
        return (<Redirect to={{ pathname: "/developer/login" }} />)
    }
    else {
        if (cookies.dev.loggedIn == true) {
            return (
                <React.Fragment>
                    <div className="List_schools-body">
                        <Developer_header {...props} title="List of Schools" />
                        <div className="List_schools-all">
                            {schoolList.map((school) =>
                                <School
                                    {...props}
                                    key={school.id_school}
                                    id={school.id_school}
                                    name={school.name}
                                    link={`/developer/dashboard/schools/${school.id_school}/edit/school`}
                                />
                            )}

                            <div className="List_schools-button-image">
                                <Popup
                                    trigger={<button style={{ cursor: "pointer" }} onClick={handleAddBtnClick}></button>}
                                    content="Add a new School"
                                />
                            </div>
                        </div>
                    </div>
                    <Common_footer />
                </React.Fragment>
            )
        } else {
            return (<Redirect to={{ pathname: "/developer/login" }} />)
        }
    }
}
export default (List_schools)

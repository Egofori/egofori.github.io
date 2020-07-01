import React from 'react'
import './List_classes_style.css'
import Classes from './Classes'
// import Common_header from "../../components/Header/Common_header/Common_header"
import Common_footer from "../../components/Footer/Common_footer/Common_footer"
import Admin_header from "../../components/Header/Admin_header/Admin_header"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Popup, Modal, Input, Button } from 'semantic-ui-react'
import { useCookies } from 'react-cookie'
import { Link, Redirect } from 'react-router-dom'


function List_classes(props) {
    //holds the cookies
    const [cookies, setCookie] = useCookies(['info'])
    //holds the list of tutors
    const [schoolTutorList, setSchoolTutorList] = useState([])


    useEffect(() => {
        axios.get('/school_tutor/' + cookies.info.staff.id_school)
            .then(res => {
                setSchoolTutorList(res.data)
            })
            .catch(err => {
            })
    }, [])



    const handleAddBtnClick = () => {
        props.history.push(`/admin/dashboard/levels/edit/tutor`)
    }


    // if (!props.staff.hasOwnProperty("id_tutor")) {
    //     setTimeout(() => { props.history.push("/") }, 5000)
    //     return (<p>loading...</p>)
    // }
    // else {
    if (!cookies.hasOwnProperty("info")) {
        return (<Redirect to={{ pathname: "/" }} />)
    }
    else {
        if (cookies.info.loggedIn == true) {

            return (<React.Fragment >
                <div className="List_classes-body" >
                    <Admin_header title="Classes" {...props}/>
                    <div className="List_classes-all" > {
                        schoolTutorList.map((schoolTutor) =>
                            <Classes {...props}
                                key={schoolTutor.id_tutor}
                                id={schoolTutor.id_tutor}
                                link={`/admin/dashboard/levels/${schoolTutor.id_tutor}/edit/tutor`}
                                level={schoolTutor.level}
                            />
                        )
                    }
                        <div className="List_classes-button-image" >
                            <Popup trigger={<button style={{ cursor: "pointer" }} onClick={handleAddBtnClick} > </button>}
                                content="Add a new class" />
                        </div>
                    </div>

                </div> <Common_footer />
            </React.Fragment>
            )
        } else {
            return (<Redirect to={{ pathname: "/" }} />)
        }
    }
}
// }
export default (List_classes)
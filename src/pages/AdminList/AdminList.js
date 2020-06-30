/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import './style.css'
import AdminDetails from './AdminDetails'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Popup } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import Developer_header from '../../components/Header/Developer_header/Developer_header'
import Common_footer from "../../components/Footer/Developer_footer/Developer_footer"
import { useCookies } from 'react-cookie';

function AdminList(props) {
    //holds the list of admins
    const [AdminList, setAdminList] = useState([])
    //holds the cookies for this site
    const [cookies, setCookie, removeCookie] = useCookies(['dev'])

    useEffect(() => {
        if (props.match.params.school_id) {
            axios.get('/school_admin/' + props.match.params.school_id).then(res => {
                setAdminList(res.data)

            })
                .catch(err => {
                })

        }
    }, [])

    const handleAddBtnClick = () => {
        // eslint-disable-next-line no-template-curly-in-string
        props.history.push(`/developer/dashboard/schools/${props.match.params.school_id}/admins/edit/admin`)
    }


    if (!cookies.hasOwnProperty("dev")) {
        return (<Redirect to={{ pathname: "/developer/login" }} />)
    }
    else {
        if (cookies.dev.loggedIn == true) {
            return (
                <React.Fragment>
                    <div className="List_reports-body">
                        <Developer_header {...props} title="List of Admins" />
                        <div className="List_Admin-all">
                            {AdminList.map((admin) =>
                                <AdminDetails
                                    {...props}
                                    key={admin.id_admin}
                                    id={admin.id_admin}
                                    name={admin.first_name}
                                    link={`/developer/dashboard/schools/${admin.id_school}/admins/${admin.id_admin}/edit/admin`}
                                />
                            )}
                            <div className="List_admin-button-image">
                                <Popup
                                    trigger={<button style={{ cursor: "pointer" }} onClick={handleAddBtnClick}></button>}
                                    content="Add a new admin"
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
export default (AdminList)
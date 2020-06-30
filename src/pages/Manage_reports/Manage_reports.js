import React from 'react'
import Common_header from '../../components/Header/Common_header/Common_header'
import Common_footer from '../../components/Footer/Common_footer/Common_footer'
import Report_folder from './Report_folder'
import './Manage_reports_style.css'
import { Popup, Modal, Input, Button } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'


function Manage_reports(props) {
    //tells if the modal has appeared
    const [open, setOpen] = useState(false)
    //tells if it opened for editting
    const [edit, setEdit] = useState(false)
    //holds id of folder you want to edit
    const [idFolder, setIdFolder] = useState(null)
    //holds the cookies
    const [cookies, setCookie] = useCookies(['info'])
    //holds the data of the folder in focus
    const [folderDetails, setFolderDetails] = useState({
        folder_name: '',
        id_tutor: null
    })
    //holds the list of folders from the api
    const [foldersList, setFoldersList] = useState([])
    //used to set the dynamic message that appears on the modal
    const [popupMsg, setPopupMsg] = useState("")

    useEffect(() => {
        //get the list of folders for this tutor
        axios.get('/tutor_reports_folder/' + cookies.info.staff.id_tutor).then(({ data }) => {
            setFoldersList(data)
        })

        setFolderDetails({ ...folderDetails, id_tutor: cookies.info.staff.id_tutor })

    }, [])
    // runs when the add button is clicked
    const handleAddBtnClick = () => {
        setPopupMsg(<p>Enter the name of your new folder</p>)
        setOpen(true)
    }
    //runs when the edit option of any folder is clicked 
    const handleEditClick = (id_folder) => {
        setEdit(true)
        setIdFolder(id_folder)
        //get the name of the folder with its id_folder
        axios.get('/reports_folder/' + id_folder).then(({ data }) => {
            setFolderDetails({
                ...folderDetails,
                folder_name: data.folder_name
            })
            //open the modal
            setOpen(true)
        })
    }

    //runs when the modal is to be closed
    const close = () => {
        setOpen(false)
        setEdit(false)
        setFolderDetails({
            ...folderDetails,
            folder_name: ''
        })
    }

    //runs when the done button on the modal is clicked
    const save = async () => {
        //helps check if you are not setting the same folder names
        var notSameName = true
        setFolderDetails({ ...folderDetails, folder_name: folderDetails.folder_name.trim() })
        //using the forEach function to check for similarity in name
        foldersList.forEach((folder) => {
            if (folder.folder_name == folderDetails.folder_name) {
                notSameName = false
            }
        })
        //if not the same name
        if (notSameName) {
            if (!(folderDetails.folder_name == '')) {
                //check if its for editting or not
                if (edit) {
                    //update the folder details on the api
                    const response = await fetch('/reports_folder/' + idFolder, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(folderDetails)
                    })
                    if (response.ok) {
                        setOpen(false)
                        setFolderDetails({
                            ...folderDetails,
                            folder_name: ''
                        })
                        window.location.reload(false)
                    } else {
                        setPopupMsg(<p>Please try again!</p>)
                    }
                } else {
                    //add new folder to the api
                    const response = await fetch('/reports_folder', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(folderDetails)
                    })
                    if (response.ok) {
                        setOpen(false)
                        setFolderDetails({
                            ...folderDetails,
                            folder_name: ''
                        })
                        window.location.reload(false)
                    } else {
                        setPopupMsg(<p>Please try again!</p>)
                    }
                }
            }
            else {
                setPopupMsg(<p style={{ color: "tomato" }}>Please enter a name!</p>)
            }
        }
        else {
            setPopupMsg(<p style={{ color: "tomato" }}>"{folderDetails.folder_name}" already exists. Please enter another name!</p>)
        }
    }

    //runs for each letter typed
    const handleChange = (event) => {
        const value = event.target.value
        setFolderDetails({ ...folderDetails, folder_name: value })
    }

    // if (!cookies.info.staff.hasOwnProperty("id_tutor")) {
    //     return (<p>loading...</p>)
    // }
    // else {
    if (!cookies.hasOwnProperty("info")) {
        return (<Redirect to={{ pathname: "/" }} />)
    }
    else {
        if (cookies.info.loggedIn == true) {
            return (
                <React.Fragment>
                    <div className="Manage_reports-body">
                        <Common_header {...props} title="List of report folders" />
                        <div className="Manage_reports-all">
                            {foldersList.map((folder) =>

                                <Report_folder
                                    {...props}
                                    key={folder.id_reports_folder}
                                    id={folder.id_reports_folder}
                                    style={{ cursor: "pointer" }}
                                    name={folder.folder_name}
                                    link={`/dashboard/report_folders/${folder.id_reports_folder}/reports`}
                                    edit={handleEditClick}

                                />

                            )}

                            <div className="Manage_reports-add_folder">
                                <Popup
                                    trigger={<button style={{ cursor: "pointer" }} onClick={handleAddBtnClick}></button>}
                                    content="Add a new report folder"
                                />
                            </div>
                        </div>

                    </div>

                    <Modal dimmer="blurring" open={open} onClose={close} style={{ width: "30%" }}>
                        <Modal.Header>{popupMsg}</Modal.Header>
                        <Modal.Content>
                            <Input
                                type="text"
                                style={{ width: "100%" }}
                                value={folderDetails.folder_name}
                                onChange={handleChange} />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={close}>
                                cancel
                    </Button>
                            <Button
                                positive
                                icon='checkmark'
                                labelPosition='right'
                                content="done"
                                onClick={save}
                            />
                        </Modal.Actions>
                    </Modal>
                    <Common_footer />
                </React.Fragment>
            )
        }
        else {
            return (<Redirect to={{ pathname: "/" }} />)

        }
    }
}


const mapState2Props = (state) => {
    return {
        staff: state.staff,
        school: state.school,
        loggedIn: state.loggedIn
    }
}

const mapDispatch2Props = (dispatch) => {
    return {
        updateStaff: (staff) => { dispatch({ type: 'UPDATE_STAFF', value: staff }) },
        updateSchool: (school) => { dispatch({ type: 'UPDATE_SCH', value: school }) },
        updateLog: (log) => { dispatch({ type: 'UPDATE_LOG', value: log }) }
    }

}

export default connect(mapState2Props, mapDispatch2Props)(Manage_reports)
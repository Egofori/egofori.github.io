import React, { useState, useEffect } from "react";
import profile_image from "../../images/profile_image.png";
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Popup, Modal,Icon, Input, Button, Transition, Segment } from 'semantic-ui-react'
import './styles.css'

export default function Body(props) {
  //holds message
  var [errorMessage, setErrorMessage] = useState('')
  //tells whether the modal should show 
  const [open, setOpen] = useState(false)
  const [cookies, setCookie] = useCookies(['info'])
  //holds data for the form
  const [formData, setFormData] = useState({
    id_school:'',
    title: '',
    first_name: '',
    last_name: '',
    level: '',
    password: '',
    email: '',
    phone: ''
  })
  //holds image path
  const [imagePath, setImagePath] = useState(profile_image)
  //holds image to be sent to the api
  const [image, setImage] = useState({})

  useEffect(() => {
    if (cookies.hasOwnProperty("info")) {
      //update formData with that found in the cookies
      setFormData({
        ...formData,
        id_school: cookies.info.staff.id_school,
        title: cookies.info.staff.title,
        first_name: cookies.info.staff.first_name,
        last_name: cookies.info.staff.last_name,
        level: cookies.info.staff.level,
        password: cookies.info.staff.password,
        email: cookies.info.staff.email,
        phone: cookies.info.staff.phone
      })
      //check if the image exists
      axios.get(`/images/exists/${cookies.info.staff.email}.jpg`).then(({ data }) => {
        const path = JSON.parse(data) === true ? `/images/${cookies.info.staff.email}.jpg?dummy=${Math.round(Math.random()*1000)}` : profile_image
        setImagePath(path)
      })
    }

  }, [])

  //runs when the save button is clicked
  const handleSaveClick = async () => {
    //update the data on the api
    const response = await fetch('/tutor/' + cookies.info.staff.id_tutor, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      //update the cookies
      response.json().then(data => {
        setCookie("info", { staff: data, school: cookies.info.school, loggedIn: cookies.info.loggedIn, student: cookies.info.student}, { path: "/" })

      })
      //go back when saved
      props.history.goBack()

    }
  }
  
  //called to delete the current image of the user on the api
  const reset = async () => {
    //check if image exists on the api
    axios.get(`/images/exists/${cookies.info.staff.email}.jpg`).then(({ data }) => {
      const path = JSON.parse(data) === true ? `/images/${cookies.info.staff.email}.jpg` : profile_image
      setImagePath(path)

    })

    if (imagePath !== profile_image) {
      //delete the image on the api
      const response = await fetch(`/images/${cookies.info.staff.email}.jpg`, {
        method: "DELETE",
      })
      if (response.ok) {
        //close the modal
        setOpen(false)
        window.location.reload(false)
      }
    } else {
      setOpen(false)
    }

  }


  const handleChange = (event) => {
    const { name, value } = event.target
    //update the formData
    setFormData({
      ...formData,
      title: (name === "title") ? value : formData.title,
      first_name: (name === "firstName") ? value : formData.first_name,
      last_name: (name === "lastName") ? value : formData.last_name,
      age: (name === "age") ? value : formData.age,
      level: (name === "level") ? value : formData.level,
      email: (name === "email") ? value : formData.email,
      phone: (name === "phone") ? value : formData.phone,
      password: (name === "password") ? value : formData.password
    })

  }

  //called to close the modal
  const close = () => {
    setOpen(false)
  }

  const handleCloseClick = () => {
    setErrorMessage('')
}

  //called when a new image is chosen
  const handleFileChange = (event) => {
    //update the image variable
    setImage(event.target.files[0])
  }

  //runs when the done button is clicked
  const save = async (event) => {
    event.preventDefault()
    const fd = new FormData()
    fd.append("file", image)
    //save the image on the api with this call
    axios.post(`/images/${formData.email}.jpg`, fd, { 
    }).then(res => { // then print response status
        if (res.status === 200) {
          setOpen(false)
          //reload the page
          window.location.reload(false)
        }else{
          setErrorMessage("Error occurred!")
        }
      })
  }

  return (
    <div className="profile-body">
      <div className="user-profile-div" onClick={() => { setOpen(true) }}>
        <div className='inner-user-profile-div'>
          <img
            src={imagePath}
            alt="profile_image"
          />
        </div>
      </div>
      <div className="form-div">
        <form>
          <table border="1" bordercolor="black" cellPadding="2" cellSpacing="0">
            <tbody>
              <tr>
                <td className='labels'>Title:</td>
                <td>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </td>
              </tr><tr>
                <td className='labels'>First name:</td>
                <td>
                  <input type="text" name="firstName" value={formData.first_name} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td className='labels'>Last name:</td>
                <td>
                  <input type="text" name="lastName" value={formData.last_name} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td className='labels'>Email:</td>
                <td>
                  <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td className='labels'>Phone:</td>
                <td>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td className='labels'>Level:</td>
                <td>
                  <input type="text" name="level" value={formData.level} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td className='labels'>Password:</td>
                <td>
                  <input type="text" name="password" value={formData.password} onChange={handleChange} />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <input type="button" value="Save" onClick={handleSaveClick} />
        </form>
      </div>

      <Modal dimmer="blurring" open={open} style={{ width: "30%" }}>
        <Modal.Header>Edit photo</Modal.Header>
        <Modal.Content>
          <img
            src={(image.__proto__.constructor).toString().indexOf("File") !== -1 ? URL.createObjectURL(image) : imagePath}
            alt="profile_image"
            style={{
              height: "100px",
              textAlign: "center"
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <input
            type="file"
            name="image"
            accept=".jpg"
            style={{
              display: "block"
            }}
            onChange={handleFileChange} />
          <Button color='blue' onClick={reset}>
            reset
          </Button>
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


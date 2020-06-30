import React, { useState, useEffect } from "react";
import profile_image from "../../images/profile_image.png";
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Popup, Modal, Input, Button } from 'semantic-ui-react'


// import './styles.css'

export default function Body(props) {
  //tells whether the modal is open
  const [open, setOpen] = useState(false)
  //holds the cookies
  const [cookies, setCookie] = useCookies(['dev'])
  //holds the data in the form
  const [formData, setFormData] = useState({
    title: '',
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    phone: ''
  })

  //holds the image path
  const [imagePath, setImagePath] = useState(profile_image)
  //holds the chosen inage
  const [image, setImage] = useState({})

  useEffect(() => {
    if (cookies.hasOwnProperty("dev")) {
      setFormData({
        ...formData,
        first_name: cookies.dev.developer.first_name,
        last_name: cookies.dev.developer.last_name,
        password: cookies.dev.developer.password,
        email: cookies.dev.developer.email,
        phone: cookies.dev.developer.phone
      })

      //check if image exists
      axios.get(`/images/exists/${cookies.dev.developer.email}.jpg`).then(({ data }) => {
        const path = JSON.parse(data) === true ? `/images/${cookies.dev.developer.email}.jpg?dummy=${Math.round(Math.random()*1000)}` : profile_image
        setImagePath(path)

      })
    }

  }, [])

  //runs when the save button is clicked
  const handleSaveClick = async () => {
    //update info on api
    const response = await fetch('/designer/' + cookies.dev.developer.id_designer, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      response.json().then(data => {
        //update cooikes
        setCookie("dev",{loggedIn: cookies.dev.loggedIn, developer: data},{path: '/'})
        // setCookie("info", { staff: data, school: cookies.dev.developer.school, loggedIn: cookies.dev.developer.loggedIn, student: cookies.dev.developer.student}, { path: "/" })
      })
      props.history.goBack()
    }
  }

  //runs when the reset button is clicked
  const reset = async () => {
    //check if image exists
    axios.get(`/images/exists/${cookies.dev.developer.email}.jpg`).then(({ data }) => {
      const path = JSON.parse(data) === true ? `/images/${cookies.dev.developer.email}.jpg` : profile_image
      setImagePath(path)
    })
    if (imagePath !== profile_image) {
      //delete image on the api
      const response = await fetch(`/images/${cookies.dev.developer.email}.jpg`, {
        method: "DELETE",
      })
      if (response.ok) {
        setOpen(false)
        window.location.reload(false)
      }
    } else {
      setOpen(false)
    }
  }

  //runs when form value is changed
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      first_name: (name === "firstName") ? value : formData.first_name,
      last_name: (name === "lastName") ? value : formData.last_name,
      age: (name === "age") ? value : formData.age,
      email: (name === "email") ? value : formData.email,
      phone: (name === "phone") ? value : formData.phone,
      password: (name === "password") ? value : formData.password
    })

  }

  //runs when the modal is closed
  const close = () => {
    setOpen(false)
  }

  //runs when an image is chosen or changed
  const handleFileChange = (event) => {
    setImage(event.target.files[0])
  }

  //when the done button is clicked
  const save = async (event) => {

    event.preventDefault()
    const fd = new FormData()
    fd.append("file", image)
    //update image on the api
    axios.post(`/images/${formData.email}.jpg`, fd, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        if (res.status === 200) {
          setOpen(false)
          window.location.reload(false)
        }
      })

  }


  return (
    <div className="profile-body">
      <div className="user-profile-div">
        <div className='inner-user-profile-div' onClick={() => { setOpen(true) }}>
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
    </div>
  )
}


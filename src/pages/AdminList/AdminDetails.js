import React,{useState} from 'react'
import { Popup,Menu } from 'semantic-ui-react'
import profile_image from '../../images/profile_image.png'
import Developer_footer from '../../components/Footer/Developer_footer/Developer_footer'

export default function AdminDetails(props) {
   //set the active item for the options
   const [activeItem, setActiveItem] = useState('edit')
   //tells if the options menu is showing
   const [showOptions, setShowOptions] = useState(false)
   //runs when an admin is clicked on
  const handleAdminClick = () => {
    props.history.push(props.link)
}
  //runs when an item on options menu is clicked
  const handleItemClick = async (event, { name }) => {
    setActiveItem(name)
    if (name === 'edit') {
        //takes you to this link to edit its contents
        props.history.push(props.link)
    }
    else if (name === 'delete') {
        //delete the report with this call
        const response = await fetch('/admin/' + props.id, {
            method: "DELETE"
        })
        if (response.ok) {
            //refresh the page
            window.location.reload(false)
        }
    }
}
   //runs when the options icon is clicked
   const handleOptionsClick = (event) => {
    event.stopPropagation()
    setShowOptions(!showOptions)
}
  return (
    <div
      style={{
        cursor: "pointer",
        position: "relative",
        marginTop: "1%",
        marginBottom: "1%",
        marginLeft: "3%"
      }}
    >
      <div className="AdminBody" onClick={handleAdminClick}>
        <div className='AdminEllipsis'>
          <Popup
            trigger={
              <i className="ellipsis vertical icon" style={{ cursor: "pointer" }} onClick={handleOptionsClick}></i>
            }
            content="options"
          />
        </div>
        <div className='Report-Rectangle'>
          <img src={profile_image} alt='admin' />
          <p><strong> Name:</strong>{props.name}</p>
          <div className='ListReports'>
          </div>
        </div>
      </div>
      
      <Menu
        inverted
        floated
        vertical
        size="mini"
        style={{
          textAlign: "center",
          display: showOptions ? "block" : "none",
          position: "absolute",
          marginTop: "-120px",
          marginLeft: "150px",
          zIndex: "999"
        }}
      >
        <Menu.Item
          name='edit'
          active={activeItem === 'edit'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='delete'
          active={activeItem === 'delete'}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  )
}

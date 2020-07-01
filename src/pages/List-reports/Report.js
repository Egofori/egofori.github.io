import React, { useState } from 'react'
import Profile_image from '../../images/profile_image.png'
import { Menu, Popup } from 'semantic-ui-react'

function Report(props) {
    //set the active item for the options
    const [activeItem, setActiveItem] = useState('edit')
    //tells if the options menu is showing
    const [showOptions, setShowOptions] = useState(false)

    const handleItemClick = async (event, { name }) => {
        setActiveItem(name)
        if (name === 'edit') {
            //takes you to this link to edit its contents
            props.history.push(props.link)
        }
        else if (name === 'delete') {
            //delete the report with this call
            const response = await fetch('/report/' + props.id, {
                method: "DELETE"
            })
            if (response.ok) {
                //refresh the page
                window.location.reload(false)
            }
        }
    }

    //runs when the report is clicked
    const handleReportClick = () => {
        props.history.push(props.link)
    }

    //runs when the options icon is clicked
    const handleOptionsClick = (event) => {
        event.stopPropagation()
        setShowOptions(!showOptions)
    }

    return (
        <div
            style={{
                cursor:"pointer",
                position: "relative",
                marginTop: "1%",
                marginBottom: "1%",
                marginLeft: "3%"
            }}

        >
            <div className="Report-body" onClick={handleReportClick}>
                <div className="Report-ellipsis">
                    <Popup
                        trigger={
                            <i className="ellipsis vertical icon" style={{ cursor: "pointer" }} onClick={handleOptionsClick}></i>
                        }
                        content="options"
                    />
                </div>

                <div className="Report-rectangle-image">
                    <img src={Profile_image}></img>
                    <p><strong>Name: </strong>{props.name}</p>
                    <div className="list_reports-status">
                        <p><strong>Sex:</strong>{props.sex}</p>
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
                    marginLeft: "150px"
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
export default Report
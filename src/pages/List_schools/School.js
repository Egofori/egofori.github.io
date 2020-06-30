import React, { useState } from 'react'
import { Menu, Popup } from 'semantic-ui-react'

function School(props) {
    //set the active item for the options
    const [activeItem, setActiveItem] = useState('edit')
    //tells if the options menu is showing
    const [showOptions, setShowOptions] = useState(false)
     //runs when the report is clicked
     const handleSchoolClick = () => {
        props.history.push(props.link)
    }

    const handleItemClick = async (event, { name }) => {
        setActiveItem(name)
        if (name === 'edit') {
            //takes you to this link to edit its contents
            props.history.push(props.link)
        }
        else if (name === 'delete') {
            //delete the report with this call
            const response = await fetch('/school/' + props.id, {
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
                marginTop: "1px",
                marginBottom: "1%",
                marginLeft: "3%"
            }}>
            <div className="School-body" onClick={handleSchoolClick}>
                <div className="School-ellipsis">
                    <Popup
                        trigger={
                            <i className="ellipsis vertical icon" style={{ cursor: "pointer" }} onClick={handleOptionsClick}></i>
                        }
                        content="options"
                    />
                </div>
                <div className="Schools-rectangle-image">
                    <div className="list_schools-state">
                        <p><strong>{props.name}</strong></p>
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

export default School
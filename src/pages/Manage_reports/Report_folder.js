import React, { useState } from 'react'
import folder from '../../images/folder.png'
import { Popup, Menu } from 'semantic-ui-react'
import { useCookies } from 'react-cookie'

export default function Report_folder(props) {
    const [activeItem, setActiveItem] = useState('edit')
    const [showOptions, setShowOptions] = useState(false)

    const handleItemClick = async (event, { name }) => {
        setActiveItem(name)
        if (name === 'edit') {
            props.edit(props.id)
        }
        else if (name === 'delete') {
            const response = await fetch('/reports_folder/' + props.id, {
                method: "DELETE"
            })
            if (response.ok) {
                window.location.reload(false)
            }
        }
    }

    const handleOptionsClick = (event) => {
        event.stopPropagation()
        setShowOptions(!showOptions)
    }

    const handleFolderClick = () => {
        props.history.push(props.link)
    }

    return (
        <div
            style={{
                position: "relative",
                marginTop: "1%",
                marginBottom: "1%",
                marginLeft: "3%"

            }}>
            <div className="Report_folder-body" style={{ cursor: "pointer" }} onClick={handleFolderClick}>
                <div className="Report_folder-ellipsis" onClick={handleOptionsClick}>
                    <Popup
                        trigger={
                            <i className="ellipsis vertical icon" style={{ cursor: "pointer" }}></i>
                        }
                        content="options"
                    />

                </div>
                <img src={folder}></img>
                <p>{props.name}</p>
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
                    marginTop: "-90px",
                    marginLeft: "120px"
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

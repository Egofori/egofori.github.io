import React from 'react'
function Left_feature(props) {
    return (
        <div style={{ position: "relative", display: "flex" ,marginBottom:"20px"}}>
            <div className="Feature-left_icon">
                <img src={props.icon}></img>
            </div>
            <div className="Feature-left_wrapper">
                <h3><u>{props.title}</u></h3>
                <p>{props.content}</p>
            </div>
        </div>
    )
}

function Right_feature(props) {
    return (
        <div style={{ position: "relative", display: "flex",marginBottom:"20px" }}>
            <div className="Feature-right_wrapper">
                <h3><u>{props.title}</u></h3>
                <p>{props.content}</p>
            </div>
            <div className="Feature-right_icon">
                <img src={props.icon} alt="icon"></img>
            </div>
        </div>
    )
}
export { Right_feature, Left_feature }
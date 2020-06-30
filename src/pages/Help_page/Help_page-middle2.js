import React from 'react'


function Help_page_middle2(props){
    return (
        <div className = "help_page_middle2">
            <div className="help_page_middle2_icon"></div>
            <button onClick={()=>{props.history.push("/about/#mail")}}>Tell us your problem</button>

        </div>
    )

}
export default Help_page_middle2

import React from 'react'
import './Dashboard.css'
import Common_header from "../../components/Header/Common_header/Common_header"
import Common_footer from "../../components/Footer/Common_footer/Common_footer"



function Dashboard(){
    return(
        
        <React.Fragment>
            <Common_header {...props}/>
            <div className="manage_reports_links">
                <ul>
                    <li><a className="folders" href="#">Manage report folders</a></li><br></br><br></br>
                    <li><a className="templates"href="#">Manage report templates</a></li>
                </ul>
            </div>
            <div className="biglogo"></div>
          
            <Common_footer/>
        </React.Fragment>
    )
    }
export default Dashboard
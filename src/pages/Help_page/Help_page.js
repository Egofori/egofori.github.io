import React from 'react'
import './Help_page_style.css'
import Help_Header from '../../components/Header/Help_header/Help_header'
import Help_page_middle2 from './Help_page-middle2'
import About_footer from '../../components/Footer/About_footer/About_footer'
import Video_tutorial from './Video_tutorial'



function Help_page(props) {
    return (
        <React.Fragment>
            <Help_Header />
            <div className="Help-body-color">
                <div className="Help_section">

                    <div className="help-border1">
                        <div className="help-icon-question"></div>

                        <div className='left-column_help' >
                            <p className="help-title01">Here for you</p>
                            <p>We are in this together.</p>
                        </div>
                    </div>

                    <div className="help-border2">
                        <div className="help-icon-video"></div>
                        <div className='center-column_help'>
                            <p className="help-title02">Watch a tutorial</p>
                            <p> The tutorial below will walk you through all the steps you need to know to use this app more efficiently</p>
                        </div>
                    </div>

                    <div className="help-border3">
                        <div className="help-icon-message"></div>
                        <div className='right-column_help' >
                            <p className="help-title03">Send us a message</p>
                            <p>Having a problem? Just send us a message</p>
                        </div>
                    </div>
                </div>
            </div>
            <Video_tutorial/>
            <Help_page_middle2 {...props}/>
            <About_footer/>
        </React.Fragment>


    )
}

export default Help_page
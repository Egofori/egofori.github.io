import React from 'react'
import clip from '../../videos/How to use the Scribblers App as an Administrator or a Teacher.mp4'
import Poster from '../../images/videopage.png'
export default function Video_tutorial() {
    return (
        <div className="Video_body">
            <div className="Video_video">
                <video controls poster={Poster}>
                    <source src={clip} type='video/mp4' />
                    <source src={clip} type="video/ogg" />
                </video>
            </div>
            <div className="Video_text">
                <p>Getting Started</p>
                <p>
                    This easy tutorial teaches on how to use the SCRIBBLERS app from
                    logging in to creating a report for your little pupils. If you have
                    problems understanding anything just scroll down and hit the "Tell
                    us your problem" button to send us a message and we will get back to you.
                </p>
            </div>
        </div>
    )
}

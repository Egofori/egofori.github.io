import React from'react'
import About_header from '../../components/Header/About_header/About_header'
import About_footer from '../../components/Footer/About_footer/About_footer'
import Middle1 from './Middle1'
import Middle2 from './Middle2'
import Middle3 from './Middle3'
import './About_style.css'

function About_page() {
    return (
      <React.Fragment>
        <div>
          <About_header/>
          <div>
            <Middle1/>
            <Middle2/>
            <Middle3/>
          </div>
        </div>
        <About_footer/>
      </React.Fragment>
    )
  }
  export default About_page
import React from 'react'
import Common_footer from '../Common_footer/Common_footer'

function About_footer(){
    return (
    <React.Fragment>
      <footer className="About_footer">
          

      <div className='footer-column' style={{marginLeft:"-5%"}}>
          <ul>
              <li><a href="">About us</a></li>
              <li><a href="">Contact us</a></li>
              <li><a href="">Terms &amp; conditions</a></li>
          </ul>
      </div>
      
      <div className='center-column footer-column' style={{paddingLeft:"10px"}}>
          <ul>
          <li><i className="facebook f tiny icon"></i><a href="">Facebook</a></li>
          <li><i class="twitter tiny icon"></i><a href="">Twitter</a></li>
          <li><i class="instagram tiny icon"></i><a href="">Instagram</a></li>
          </ul>
      </div>
      <div className='footer-column' style={{textAlign:"right"}}>
          <ul>
              <li><a href="">Developers</a></li>
              <li><a href="">Project Team</a></li>
              <li><a href="">Help Desk</a></li>
          </ul>
      </div>
      
      </footer>
    <Common_footer/>
    </React.Fragment>
    );
  }
export default About_footer;

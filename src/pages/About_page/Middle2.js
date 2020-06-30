import React from 'react'
import {Left_feature,Right_feature} from './Feature'
import Icon__popularity from '../../images/statistics.png'
import Icon__accessibility from '../../images/book.png'
import Icon__productivity from '../../images/analysis.png'
import Icon__security from '../../images/api.png'
import Icon__convenience from '../../images/responsive.png'



function Middle2(){
    return(
        <div className = "About_page-middle2">
            <div className="Middle2-wrapper">
            <Left_feature 
            icon={Icon__popularity}
            title="Popularity"
            content="We are the upcoming biggest thing."
            />
            <Right_feature 
            icon={Icon__accessibility}
            title="Accessibility"
            content="Can be accessible on any device."
            />
            <Left_feature 
            icon={Icon__productivity}
            title="Productivity"
            content="Reduces your work load and makes you better at your job."
            />
             <Right_feature 
            icon={Icon__security}
            title="Security"
            content="Hosted on a secure sever."
            />
            <Left_feature 
            icon={Icon__convenience}
            title="Convenience"
            content="Can be accessed anywhere at anytime."
            />
        </div>
        </div>
        )
        }
        export default Middle2
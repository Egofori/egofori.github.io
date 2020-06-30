import React from 'react'
import { Message, Button, Icon} from 'semantic-ui-react'

export default function Page_404(props) {
    return (
        <div style={{margin:"100px auto 0px auto",width:"30%"}}>
            <div style={{width:"100%",textAlign:"center"}}>
            <Icon size="huge" color="orange" name="warning sign"/>
            <Message
            warning
            size="big"
            header="404"
            content="Please recheck your URL and verify if you are at right page."
            />
            <Button color="blue" style={{float:"right"}} onClick={()=>{props.history.goBack()}}>Go back</Button>
            </div>
        </div>
    )
}

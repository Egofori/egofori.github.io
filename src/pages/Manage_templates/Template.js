import React from 'react'
import { Icon } from 'semantic-ui-react'

function Template(props) {
    return (
        <div className="Template-body">
            <div><Icon name="ellipsis vertical" /></div>
            <div>{props.name}</div>
        </div>
    )
}
export default Template
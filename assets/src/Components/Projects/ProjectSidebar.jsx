import React from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { Button, Tab } from 'semantic-ui-react';
import Highlight from "react-highlight.js";


const NodePane = ({projectId, userId, token, url, message}) => {
    return (
<Highlight style={{wordWrap: 'break-word', overflow: 'hidden'}} language="javascript">{
`const https = require('axios')

const data = {
    log_message: {
        level: "info",
        title: "KikoriTest",
        message: ${message}
    }
})

axios.post('https://kikori.space/api/v1/commit', data, {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ${token}'
    }
}).then((res) => {
    console.log(res)
}).catch((error) => {
    console.error(error)
})
`}
</Highlight>
    )
}
const CurlPane = ({projectId, token, url, message}) => {
    return (
        // <Tab.Pane style={{margin: 0}}>
            <Highlight language="bash">{
`let something = this.is.a.thing();
 something.reduce( (x, y) => x + y)
`}
            </Highlight>
        // </Tab.Pane>
    )   
}

const ProjectSidebar = ({project}) => {
    let { push } = useHistory();
    let token = localStorage.getItem('token')

    const panes = [
        { menuItem: 'curl', render: () =>  <CurlPane projectId={project.id} token={token}/>},
        { menuItem: 'nodejs', render: () => <NodePane projectId={project.id} token={token} />}
    ]
    return (
        project && 
            <div id="project-sidebar">
                <h1 style={{color: 'white'}}>{project.name}</h1>
                <h3 style={{color: 'grey'}}>{project.guid}</h3>

                <br/>
                <h4>Get Started</h4>
                <Tab menu={{ color: 'purple', inverted: true}} panes={panes} />
            </div>
    )
}

export default ProjectSidebar


// project name
// project id
// prject stats
// connection instructions
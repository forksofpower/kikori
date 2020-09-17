import React from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { Button, Tab, Container, Grid, Header } from 'semantic-ui-react';
import Highlight from "react-highlight.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from 'react';

const ElixirPane = ({projectId, userId, token, message}) => {
    return (<Highlight>{
`Application.ensure_all_started(:inets)

# We should start \`ssl\` application also,
# if we want to make secure requests:
Application.ensure_all_started(:ssl)

# Now we can logs!
{:ok, {{'HTTP/1.1', 200, 'OK'}, _headers, _body} =
  :httpc.request(:get, {'https://kikori.space/api/v1/commit', []}, [], [])
`}</Highlight>)
}

const NodePane = ({projectId, userId, token, url, message}) => {
    return (
<Highlight style={{wordWrap: 'break-word', overflow: 'hidden'}} language="javascript">{
`const https = require('axios')

const data = {
    log_message: {
        level: "info",
        title: "KikoriTest",
        message: "Testing from Node.js!"
    }
})

axios.post('https://kikori.space/api/v1/commit', data, {
    params: {
        project_id: ${projectId}
    },
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
`}</Highlight>
    )
}

const CurlPane = ({projectId, token, url, message}) => {
    return (
        // <Tab.Pane style={{margin: 0}}>
            <Highlight language="bash">
{`curl http://localhost:4000/api/v1/commit?project_id=${projectId} -X POST \\
-H 'Authorization: Bearer ${token}' \\
-H "Content-Type: application/json" \\
-d '{"log_message": { "level": "info", "message": "Testing from the command line!" }}'`}
            </Highlight>
        // </Tab.Pane>
    )   
}

const ProjectSidebar = ({project}) => {
    let { push } = useHistory();
    let token = localStorage.getItem('token')
    let [tokenCopied, setTokenCopied] = useState(false);

    const panes = [
        { menuItem: 'curl', render: () =>  <CurlPane projectId={project.id} token={token}/>},
        { menuItem: 'nodejs', render: () => <NodePane projectId={project.id} token={token} />},
        { menuItem: 'elixir', render: () => <ElixirPane projectId={project.id} token={token} />},
        { menuItem: 'java', render: () => null },
        { menuItem: 'scala', render: () => null },
        { menuItem: 'kotlin', render: () => null },
        { menuItem: 'ruby', render: () => null },
        { menuItem: 'go', render: () => null },
    ]
    return (
        project ? (
            <div id="project-sidebar">
                <label htmlFor="project-name">project:</label>
                <Header as="h2" inverted>{project.name}</Header>

                <label htmlFor="guid">id:</label>
                <Header as="h3" inverted>{project.guid}</Header>
                
                <br/>
                <span>
                    <CopyToClipboard 
                        text={token}
                        onCopy={() => setTokenCopied(true)}
                    >
                        <Button color="purple" style={{fontFamily: 'monospace'}}>{tokenCopied ? 'token copied!' : 'copy token'}</Button>
                    </CopyToClipboard>
                </span>
                <hr/>
                <h2>Get Started</h2>
                <Tab menu={{ inverted: true, id:"code-sample-menu", pointing: true}} panes={panes} />
            </div>
        ) : (
            <h1>Loading...</h1>
        )
    )
}

export default ProjectSidebar
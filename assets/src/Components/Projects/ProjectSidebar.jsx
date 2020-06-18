import React from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { Button, Tab, Container } from 'semantic-ui-react';
import Highlight from "react-highlight.js";


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
`}</Highlight>)}
const CurlPane = ({projectId, token, url, message}) => {
    return (
        // <Tab.Pane style={{margin: 0}}>
            <Highlight language="bash">
{`curl https://logs.timber.io/sources/38946/frames -X POST
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS50a
    W1iZXIuaW8vIiwiZXhwIjpudWxsLCJpYXQiOjE1OTIyOTE5OTksImlzcyI6Imh0dHBzOi8vYXBpLnRpbWJlci5pby
    9hcGlfa2V5cyIsInByb3ZpZGVyX2NsYWltcyI6eyJhcGlfa2V5X2lkIjo4Mjk5LCJ1c2VyX2lkIjoiYXBpX2tleXw4
    Mjk5In0sInN1YiI6ImFwaV9rZXl8ODI5OSJ9._P6KOdaXtTef0PuZ2wqX1LUs94vwB3mEcqxIxl7N8RQ'
-H "Content-Type: application/json"
-d '{"message": ""}`}
            </Highlight>
        // </Tab.Pane>
    )   
}

const ProjectSidebar = ({project}) => {
    let { push } = useHistory();
    let token = localStorage.getItem('token')

    const panes = [
        { menuItem: 'curl', render: () =>  <CurlPane projectId={project.id} token={token}/>},
        { menuItem: 'nodejs', render: () => <NodePane projectId={project.id} token={token} />},
        { menuItem: 'elixir', render: () => <ElixirPane projectId={project.id} token={token} />}
    ]
    return (
        project ? (
            <Container id="project-sidebar">
                <h1 style={{color: 'white'}}>{project.name}</h1>
                <h3 style={{color: 'grey'}}>{project.guid}</h3>

                <br/>
                <h4>Get Started</h4>
                <Tab menu={{ color: 'purple', inverted: true}} panes={panes} />
            </Container>
        ) : (
            <h1>Loading...</h1>
        )
    )
}

export default ProjectSidebar


// project name
// project id
// prject stats
// connection instructions
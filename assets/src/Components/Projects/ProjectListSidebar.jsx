import React from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react';

const ProjectListSidebar = ({projects, currentProject, setProject}) => {
    // console.log(currentProject)
    let { push } = useHistory();

    return (
        <div>{
            projects &&     
                projects.map(project =>
                    <Button basic key={project.id} onClick={() => push(`/projects/${project.id}`)}>
                        <h4>{project.name}</h4>
                    </Button>
                )
        }</div>
    )
}

export default ProjectListSidebar

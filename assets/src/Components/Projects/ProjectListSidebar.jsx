import React from 'react'
import { Link } from 'react-router-dom'

const ProjectListSidebar = ({projects, currentProject, setProject}) => {
    return (
        <div>{
            projects &&     
                projects.map(project => 
                    <Link
                        to={`/projects/${project.id}`}
                        style={
                            (currentProject.id === project.id)
                            ? { backgroundColor: 'red' }
                            : {}
                        }>
                        <h4>{project.name}</h4>
                    </Link>
                )
        }</div>
    )
}

export default ProjectListSidebar

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const ProjectListSidebar = ({projects, currentProject, setProject}) => {
    return (
        <div>{
            projects &&     
                projects.map(project => 
                    <NavLink 
                        to={`/projects/${project.id}`}
                        isActive={() => currentProject.id === project.id}
                        key={project.id}
                    >
                        <h4>{project.name}</h4>
                    </NavLink>
                )
        }</div>
    )
}

export default ProjectListSidebar

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const ProjectListSidebar = ({projects, currentProject, setProject}) => {
    // console.log(currentProject)
    return (
        <div>{
            projects &&     
                projects.map(project => 
                    <NavLink 
                        to={`/projects/${project.id}`}
                        isActive={() => currentProject.id === project.id}
                        activeStyle={{color: 'red'}}
                        key={project.id}
                        onClick={(e) => {
                            // e.preventDefault();
                            setProject(project)
                        }}
                    >
                        <h4>{project.name}</h4>
                    </NavLink>
                )
        }</div>
    )
}

export default ProjectListSidebar

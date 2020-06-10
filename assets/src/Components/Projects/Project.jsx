import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjectById, selectAllProjects, fetchProjects } from '../../store/projects.slice';
import { useState } from 'react';

import ProjectListSidebar from "../Projects/ProjectListSidebar";

const Project = () => {
    let dispatch = useDispatch();
    let [project, setProject] = useState({})
    let { id } = useParams();
    let projectId = Number(id);
    let projects = useSelector(selectAllProjects)

    useEffect(() => {
        // load projects
        dispatch(fetchProjects())
    }, [])

    useEffect(() => {
        // is this stupid?
        if (projects.length > 0) {
            setProject(projects.find(x => x.id === projectId))
        }
    }, [projects]);
    
    return (

        projects && 
        // currentProject &&
            <div>
                <ProjectListSidebar projects={projects} currentProject={project}/>
                {project.name}
                {/* <p>Single project page: {currentProject.name}</p> */}
            </div>
    )
}

export default Project

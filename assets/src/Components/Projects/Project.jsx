import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjectById, selectAllProjects, fetchProjects } from '../../store/projects.slice';
import { useState } from 'react';

import { Grid } from "semantic-ui-react";
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
        if (projects.length > 0) {
            setProject(projects.find(x => x.id === projectId))
        }
    }, [projects, id]);
    
    return (

        projects && 
        // currentProject &&
            <div>
                <Grid>
                    <Grid.Column floated='left' width={2}>
                        <ProjectListSidebar projects={projects} currentProject={project}/>
                    </Grid.Column>
                </Grid>   
            </div>
    )
}

export default Project

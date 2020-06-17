import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjectById, selectAllProjects, fetchProjects } from '../../store/projects.slice';
import { useState } from 'react';

import { Grid, Button } from "semantic-ui-react";
import ProjectListSidebar from "../Projects/ProjectListSidebar";
import LogMessage from '../Logs/LogMessage';
import { isEmpty } from '../../helpers';
import ProjectChannel from './ProjectChannel';

const Project = () => {
    let dispatch = useDispatch();
    let [project, setProject] = useState({})
    
    let { id } = useParams();
    let projects = useSelector(selectAllProjects)

    useEffect(() => {
        if (projects.length > 0 && id) {
            let projectId = Number(id)
            setProject(projects.find(x => x.id === projectId))
        }
    }, [projects, id])
    
    useEffect(() => {
        dispatch(fetchProjects())
    }, []);
    
    return (
        projects &&
        <div>
            <Grid>
                <Grid.Column floated='left' width={4}>
                <Link to="/projects">Projects</Link>
                </Grid.Column>
                <Grid.Column width={12}>
                    {isEmpty(project) ? ( 
						<h1>Loading...</h1>
					) : (
                        <ProjectChannel project={project}/>
					)}
                </Grid.Column>
            </Grid>   
        </div>
    )
}

export default Project;

// const colors = {
//     background: "#202230",
//     panels: "#3c4556",
//     borders: "#151922",
//     white: "#f0f3fd"
// }

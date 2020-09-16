import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProjects, fetchProjects, selectProjectById, fetchOneProject } from '../../store/projects.slice';
import { useState } from 'react';

import { Grid, Button, Dimmer, Loader } from "semantic-ui-react";
import ProjectSidebar from "../Projects/ProjectSidebar";
import LogMessage from '../Logs/LogMessage';
import { isEmpty } from '../../helpers';
import ProjectChannel from './ProjectChannel';
import NavBar from '../NavBar';

const Project = () => {
    let dispatch = useDispatch();
    // let [project, setProject] = useState({})
    let [loaded, setLoaded] = useState(false)
    let { id } = useParams();

    let project = useSelector((state) => {
        return selectProjectById(state, id)
    })

    
    let projects = useSelector(selectAllProjects)
    
    useEffect(() => {
        dispatch(fetchOneProject(id))
    }, [])

    useEffect(() => {
        if (project) {
            setLoaded(true)
        }
    }, [project, id])
    
    return !loaded ? ( 
            <Dimmer>
                <Loader />
            </Dimmer> 
        ): (
            <Grid>
                <Grid.Row style={{padding: 0, margin: 0}}>
                    <NavBar />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column floated='left' width={6} color="black">
                        <ProjectSidebar project={project} />
                    </Grid.Column>
                    <Grid.Column floated='right' width={10}>
                        {isEmpty(project) ? ( 
                            <h1>Loading...</h1>
                            ) : (
                                <ProjectChannel project={project}/>
                            )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
}

export default Project;

// const colors = {
//     background: "#202230",
//     panels: "#3c4556",
//     borders: "#151922",
//     white: "#f0f3fd"
// }

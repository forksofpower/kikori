import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProjects, fetchProjects, selectProjectById, fetchOneProject } from '../../store/projects.slice';
import { useState } from 'react';

import { Grid, Dimmer, Loader } from "semantic-ui-react";
import ProjectSidebar from "../Projects/ProjectSidebar";
// import LogMessage from '../Logs/LogMessage';
import { isEmpty } from '../../helpers';
import ProjectChannel from './ProjectChannel';
import NavBar from '../NavBar';

const Project = () => {
    let dispatch = useDispatch();
    let [loaded, setLoaded] = useState(false)
    let { id } = useParams();
    // let projects = useSelector(selectAllProjects)

    let project = useSelector((state) => {
        return selectProjectById(state, id)
    })
    
    
    useEffect(() => {
        dispatch(fetchOneProject(id))
    }, [])

    useEffect(() => {
        if (project) {
            console.log("project:", project)
            setLoaded(true)
        } else {
            if (id) {
                console.error("ERROR: NO PROJECT")
            }
        }
    }, [project, id])
    
    return (!loaded && !project) ? (
            <Dimmer>
                <Loader />
            </Dimmer> 
        ) : (
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

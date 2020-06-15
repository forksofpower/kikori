import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectProjectById, selectAllProjects, fetchProjects } from '../../store/projects.slice';
import { useState } from 'react';

import { Grid } from "semantic-ui-react";
import ProjectListSidebar from "../Projects/ProjectListSidebar";
import LogsContainer from '../Logs/LogsContainer';
import { isEmpty } from '../../helpers';

const Project = () => {
    let dispatch = useDispatch();
    let [project, setProject] = useState({})

    let { id } = useParams();
    let projects = useSelector(selectAllProjects)

    const [shouldRerender, setShouldRerender] = useState(false);

    useEffect(() => {
        // load projects
        dispatch(fetchProjects())
    }, [])

    useEffect(() => {
        if (projects.length > 0) {
            let projectId = Number(id);
            setProject(projects.find(x => x.id === projectId))
            console.log("Rendering...")
            // setShouldRerender(true)
        }
    }, [projects, id]);

    // useEffect(() => {
    //     // 
    // }, [project])
    
    return (

        projects && 
        // currentProject &&
            <div>
                <Grid>
                    <Grid.Column floated='left' width={4}>
                        <ProjectListSidebar 
                            projects={projects} 
                            currentProject={project}
                            setProject={setProject}
                        />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {isEmpty(project) 
                            ? <h1>Loading...</h1>
                            : <LogsContainer 
                                project={project} 
                                rerender={shouldRerender}
                            />
                        }
                    </Grid.Column>
                </Grid>   
            </div>
    )
}

export default Project

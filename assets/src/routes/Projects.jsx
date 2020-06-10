import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { 
    fetchProjects, 
    selectAllProjects, 
    selectProjectById,
    selectEntities
} from "../store/projects.slice";

import { setCurrentProject, selectCurrentProject, clearCurrentProject } from "../store/currentProject.slice";
import { isEmpty } from '../helpers';
import { useParams } from 'react-router-dom';

const Projects = () => {
    // let { id } = useParams();
    const dispatch = useDispatch();
    const projects = useSelector(selectAllProjects)

    useEffect(() => {
        // load projects into state
        dispatch(fetchProjects())
    }, [])

    return (
        projects.length > 0
        ? <div>
            {projects.map(project =>
                <h3 key={Math.random()}>{project.name}</h3>    
            )}

            <button onClick={() => dispatch(setCurrentProject(projects[0])) }>Set Current</button>
            <button onClick={() => dispatch(clearCurrentProject())}>Clear Current</button>
            {/* { !isEmpty(project) &&
                <h1>Current Project: {project.name}</h1>
            } */}
          </div>
        : 
        <h1>Loading...</h1>
    )
}

export default Projects

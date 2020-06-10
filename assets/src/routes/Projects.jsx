import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectProjects, getUserProjects } from "../services/project.slice";

const Projects = () => {
    const dispatch = useDispatch();
    const projects = useSelector(selectProjects)

    useEffect(() => {
        // load projects
        dispatch(getUserProjects())
    }, [])

    return (
        projects.isLoaded 
        ?   <h1>Loading...</h1>
        : <div>
            <h1>Projects!</h1>
        </div>
    )
}

export default Projects

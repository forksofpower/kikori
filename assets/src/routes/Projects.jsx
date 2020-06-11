import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { 
    fetchProjects, 
    selectAllProjects, 
    selectProjectById,
    selectEntities
} from "../store/projects.slice";

import { Grid, Button, Icon, Segment, Header, Container } from "semantic-ui-react";

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
        (projects.length < 0)
            ? projects.map(project => <h3 key={Math.random()}>{project.name}</h3> )
            : <ProjectsEmptyContainer />
    )
}

export default Projects
const ProjectsEmptyContainer = () => (
    <Container>

    <Grid centered>
    <Segment>
        <Header icon>
            <Icon name="pdf file outline" />
            You don't have any projects.
            <Button basic size="small" color="green"
                // onClick={() => dispatch(setCurrentProject(projects[0]))}
                >
                <Icon name="add circle" />
                New Project
            </Button>
        </Header>
        <Button primary>Add Projects</Button>
    </Segment>
    </Grid>
    </Container>
)

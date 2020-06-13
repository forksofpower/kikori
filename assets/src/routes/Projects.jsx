import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { 
    fetchProjects, 
    selectAllProjects, 
    selectProjectById,
    selectEntities,
    selectProjectsLoaded,
    deleteProject,
} from "../store/projects.slice";

import { Grid, Button, Icon, Segment, Header, Container, Card } from "semantic-ui-react";

import { setCurrentProject, selectCurrentProject, clearCurrentProject } from "../store/currentProject.slice";
import { isEmpty } from '../helpers';
import { useParams, useHistory } from 'react-router-dom';
import CreateProjectForm from '../Components/Projects/CreateProjectForm';
import { selectIsLoaded } from '../store/auth.slice';

const Projects = () => {
    // let { id } = useParams();
    const dispatch = useDispatch();

    const projects = useSelector(selectAllProjects)

    const projectsLoaded = useSelector(selectProjectsLoaded);

    useEffect(() => {
        // load projects into state
        dispatch(fetchProjects())
    }, [])
    

    return (
        <Container>
            {( projects.length > 0 && projectsLoaded)
                ? <ProjectsGridContainer projects={projects}/>
                : <ProjectsEmptyContainer />
            }
        </Container>
    )
}

export default Projects

const ProjectsGridContainer = ({projects}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
    <Card.Group centered>
        {projects && projects.map(project => (
            <Card key={project.id}>
                {console.log(project)}
                <Card.Content>
                    <Card.Header>{project.name}</Card.Header>
                    <Card.Meta>{project.guid?.slice(0, 23)}...</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <div className="ui two buttons">
                        <Button basic color="green" onClick={() => history.push(`/projects/${project.id}`)}>
                            View Logs
                        </Button>
                        <Button basic color='red' onClick={() => dispatch(deleteProject(project))}>
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        ))}
    </Card.Group>
    )
}
const ProjectsEmptyContainer = () => (
    <Container>
    <Grid centered>
    <Segment>
        <Header icon>
            <Icon name="pdf file outline" />
            You don't have any projects.
        </Header>
        <Button>
            New Project
        </Button>
    </Segment>
    </Grid>
    <CreateProjectForm />
    </Container>
)

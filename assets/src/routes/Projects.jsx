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
import NavBar from '../Components/NavBar';

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
        <>
            {(projectsLoaded)
                ? <ProjectsGridContainer projects={projects}/>
                : <h1>Loading...</h1>
            }
        </>
    )
}

export default Projects

const ProjectsGridContainer = ({projects}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    return <Grid style={{height: '100vh', backgroundColor: '#1b1c1d', overflowX: 'hidden', paddingBottom: '-1em'}}>
                <Grid.Row style={{ height: '13%'}}>
                    <NavBar/>
                </Grid.Row>
                <Grid.Row centered style={{height: '12%'}}>
                    <Header as="h1" color="purple" style={{padding: '20px'}}>Projects</Header>

                </Grid.Row>
                <Grid.Row style={{height: '75%'}}>
                    <Grid.Column centered vertical>
                        <Card.Group centered>
                            {projects && projects.map(project => (
                                <Card key={project.id}>
                                    <Card.Content>
                                        <Card.Header>{project.name}</Card.Header>
                                        <Card.Meta>{project.guid?.slice(0, 23)}...</Card.Meta>
                                    </Card.Content>
                                    <Card.Content>
                                        <div className="ui two buttons">
                                            <Button basic color="purple" onClick={() => history.push(`/projects/${project.id}`)}>
                                                View Logs
                                            </Button>
                                            <Button basic color='black' onClick={() => dispatch(deleteProject(project))}>
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                        <br/><br/>
                        <ProjectFormContainer />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
}
const ProjectFormContainer = () => (
    <Container>
    <Grid centered>
    <Segment inverted color="purple">
        <CreateProjectForm />
    </Segment>
    </Grid>
    </Container>
)

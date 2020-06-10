import { createSlice } from "@reduxjs/toolkit";

const URL = 'https://en33spkgpultt.x.pipedream.net/projects';
// const URL = 'http://localhost:4000/api/v1/projects'
export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        currentProject: {
            data: {},
            isLoaded: false
        },
        projects: {
            data: [],
            isLoaded: false
        },
    }, reducers: {
        addProject: (state, action) => {
            state.projects.data.push(action.payload)
        },
        removeProject: ({projects}, {payload}) => {
            projects.data = projects.data.filter(p => p.id !== payload.id)
        },
        setProjects: (state, action) => {
            state.projects.data = action.payload
        },
        projectsLoaded: (state, action) => {
            state.projects.isLoaded = action.payload || true
        }
    }
})

export const { 
    setProjects, 
    addProject, 
    projectsLoaded,
    removeProject
} = projectSlice.actions;

// thunks
export const getUserProjects = () => dispatch => {
    let token = localStorage.getItem('token');
    if (token) {
        fetch(URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(({data}) => {
            // if (data?.error) {
            //     console.log('something went wrong...')
            // } else {
            //     dispatch(setProjects(data.projects))
            //     dispatch(projectsLoaded())
            // }
        })
    } else {
        noTokenError('getUserProjects')
    }
}

export const createProject = (project) => dispatch => {
    let token = localStorage.getItem('token');
    if (token) {
        fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(({data}) => {
            if (data.error) {
                console.log('something went wrong')
            } else {
                dispatch(addProject(data.project))
            }
        })
    } else {
        noTokenError('createProject')
    }
}

export const deleteProject = (project) => dispatch => {
    let token = localStorage.getItem('token');
    if (token) {
        fetch(`${URL}/${project.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(({data}) => {
            if (data.error) {
                console.log('something went wrong')
            } else {
                dispatch(removeProject(project.id))
            }
        })
    } else {
        noTokenError('deleteProject')
    }
}

// selectors
export const selectProjects = state => state.projects;
export const selectCurrentProject = state => state.currentProject;

export default projectSlice.reducer;

function noTokenError(location='null') {
    console.error(`NO_TOKEN_ERROR::${location}`)
}
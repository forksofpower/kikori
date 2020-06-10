import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";


// const URL = 'https://en33spkgpultt.x.pipedream.net/projects';
const URL = 'http://localhost:4000/api/v1/projects'


export const projectEntity = new schema.Entity('projects');

const projectsAdapter = createEntityAdapter();

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        let token = localStorage.getItem('token');
        const data = await fetch(URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())

        const normalized = normalize(data.projects, [projectEntity])
        return normalized.entities
    }
);

export const projectSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({ loading: false}),
    reducers: {
        addProject: (state, action) => {
            state.projects.data.push(action.payload)
        },
        // removeProject: ({projects}, {payload}) => {
        //     projects.data = projects.data.filter(p => p.id !== payload.id)
        // },
        // setProjects: (state, action) => {
        //     state.projects.data = action.payload
        // },
        // projectsLoaded: (state, action) => {
        //     state.projects.isLoaded = action.payload || true
        // }
    }, extraReducers: {
        [fetchProjects.fulfilled]: (state, action) => {
            // insert projects into state
            projectsAdapter.upsertMany(state, action.payload.projects)
            if (!state.isLoaded) {
                state.isLoaded = true
            }
        }
    }
})

export const {
    selectAll: selectAllProjects,
    selectById: selectProjectById,
    selectIds: selectProjectIds,
    selectTotal: selectTotalProjects,
    selectEntities
} = projectsAdapter.getSelectors(state => state.projects)

export const { 
    setProjects, 
    addProject, 
    projectsLoaded,
    removeProject
} = projectSlice.actions;

// thunks
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
// export const selectProjectById = state => state.projects.entities[];

export default projectSlice.reducer;

function noTokenError(location='null') {
    console.error(`NO_TOKEN_ERROR::${location}`)
}
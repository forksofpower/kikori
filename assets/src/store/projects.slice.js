import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { isEmpty } from "../helpers";

// const URL = 'https://en33spkgpultt.x.pipedream.net/projects';
const URL = 'http://localhost:3000/api/v1/projects'


export const projectEntity = new schema.Entity('projects');

const projectsAdapter = createEntityAdapter();

export const fetchProjects = createAsyncThunk(
    'projects/fetchAll',
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
export const fetchOneProject = createAsyncThunk(
    'projects/fetchOne',
    async (id) => {
        let token = localStorage.getItem('token');
        const data = await fetch(`${URL}/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        
        return data
    }
)
export const createProject = createAsyncThunk(
    'projects/create',
    async (project) => {
        let token = localStorage.getItem('token');
        let payload = { project }
        const data = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(resp => resp.json())

        return data
    })

export const deleteProject = createAsyncThunk(
    'projects/deleteOne',
    async (project) => {

        // console.log("DELETING: ", project)
        let token = localStorage.getItem('token');
        let deleted = await fetch(`${URL}/${project.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(deleted)
            return project;
        })
    })

export const projectSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({ isLoaded: false}),
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
            if (!isEmpty(action.payload)) {
                projectsAdapter.upsertMany(state, action.payload.projects)
            }
            if (!state.isLoaded) {
                state.isLoaded = true
            }
        },
        [createProject.fulfilled]: (state, action) => {
            // insert project into projects
            projectsAdapter.upsertOne(state, action.payload.project);
        },
        [fetchOneProject.fulfilled]: (state, action) => {
            // insert project into projects
            projectsAdapter.upsertOne(state, action.payload.project);
        },
        [deleteProject.fulfilled]: (state, action) => {
            projectsAdapter.removeOne(state, action.payload.id)
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


// selectors
// export const selectProjectById = state => state.projects.entities[];
export const selectProjectsLoaded = state => state.projects.isLoaded;

export default projectSlice.reducer;

function noTokenError(location='null') {
    console.error(`NO_TOKEN_ERROR::${location}`)
}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { projectsLoaded } from "./projects.slice"

const URL = 'http://localhost:4000/api/v1/projects';

export const currentProjectSlice = createSlice({
    name: 'currentProject',
    initialState: {
        id: 0
    },
    reducers: {
        setCurrentProject: (state, action) => {
            state.id = action.payload
        },
        clearCurrentProject: (state) => {
            state.id = 0
        }
    }
});

// actions
export const {
    setCurrentProject,
    clearCurrentProject,
} = currentProjectSlice.actions;

// selectors
export const selectCurrentProject = state => state.currentProject.id;

export default currentProjectSlice.reducer;
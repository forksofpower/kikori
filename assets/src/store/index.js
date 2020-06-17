import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from './auth.slice';
import projectReducer from "./projects.slice"; 
import currentProjectReducer from './currentProject.slice'
import logReducer from "./logs.slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    currentProject: currentProjectReducer,
    logs: logReducer
  },
});

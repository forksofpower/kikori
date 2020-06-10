import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../services/auth.slice';
import projectReducer from "../services/project.slice"; 

export default configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    counter: counterReducer
  },
});

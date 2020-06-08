import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../services/auth.slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer
  },
});

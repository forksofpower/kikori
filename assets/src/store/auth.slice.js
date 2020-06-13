// actions and reducers for 'auth'
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: {},
        isLoaded: false
    },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload
        },
        loadingComplete: (state) => {
            state.isLoaded = true
        },
    }
})

export const { login, loadingComplete } = authSlice.actions;

export const signUp = user => dispatch => {
    return fetch('http://localhost:4000/api/v1/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({user})
    })
    .then(resp => resp.json())
    .then(({ data }) => {
        if (data.error) {
            // deal with errors
        } else {
            // save token to localstorage
            localStorage.setItem("token", data.token)
            // login user
            dispatch(login(data.user))
        }
    })
}

export const getCurrentUser = () => dispatch => {
    let token = localStorage.getItem('token');
    return fetch('http://localhost:4000/api/v1/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(resp => resp.json())
    .then(({data}) => {
        if (data.error) {
            // deal with errors
            console.log('something went wrong...')
        } else {
            dispatch(login(data))
            dispatch(loadingComplete())
        }
    })
}

export const selectAuth = state => state.auth;
export const selectCurrentUser = state => state.auth.currentUser;
export const selectIsLoaded = state => state.auth.isLoaded;

export default authSlice.reducer;
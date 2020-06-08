// actions and reducers for 'auth'
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: {}
    },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const { login } = authSlice.actions;

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

export const selectAuth = state => state.auth.currentUser;

export default authSlice.reducer;
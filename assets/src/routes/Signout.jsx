import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from "../store/auth.slice";
const Signout = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    useEffect( _ => {
        // clear the auth token
        localStorage.removeItem('token');
        // clear the user
        dispatch(signOut())
        // go home
        push('/')
    }, [])

    return null
}

export default Signout

import React from 'react'
import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { signUp, selectAuth } from '../store/auth.slice';

const Signup = () => {
    let [name, setName] = useState("Patrick Jones")
    let [email, setEmail] = useState("aaa@gmail.com")
    let [password, setPassword] = useState("password")
    let [passwordConfirmation, setPasswordConfirmation] = useState("password")

    let dispatch = useDispatch();
    let auth = useSelector(selectAuth);
    
    const handleSubmit = async event => {
        event.preventDefault()
        try {
            let user = {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            };

            dispatch(signUp(user))
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleChange = (event, handler) => {
        let value = event.target.value
        handler(value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={e => handleChange(e, setName)}
                /><br/>

                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => handleChange(e, setEmail)}
                /><br/>

                <label htmlFor="password"></label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => handleChange(e, setPassword)}
                /><br/>

                <label htmlFor="password-confirmation"></label>
                <input
                    type="password"
                    name="password-confirmation"
                    placeholder="Password"
                    value={passwordConfirmation}
                    onChange={e => handleChange(e, setPasswordConfirmation)}
                /><br/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup

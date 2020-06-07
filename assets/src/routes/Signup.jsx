import React from 'react'
import { useState } from 'react'

const Signup = () => {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [passwordConfirmation, setPasswordConfirmation] = useState("")
    
    const handleSubmit = async event => {
        event.preventDefault()
        // send 
        try {
            let { jwt: token } = await fetch('http://localhost:4000/api/v1/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user: { 
                        name, 
                        email, 
                        password, 
                        password_confirmation: passwordConfirmation }
                    })
                }
            )
            .then(resp => resp.json()) 
            
            // 
            console.log(token)
        } catch (error) {
            console.error(error)
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

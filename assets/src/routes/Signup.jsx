import React from 'react'
import { useState } from 'react'

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { signUp, selectAuth } from '../store/auth.slice';
import { Link } from 'react-router-dom';

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
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='purple' textAlign='center'>
                Get started with <code>Kik0ri</code>!
            </Header>
            <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
				<Form.Input
					fluid
					icon='user'
					iconPosition='left'
					placeholder='Name'
					name="name"
					type='text'
					onChange={e => handleChange(e, setName)}
				/>
				<Form.Input
					fluid
					icon='at'
					iconPosition='left'
					placeholder='email'
					name="email"
					type="email"
					onChange={e => handleChange(e, setEmail)}
				/>
				<Form.Input
					fluid
					icon='lock'
					iconPosition='left'
					placeholder='password'
					name="password"
					type="password"
					onChange={e => handleChange(e, setPassword)}
				/>
				<Form.Input
					fluid
					icon='lock'
					iconPosition='left'
					placeholder='confirm password'
					name="password-confirmation"
					type="password"
					onChange={e => handleChange(e, setPasswordConfirmation)}
				/>
                <Button color='purple' fluid size='large'>
                    Continue
                </Button>
                </Segment>
            </Form>
            <Message>
                Have an account already? <Link to="/login">Login</Link>
            </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Signup

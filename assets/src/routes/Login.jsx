import React from "react";
// import { createProject } from "../../store/projects.slice";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { signin } from "../store/auth.slice";
// import { Form } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(signin({ email, password }))
  }

  // const onSubmit = data => dispatch(login(data))

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked color="purple">
            <Form.Field>
              {/* <label>Email</label> */}
              <Form.Input 
                name="email" 
                placeholder='E-mail address' 
                fluid icon='at' iconPosition='left'
                onChange={(e) => setEmail(e.target.value)} />
              {/* <input type="email" name="email" ref={register} /> */}
            </Form.Field>
            <Form.Field>
              {/* <label>Password</label> */}
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                onChange={(e) => setPassword(e.target.value)} />
              {/* <input type="password" name="password" ref={register} /> */}
            </Form.Field>
            <br />
            <Form.Button fluid color="purple" type="submit">
              Submit
            </Form.Button>
          </Segment>
        </Form>
        <Message>
          Don't have an account? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

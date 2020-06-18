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
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(signin({ email, password }));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh", backgroundColor: '#a333c8' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          Log in to <code style={{fontFamily: 'monospace'}}>Kik0ri</code>
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment color="black" stacked>
            <Form.Field>
              <Form.Input
                name="email"
                placeholder="E-mail address"
                fluid
                icon="at"
                iconPosition="left"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>
            <br />
            <Form.Button fluid color="purple" type="submit">
              Submit
            </Form.Button>
          </Segment>
        </Form>
        <Message color="black">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

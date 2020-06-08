import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import PublicRoute from './Components/PublicRoute'

import { 
  Route, 
  BrowserRouter as Router, 
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './routes/Home'
import Login from './routes/Login'
import Console from './routes/Console'
import Projects from './routes/Projects'
import Signup from './routes/Signup';

import './App.css';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  // useSelector(auth)
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/console" component={Console} />
      <PrivateRoute path="/projects">
        <Projects />
      </PrivateRoute>
      <PublicRoute path="/login">
        <Login />
      </PublicRoute>
      <PublicRoute path="/signup">
        <Signup />
      </PublicRoute>
    </Switch>
    </Router>
  );
}

export default App;

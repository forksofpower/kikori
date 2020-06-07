import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
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

const App = () => {
  // useSelector(auth)
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/console" component={Console} />
      <Route path="/login" component={Login} />
      <Route path="/projects" component={Projects} />
      <Route path="/sign-up" component={Signup} />
    </Switch>
    </Router>
  );
}

export default App;

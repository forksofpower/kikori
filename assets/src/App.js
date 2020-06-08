import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAuth, 
  selectIsLoaded,
  selectCurrentUser,
  getCurrentUser,
  loadingComplete
} from './services/auth.slice';
import { isEmpty } from './helpers'

import { 
  Route, 
  BrowserRouter as Router, 
  Switch,
  Redirect
} from 'react-router-dom';

// routes
import PublicRoute from './Components/PublicRoute'
import PrivateRoute from './Components/PrivateRoute';
import Home from './routes/Home'
import Login from './routes/Login'
import Console from './routes/Console'
import Projects from './routes/Projects'
import Signup from './routes/Signup';

// styles
import './App.css';

const App = () => {
  let user = useSelector(selectCurrentUser)
  let isAuthLoaded = useSelector(selectIsLoaded)
  let dispatch = useDispatch()

  let [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // check of currentUser
    // check for token,
    // if no user, use token to fetch /me
    console.log(isAuthLoaded)
    if ( isEmpty(user) ) {
      let token = localStorage.getItem('token')
      if (token) {
        console.log(token)
        // dispatch getCurrentUser
        dispatch(getCurrentUser())
      } else {
        // nothing to do. auth loading done
        dispatch(loadingComplete())
      }
    }
  }, [])

  const isLoading = () => !isAuthLoaded;

  // useSelector(auth)
  return isLoading()
    ? <h1>Loading...</h1>
    : (
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

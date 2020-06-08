import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../services/auth.slice'
import { isEmpty } from '../helpers'

const PrivateRoute = ({children, ...remainingProps}) => {
    const auth = useSelector(selectAuth);
    return (
        <Route 
            {...remainingProps}
            render={({ location }) => 
                !isEmpty(auth) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: 'login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth, selectCurrentUser } from '../services/auth.slice'
import { isEmpty } from '../helpers'

const PrivateRoute = ({children, ...remainingProps}) => {
    const currentUser = useSelector(selectCurrentUser);
    return (
        <Route 
            {...remainingProps}
            render={({ location }) => 
                !isEmpty(currentUser) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute

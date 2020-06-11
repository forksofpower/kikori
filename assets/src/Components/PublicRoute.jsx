import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth, selectCurrentUser } from '../store/auth.slice'
import { isEmpty } from '../helpers'

const PublicRoute = ({children, ...remainingProps}) => {
    const currentUser = useSelector(selectCurrentUser);
    return (
        <Route
            {...remainingProps}
            render={({ location }) => 
                isEmpty(currentUser) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location}
                        }}
                    />
                )
            }
        />
    )
}

export default PublicRoute;
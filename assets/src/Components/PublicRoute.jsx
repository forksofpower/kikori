import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../services/auth.slice'
import { isEmpty } from '../helpers'

const PublicRoute = ({children, ...remainingProps}) => {
    const auth = useSelector(selectAuth);
    return (
        <Route
            {...remainingProps}
            render={({ location }) => 
                isEmpty(auth) ? (
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

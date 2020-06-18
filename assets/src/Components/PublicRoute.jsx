import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth, selectCurrentUser, getCurrentUser, loadingComplete } from '../store/auth.slice'
import { isEmpty } from '../helpers'
import { useState } from 'react'

const PublicRoute = ({children, ...remainingProps}) => {
    let dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if ( isEmpty(user) ) {
            let token = localStorage.getItem('token')
            if (token) {
                // dispatch getCurrentUser
                dispatch(getCurrentUser())
            } else {
                // nothing to do. auth loading done
                setLoaded(true)
                dispatch(loadingComplete())
            }
        } else {setLoaded(true)}
    }, [user])

    return loaded && (
        <Route
            {...remainingProps}
            render={({ location }) => 
                isEmpty(user) ? (
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

const RouteChoice = (user, loaded, children, location) => {
    if (loaded && isEmpty(user)) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: location }
                }}
            />
        )
    } else if (loaded && !isEmpty(user)) {
        return children
    } else {
        return <h1>Loading...</h1>
    }
}

export default PublicRoute;

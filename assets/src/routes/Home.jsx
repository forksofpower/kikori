import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../services/auth.slice'
import { isEmpty } from '../helpers'

const Home = () => {
    let currentUser = useSelector(selectCurrentUser);
    return (
        <div>
            {!isEmpty(currentUser)
                ? <h1>Welcome Home, {currentUser.name}!</h1>
                : <h1>Home!</h1>
            }
        </div>
    )
}

export default Home

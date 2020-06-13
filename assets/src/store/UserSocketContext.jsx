import React,{ useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types'
import { Socket } from 'phoenix';
import { useSelector } from 'react-redux';
import { selectAuth, selectCurrentUser } from './auth.slice';
import { isEmpty } from '../helpers';

const UserSocketContext = createContext({ socket: null })

const UserSocketProvider = ({children}) => {
    let user = useSelector(selectCurrentUser);
    const [socket, setSocket] = useState({});

    useEffect(() => {
        if (!isEmpty(user)) {
            const token = localStorage.getItem('token')
            const socket = new Socket('/socket', { params: { token }})
            socket.connect()
            // persist the socket
            setSocket(socket)
        }
    }, [user]);


    if (!socket) return null;

    return (
        <UserSocketContext.Provider value={{socket}}>
            {children}
        </UserSocketContext.Provider>
    )
}

UserSocketProvider.propTypes = {
    children: PropTypes.node
}

export { UserSocketProvider, UserSocketContext }

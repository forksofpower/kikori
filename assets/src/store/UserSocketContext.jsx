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
        const token = localStorage.getItem('token')
        let options = {}
        if (token !== 'undefined') {
            options.params = { token }
        }
        const socket = new Socket('/socket', options)
        socket.connect()
        setSocket(socket)
        // persist the socket
    }, []);


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

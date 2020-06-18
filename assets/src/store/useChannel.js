import { useState, useContext, useEffect } from 'react'
import { UserSocketContext } from './UserSocketContext'
import { isEmpty } from '../helpers'

const useChannel = channelName => {
    const [channel, setChannel] = useState()
    const { socket } = useContext(UserSocketContext)

    useEffect(() => {
        if (!isEmpty(socket)) {
            const chan = socket.channel(channelName)
            console.log(chan)
            // try to join the channel
            chan.join().receive('ok', () => {
                setChannel(chan)
            })

            // leave the channel on cleanup
            return () => {
                console.log('leaving channel')
                chan.leave();
            };
        }
    }, [socket]); // only once

    return [channel]
}

export default useChannel

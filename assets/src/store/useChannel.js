import { useState, useContext, useEffect } from 'react'
import { UserSocketContext } from './UserSocketContext'

const useChannel = channelName => {
    const [channel, setChannel] = useState()
    const { socket } = useContext(UserSocketContext)

    useEffect(() => {
        const chan = socket.channel(channelName)
        // try to join the channel
        chan.join().receive('ok', () => {
            setChannel(chan)
        })

        // leave the channel on cleanup
        return () => {
            console.log('leaving channel')
            chan.leave();
        };
    }, []); // only once

    return [channel]
}

export default useChannel

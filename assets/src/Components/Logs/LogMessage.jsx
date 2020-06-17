import React, { useState, useEffect } from 'react'
import { Socket } from 'phoenix';
import { isEmpty } from "../../helpers";
import useChannel from "../../store/useChannel";

import { placeholders } from "../../helpers";

const log_template = "{{level}} user:{{context.user.id}} {{message}}"

const colors = {
    info: '#4cc3a8',
    warn: '#feb718',
    error: '#ef5657',
    message: '#427edb',
    date: '#616182'
}

const LogFragment = ({text, color}) => {
    return <span style={{color}}>text</span>
}
const LogMessage = ({log}) => {
    let { string } = placeholders(log_template, log.message)

    return (
        <p key={() => Math.random()} style={{fontFamily: 'monospace', padding:0, margin: 0}} className="log-message">
            <span style={{color: colors.date, paddingRight: '1rem'}}>{log.inserted_at}</span>
            <span style={{color: colors[log.message.level], paddingRight: '1rem'}}>{log.message.level}</span>
            <span style={{color: '#427edb', paddingRight: '1rem'}}>{log.message.message}</span>
        </p>
    )
}

// const [projectChannel] = useChannel(`project:${project?.id}`);
// const [logMessages, setLogMessages] = useState([]);

// const NEW_LOG_MESSAGE = 'create_log';

// useEffect(() => {
//     if(!projectChannel) return;

//     // console.log(projectChannel)
//     projectChannel.on(NEW_LOG_MESSAGE, resp => {
//         let data = JSON.parse(resp.message)
//         // let data = resp
//         // let pattern = ""
//         // console.log(logMessages);
//         setLogMessages((logs) => [...logs, data])
//         // setLogMessages([...logMessages, ])
//     })
//     setLogMessages([])

//     console.log(JSON.stringify(something))
//     setTimeout(() => {
//         something.off(NEW_LOG_MESSAGE, projectChannel);
//         projectChannel.leave();
//     }, 10000)

//     console.log('useEffect firing')
//     return () => {
//         projectChannel.off(NEW_LOG_MESSAGE, projectChannel)
//     }
// }, [projectChannel, project])

// useEffect(() => {
    //     if(!projectChannel) return;
    //     projectChannel.off(NEW_LOG_MESSAGE, projectChannel)
    // })
// console.log(projectChannel)
// export const LogMessage = ({message}) => {
    
// } 

{/* export const LogLine = ({message}) => {
    return {`${message.message}`}
} */}

export default LogMessage

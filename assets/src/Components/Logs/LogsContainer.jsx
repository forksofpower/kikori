import React, { useState, useEffect } from 'react'
import { Socket } from 'phoenix';
import { isEmpty } from "../../helpers";
import useChannel from "../../store/useChannel";

import { placeholders } from "../../helpers";

const log_template = "{{level}} user:{{context.user.id}} {{message}}"

const LogsContainer = ({project, rerender}) => {
    const [projectChannel] = useChannel(`project:${project?.id}`);
    const [logMessages, setLogMessages] = useState([]);

    const NEW_LOG_MESSAGE = 'create_log';

    useEffect(() => {
        // console.log("project in logsContainer: ", project)
        console.log(projectChannel)
        console.log(project)
        if(!projectChannel) return;

        // console.log(projectChannel)
        projectChannel.on(NEW_LOG_MESSAGE, resp => {
            let data = JSON.parse(resp.message)
            // let data = resp
            // let pattern = ""
            // console.log(logMessages);
            setLogMessages((logs) => [...logs, data])
            // setLogMessages([...logMessages, ])
        })
        setLogMessages([])

        // console.log(JSON.stringify(something))
        // setTimeout(() => {
        //     something.off(NEW_LOG_MESSAGE, projectChannel);
        //     projectChannel.leave();
        // }, 10000)

        console.log('useEffect firing')
        return () => {
            projectChannel.off(NEW_LOG_MESSAGE, projectChannel)
        }
    }, [projectChannel, project])
    
    // useEffect(() => {
        //     if(!projectChannel) return;
        //     projectChannel.off(NEW_LOG_MESSAGE, projectChannel)
        // })
    // console.log(projectChannel)
    console.log('Testing here')
    return (
        <div style={{fontFamily: 'monospace'}}>
            {(logMessages.length > 0) &&
                logMessages.map(log =>
                   <p key={() => Math.random()} style={{padding:0, margin: 0}}>
                       {placeholders(log_template, log)}
                   </p>
                )
            }

        </div>
    )
}

// export const LogMessage = ({message}) => {
    
// } 

{/* export const LogLine = ({message}) => {
    return {`${message.message}`}
} */}

export default LogsContainer

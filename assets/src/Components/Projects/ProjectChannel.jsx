import React from "react";
import useChannel from "../../store/useChannel";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserSocketContext } from "../../store/UserSocketContext";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchLogs,
  selectAllLogs,
  selectLogsLoaded,
  addLog,
  clearLogs,
  selectLogById,
} from "../../store/logs.slice";
import LogMessage from "../Logs/LogMessage";
import { Segment, Dimmer, Loader, Image, Button } from "semantic-ui-react";

const ProjectChannel = ({ project, msgs = [] }) => {
  const ref = React.createRef();
  const [tail, setTail] = useState(true)
  const dispatch = useDispatch();
  const [projectChannel] = useChannel(`project:${project.id}`);
  const log_messages = useSelector(selectAllLogs);
  const logsLoaded = useSelector(selectLogsLoaded);


  const moveToBottom = () => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleScroll = (e) => {
    let { scrollTop, scrollTopMax } = e.target;

    if (scrollTop >= scrollTopMax - 80) {
      setTail(true)
    } else {
      setTail(false)
    }
  }

  useEffect(() => {
    // scroll to the bottom when a new log message comes in
    // only if the logs are loaded and in tail mode
    if (logsLoaded && tail) {
      moveToBottom();
    }
  }, [log_messages])

  useEffect(() => {
    if (!projectChannel) return;

    projectChannel.on("create_log", ({ log_message }) => {
      if (project.id === Number(log_message.project_id)) {
        // hydrate the message data
        console.log(log_message.message)
        if (typeof log_message.message === 'string') {
          log_message.message = JSON.parse(log_message.message)
        }
        dispatch(addLog(log_message));
      }
    });

    return () => {
      projectChannel.off("create_log", projectChannel);
      // projectChannel.leave();
    };
  }, [project, projectChannel]);

  useEffect(() => {
    dispatch(fetchLogs(project.id));

    return () => {
      dispatch(clearLogs())
    }
  }, []);

  return (
    <div style={{height: '95vh', overflow: 'scroll'}} onScroll={handleScroll}>
        <>
        <Button onClick={moveToBottom}>Scroll into view</Button>
        {/* {!logsLoaded &&
            <Segment>
                <Dimmer active>
                    <Loader content='Loading' />
                </Dimmer>
        
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>

        } */}
        {logsLoaded && log_messages && (
          log_messages.map((log) => 
            <LogMessage key={Math.random()} log={log}/>
          )
        )}
        
        {logsLoaded && log_messages && (
            <div ref={ref} name="logTail"></div>
        )}
        </>
    </div>
  );
};

export default ProjectChannel;

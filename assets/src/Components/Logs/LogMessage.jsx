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
        <p  key={() => Math.random()} 
            style={{fontFamily: 'monospace', padding: '1px 0 1px 1em', margin: 0}}
            className="log-message"
        >
            <span style={{color: colors.date, paddingRight: '1rem'}}>{log.inserted_at}</span>
            <span style={{color: colors[log.message.level], paddingRight: '1rem'}}>{log.message.level}</span>
            <span style={{color: '#427edb', paddingRight: '1rem'}}>{log.message.message}</span>
        </p>
    )
}

export default LogMessage

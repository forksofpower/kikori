import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const DelayRender = ({children, delay=250}) => {
    let [enabled, setEnabled] = useState(false)

    const enable = () => setEnabled(true)

    useEffect(() => {
        const timer = setTimeout(enable, delay)

        return () => clearTimeout(timer)
    }, [])

    if (!enabled) {
        return null
    }

    return children;
}

export default DelayRender

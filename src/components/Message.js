import React from 'react'
import Alert from 'react-bootstrap/Alert';
const Message = ({ varient, children }) => {
    return (
        <Alert variant={varient}>
            {children}
        </Alert>
    )
}

export default Message
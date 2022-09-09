import { useEffect, useRef } from 'react';
import './Input.scss';

function Input({ type = "text", autoFocus, ...props }) {
    const input = useRef()

    useEffect(() => {
        if (autoFocus) {
            console.log('autoFocus');
            input.current.focus()
        }
    })

    return (
        <input
            className='input'
            type={type}
            {...props}
            ref={input}
        />
    );
}

export default Input;

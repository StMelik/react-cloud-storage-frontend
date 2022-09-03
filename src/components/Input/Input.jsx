import './Input.scss';

function Input({ type = "text", ...props }) {
    return (
        <input
            className='input'
            type={type}
            {...props}
        />
    );
}

export default Input;

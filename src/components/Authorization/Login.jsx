import { useInput } from '../../hooks/useInput';
import { login } from '../../utils/api';
import Input from '../Input/Input';
import './Authorization.scss';
import { useDispatch } from 'react-redux'

function Login() {
    const { values, onChange } = useInput({ email: '', password: '' })
    const dispatch = useDispatch()

    return (
        <div className="authorization">
            <div className="authorization__wrapper">
                <h1 className="authorization__title">Вход</h1>
                <form className='authorization__form'>
                    <Input
                        type='email'
                        placeholder="Введите E-mail"
                        name="email"
                        value={values.email}
                        onInput={onChange}
                    />
                    <Input
                        type='password'
                        placeholder="Введите пароль"
                        name="password"
                        value={values.password}
                        onInput={onChange}
                    />
                    <button
                        className='authorization__form-submit'
                        type='button'
                        onClick={() => dispatch(login(values))}
                    >Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

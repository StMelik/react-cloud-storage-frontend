import { useInput } from '../../hooks/useInput';
import { registration } from '../../utils/api';
import Input from '../Input/Input';
import './Registration.scss';

function Registration() {
    const { values, onChange } = useInput({ email: '', password: '' })

    return (
        <div className="registration">
            <div className="registration__wrapper">
                <h1 className="registration__title">Регистрация</h1>
                <form className='registration__form'>
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
                        className='registration__form-submit'
                        type='button'
                        onClick={() => registration(values)}
                    >Зарегестрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;

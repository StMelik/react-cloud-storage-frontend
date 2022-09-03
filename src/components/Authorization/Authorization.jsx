import { useInput } from '../../hooks/useInput';
import { registration } from '../../utils/api';
import Input from '../Input/Input';
import './Authorization.scss';

function Authorization() {
    const { values, onChange } = useInput({ email: '', password: '' })

    return (
        <div className="authorization">
            <div className="authorization__wrapper">
                <h1 className="authorization__title">Регистрация</h1>
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
                        onClick={() => registration(values)}
                    >Зарегестрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default Authorization;

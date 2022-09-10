import { useInput } from '../../hooks/useInput';
import Input from '../Input/Input';
import './Authorization.scss';
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../store/actions/userActions';
import { showButtonLoaderAction } from '../../store/reducers/appReducer';

function Login() {
    const { values, onChange } = useInput({ email: '', password: '' })
    const dispatch = useDispatch()
    const { buttonLoader } = useSelector(state => state.app)

    const textButton = buttonLoader ? "Вход ..." : "Войти"

    function handleSubmitForm(e) {
        dispatch(showButtonLoaderAction())
        e.preventDefault()
        dispatch(loginAction(values))
    }

    return (
        <div className="authorization">
            <div className="authorization__wrapper">
                <h1 className="authorization__title">Вход</h1>
                <form
                    className='authorization__form'
                    onSubmit={handleSubmitForm}
                >
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
                        type='submit'
                    >{textButton}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

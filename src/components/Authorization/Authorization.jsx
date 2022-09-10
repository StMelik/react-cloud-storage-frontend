import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../hooks/useInput';
import { registrationAction } from '../../store/actions/userActions';
import { showButtonLoaderAction } from '../../store/reducers/appReducer';
import Input from '../Input/Input';
import './Authorization.scss';

function Authorization() {
    const dispatch = useDispatch()
    const { buttonLoader } = useSelector(state => state.app)
    const { values, onChange } = useInput({ email: '', password: '' })

    const textButton = buttonLoader ? "Регистрация ..." : "Зарегестрироваться"

    function handleSubmitForm(e) {
        dispatch(showButtonLoaderAction())
        e.preventDefault()
        dispatch(registrationAction(values))
    }

    return (
        <div className="authorization">
            <div className="authorization__wrapper">
                <h1 className="authorization__title">Регистрация</h1>
                <form
                    onSubmit={handleSubmitForm}
                    className='authorization__form'
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

export default Authorization;

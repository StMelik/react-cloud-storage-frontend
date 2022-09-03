
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import diskIcon from '../../assets/icons/disk-icon.svg'
import { logoutAction } from '../../store/reducers/userReducer';
import './Navbar.scss';

function Navbar() {
    const { isAuth } = useSelector(store => store.user)
    const dispatch = useDispatch()

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__wrapper">
                    <img className="logo" src={diskIcon} alt="" />
                    <p className="nav__title">MERN CLOUD</p>
                    {isAuth ?
                        <button
                            className="nav__link"
                            onClick={() => dispatch(logoutAction())}
                        >Выйти</button>
                        :
                        <>
                            <NavLink className="nav__link" to='/sign-in'>Войти</NavLink>
                            <NavLink className="nav__link" to='/sign-up'>Регистрация</NavLink>
                        </>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

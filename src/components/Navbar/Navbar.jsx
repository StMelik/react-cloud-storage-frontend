
import { NavLink } from 'react-router-dom';
import diskIcon from '../../assets/icons/disk-icon.svg'
import './Navbar.scss';

function Navbar() {
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__wrapper">
                    <img className="logo" src={diskIcon} alt="" />
                    <p className="nav__title">MERN CLOUD</p>
                    <NavLink className="nav__link" to='/sign-in'>Войти</NavLink>
                    <NavLink className="nav__link" to='/sign-up'>Регистрация</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

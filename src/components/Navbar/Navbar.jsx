
import diskIcon from '../../assets/icons/disk-icon.svg'
import './Navbar.scss';

function Navbar() {
    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__wrapper">
                    <img className="logo" src={diskIcon} alt="" />
                    <p className="nav__title">MERN CLOUD</p>
                    <button className="nav__link">Войти</button>
                    <button className="nav__link">Регистрация</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

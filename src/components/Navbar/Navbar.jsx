
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import diskIcon from '../../assets/icons/disk-icon.svg'
import { showLoaderAction } from '../../store/reducers/appReducer';
import { logoutAction } from '../../store/reducers/userReducer';
import { getFiles, searchFile } from '../../utils/api';
import { SERVER_URL } from '../../utils/constants';
import './Navbar.scss';
import avatarIcon from '../../assets/icons/avatar-icon.svg'

function Navbar() {
    const { isAuth, currentUser } = useSelector(store => store.user)
    const { currentDir } = useSelector(store => store.files)
    const dispatch = useDispatch()
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const avatarUrl = currentUser?.avatar
        ? SERVER_URL + '/' + currentUser.avatar
        : avatarIcon

    const linkCl = ["nav__link", "nav__link_active"]

    function handleSearchFile(e) {
        const value = e.target.value

        setSearchQuery(value)
        dispatch(showLoaderAction())

        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }

        if (value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(value))
            }, 500, value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    function handleLogoutClick() {
        dispatch(logoutAction())
    }

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__wrapper">
                    <NavLink
                        to="/"
                        className="nav__logo-link"
                    >
                        <img className="logo" src={diskIcon} alt="Логотип" />
                        <p className="nav__title">MERN CLOUD</p>
                    </NavLink>

                    {isAuth ?
                        <>
                            <input
                                className='nav__search'
                                placeholder='Название файла'
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchFile}
                            />
                            <div className="nav__buttons">
                                <button
                                    className="nav__link"
                                    onClick={handleLogoutClick}
                                >
                                    Выйти
                                </button>
                                <NavLink to="/profile">
                                    <img className='nav__avatar' src={avatarUrl} alt="Аватар" />
                                </NavLink>
                            </div>
                        </>
                        :
                        <div className="nav__buttons">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? linkCl.join(' ') : linkCl[0]
                                }
                                to='/sign-in'
                            >Войти</NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? linkCl.join(' ') : linkCl[0]
                                }
                                to='/sign-up'
                            >Регистрация</NavLink>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

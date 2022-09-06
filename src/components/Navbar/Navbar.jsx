
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

    function handleSearchFile(e) {
        const value = e.target.value

        setSearchQuery(value)

        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }

        dispatch(showLoaderAction())

        if (value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(value))
            }, 500, value))
        } else {
            dispatch(getFiles(currentDir))
        }


    }

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav__wrapper">
                    {/* Исправить */}
                    <NavLink to="/">
                        <img className="logo" src={diskIcon} alt="" />
                    </NavLink>
                    <NavLink to="/">
                        <p className="nav__title">MERN CLOUD</p>
                    </NavLink>
                    {isAuth ?
                        <>
                            <input
                                className='nav__search'
                                placeholder='Введите название файла'
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchFile}
                            />

                            <button
                                className="nav__link"
                                onClick={() => dispatch(logoutAction())}
                            >
                                Выйти
                            </button>
                            <NavLink to="/profile">
                                <img className='nav__avatar' src={avatarUrl} alt="Аватар" />
                            </NavLink>
                        </>
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

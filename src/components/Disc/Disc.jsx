
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import diskIcon from '../../assets/icons/disk-icon.svg'
import { logoutAction } from '../../store/reducers/userReducer';
import { getFiles } from '../../utils/api';
import './Disc.scss';
import FileList from './FileList/FileList';

function Disc() {
    const { isAuth } = useSelector(store => store.user)
    const { currentDir, files } = useSelector(store => store.files)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    return (
        <div className="disk">
            <div className="container">
                <h2 className="disk__title">Videos</h2>
                <div className="disk__menu">
                    <buttton className="disk__button">Назад</buttton>
                    <buttton className="disk__button">Создать новую папку</buttton>
                </div>
                <FileList files={files} />
            </div>
        </div>
    );
}

export default Disc;

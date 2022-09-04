
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import diskIcon from '../../assets/icons/disk-icon.svg'
import { setCurrentDir, setPopupOpenedAction } from '../../store/reducers/fileReducer';
import { logoutAction } from '../../store/reducers/userReducer';
import { createDir, getFiles } from '../../utils/api';
import Popup from '../Popup/Popup';
import './Disc.scss';
import FileList from './FileList/FileList';

function Disc() {
    const { isAuth } = useSelector(store => store.user)
    const { currentDir, files, popupOpened, dirStack } = useSelector(store => store.files)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('currentDir', currentDir);
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function handleOpenPopup() {
        dispatch(setPopupOpenedAction(true))
    }

    function handleClickBack() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    return (
        <div className="disk">
            <div className="container">
                <h2 className="disk__title">Videos</h2>
                <div className="disk__menu">
                    <button
                        className="disk__button"
                        onClick={handleClickBack}
                    >Назад</button>
                    <button
                        className="disk__button"
                        onClick={handleOpenPopup}
                    >Создать новую папку</button>
                </div>
                <FileList files={files} />
            </div>
            {popupOpened &&
                <Popup />
            }
        </div>
    );
}

export default Disc;

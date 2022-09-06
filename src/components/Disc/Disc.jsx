
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import diskIcon from '../../assets/icons/disk-icon.svg'
import { setCurrentDir, setPopupOpenedAction } from '../../store/reducers/fileReducer';
import { logoutAction } from '../../store/reducers/userReducer';
import { createDir, getFiles, uploadFile } from '../../utils/api';
import Popup from '../Popup/Popup';
import './Disc.scss';
import FileList from './FileList/FileList';
import Uploader from './Uploader/Uploader';

function Disc() {
    const { loader } = useSelector(store => store.app)
    const { currentDir, files, popupOpened, dirStack } = useSelector(store => store.files)
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('name')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function handleOpenPopup() {
        dispatch(setPopupOpenedAction(true))
    }

    function handleClickBack() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function handleFileUpload(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function handleDragEnter(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function handleDragLeave(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function handleDrop(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    if (loader) {
        return (
            <div className='loader'>
                <div class="lds-dual-ring"></div>
            </div>
        )
    }

    if (dragEnter) {
        return (
            <div className="container">
                <div
                    className="drop-area"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragEnter}
                    onDrop={handleDrop}
                >
                    Перетащите файлы сюда
                </div>
            </div>

        )
    }

    return (
        <div
            className="disk"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragEnter}

        >
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
                    <label className='disk__upload'>
                        Загрузить файл
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            multiple
                        />
                    </label>
                    <select
                        className='disk__select'
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="name">По имени</option>
                        <option value="type">По типу</option>
                        <option value="date">По дате</option>
                    </select>
                </div>
                <FileList files={files} />
            </div>
            {popupOpened &&
                <Popup />
            }
            <Uploader />
        </div>
    );
}

export default Disc;

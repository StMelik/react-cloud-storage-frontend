import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilesAction, uploadFileAction } from '../../store/actions/fileActions';
import { popFromStackAction, setCurrentDir, setPopupOpenedAction, setViewAction } from '../../store/reducers/fileReducer';
import Loader from '../Loader/Loader';
import Popup from '../Popup/Popup';
import './Disk.scss';
import FileList from './FileList/FileList';
import Uploader from './Uploader/Uploader';

function Disk() {
    const { loader } = useSelector(store => store.app)
    const { currentDir, files, popupOpened, dirStack } = useSelector(store => store.files)
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFilesAction(currentDir, sort))
        // eslint-disable-next-line
    }, [currentDir, sort])

    function handleOpenPopup() {
        dispatch(setPopupOpenedAction(true))
    }

    function handleClickBack() {
        const backDir = dirStack.at(-1)
        dispatch(popFromStackAction())
        dispatch(setCurrentDir(backDir.parent))
    }

    function handleFileUpload(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFileAction(file, currentDir)))
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
        files.forEach(file => dispatch(uploadFileAction(file, currentDir)))
        setDragEnter(false)
    }

    function getFoldersName(dirStack) {
        if (dirStack.length === 0) {
            return ''
        }

        const list = dirStack.map(dir => dir.name)

        if (list.length > 4) {
            const firstDir = list[0]
            const twoLastDir = list.slice(-2)
            const resultList = [firstDir, '...', ...twoLastDir]

            return resultList.join(' > ')
        }

        return list.join(' > ')
    }

    if (loader) {
        return (
            <div className='disk__loader'>
                <Loader />
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
        <div className="disk">
            <div className="container">
                <div
                    className="disk__wrapper"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragEnter}
                >
                    <h2 className="disk__title">{getFoldersName(dirStack)}</h2>
                    <div className="disk__menu">
                        {currentDir &&
                            <button
                                className="disk__button disk__button_back"
                                onClick={handleClickBack}
                            />
                        }

                        <button
                            className="disk__button disk__button_add-folder"
                            onClick={handleOpenPopup}
                        />
                        <label className='disk__upload disk__button disk__button_add-file'>
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
                            <option value="type">По типу</option>
                            <option value="name">По имени</option>
                            <option value="date">По дате</option>
                        </select>
                        <button
                            className="disk__view-button disk__view-button_list"
                            onClick={() => dispatch(setViewAction('list'))}
                        />
                        <button
                            className="disk__view-button disk__view-button_grid"
                            onClick={() => dispatch(setViewAction('grid'))}
                        />
                    </div>
                    <FileList files={files} />
                </div>
            </div>
            {popupOpened && <Popup />}
            <Uploader />
        </div>
    );
}

export default Disk;

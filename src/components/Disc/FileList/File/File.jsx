
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { pushToStackAction, setCurrentDir } from '../../../../store/reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../utils/api';
// import diskIcon from '../../assets/icons/disk-icon.svg'
// import { logoutAction } from '../../store/reducers/userReducer';
import './File.scss';

function File({ file }) {
    const { currentDir } = useSelector(store => store.files)
    const dispatch = useDispatch()

    const isDir = file.type === 'dir'
    const iconCl = `file-item__icon ${isDir ? 'file-item__icon_dir' : 'file-item__icon_file'}`

    function handleOpenDir() {
        if (isDir) {
            dispatch(setCurrentDir(file._id))
            dispatch(pushToStackAction(currentDir))
        }
    }

    function handleDownloadFile(evt) {
        evt.stopPropagation()
        downloadFile(file)
    }

    function handleDeleteFile(evt) {
        evt.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <li className="file-item" onClick={handleOpenDir}>
            <div className={iconCl} />
            <p className="file-item__name">{file.name}</p>

            {!isDir &&
                <button
                    className="file-item__button file-item__button_download"
                    onClick={handleDownloadFile}
                />
            }

            <button
                className="file-item__button file-item__button_delete"
                onClick={handleDeleteFile}
            />

            <p className="file-item__date">{file.date.slice(0, 10)}</p>
            <p className="file-item__size">{file.size}</p>
        </li>
    );
}

export default File;

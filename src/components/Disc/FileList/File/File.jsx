
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { pushToStackAction, setCurrentDir } from '../../../../store/reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../utils/api';
import { sizeFormat } from '../../../../utils/sizeFormat';
// import diskIcon from '../../assets/icons/disk-icon.svg'
// import { logoutAction } from '../../store/reducers/userReducer';
import './File.scss';

function File({ file }) {
    const { currentDir, view } = useSelector(store => store.files)
    const dispatch = useDispatch()

    const isDir = file.type === 'dir'
    const iconListCl = `file-item__icon ${isDir ? 'file-item__icon_dir' : 'file-item__icon_file'}`
    const iconGridCl = `file-item-grid__icon ${isDir ? 'file-item-grid__icon_dir' : 'file-item-grid__icon_file'}`

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

    if (view === 'list') {
        return (
            <li className="file-item" onClick={handleOpenDir}>
                <div className={iconListCl} />
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
                <p className="file-item__size">{sizeFormat(file.size)}</p>
            </li>
        );
    }

    if (view === 'grid') {
        return (
            <li className="file-item-grid" onClick={handleOpenDir}>
                <div className={iconGridCl} />
                <p className="file-item-grid__name">{file.name}</p>

                <div className="file-item-grid__buttons">
                    {!isDir &&
                        <button
                            className="file-item-grid__button file-item-grid__button_download"
                            onClick={handleDownloadFile}
                        />
                    }

                    <button
                        className="file-item-grid__button file-item-grid__button_delete"
                        onClick={handleDeleteFile}
                    />
                </div>
            </li>
        );
    }


}

export default File;

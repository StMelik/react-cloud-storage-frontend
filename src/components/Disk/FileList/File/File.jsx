import { useDispatch, useSelector } from 'react-redux';
import { deleteFileBdAction, downloadFileAction } from '../../../../store/actions/fileActions';
import { pushToStackAction, setCurrentDir } from '../../../../store/reducers/fileReducer';
import { sizeFormat, nameFormat } from '../../../../utils/format';
import './File.scss';

function File({ file }) {
    const { view } = useSelector(store => store.files)
    const dispatch = useDispatch()

    const isDir = file.type === 'dir'

    const iconListCl = `file-item__icon 
    ${isDir ? 'file-item__icon_dir' : 'file-item__icon_file'}`

    const iconGridCl = `file-item-grid__icon 
    ${isDir ? 'file-item-grid__icon_dir' : 'file-item-grid__icon_file'}`

    function handleOpenDir() {
        if (isDir) {
            dispatch(setCurrentDir(file._id))
            dispatch(pushToStackAction(file))
        }
    }

    function handleDownloadFile(evt) {
        evt.stopPropagation()
        downloadFileAction(file)
    }

    function handleDeleteFile(evt) {
        evt.stopPropagation()
        dispatch(deleteFileBdAction(file))
    }

    if (view === 'list') {
        return (
            <li
                className={`file-item ${isDir && 'file-item_dir'}`}
                onClick={handleOpenDir}
            >
                <div className={iconListCl} />
                <p className="file-item__name">{file.name}</p>

                {!isDir && <button
                    className="file-item__button file-item__button_download"
                    onClick={handleDownloadFile}
                />}

                <button
                    className="file-item__button file-item__button_delete"
                    onClick={handleDeleteFile}
                />

                <p className="file-item__date">{file.date.slice(0, 10)}</p>
                {!isDir &&
                    <p className="file-item__size">{sizeFormat(file.size)}</p>
                }

            </li>
        );
    }

    if (view === 'grid') {
        return (
            <li
                className="file-item-grid"
                onClick={handleOpenDir}
            >
                <div className={iconGridCl} />
                <p className="file-item-grid__name">{nameFormat(file.name, isDir)}</p>

                <div className="file-item-grid__buttons">
                    {!isDir && <button
                        className="file-item-grid__button file-item-grid__button_download"
                        onClick={handleDownloadFile}
                    />}

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

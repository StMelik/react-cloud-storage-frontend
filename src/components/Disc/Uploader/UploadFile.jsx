import { useDispatch } from 'react-redux';
import { removeUploadFileAction } from '../../../store/reducers/uploadReducer';

import './Uploader.scss';

function UploadFile({ file }) {
    const dispatch = useDispatch()

    function handleDeleteUploadFile() {
        dispatch(removeUploadFileAction(file.id))
    }

    return (
        <li className="upload-file">
            <div className="upload-file__header">
                <p className="upload-file__name">{file.name}</p>
                <button
                    className='upload-file__remove'
                    onClick={handleDeleteUploadFile}
                />
            </div>
            <div className="upload-file__progress-bar">
                <div
                    className="upload-file__upload-bar"
                    style={{ width: file.progress + '%' }}
                />
                <p className="upload-file__percent">{file.progress}%</p>
            </div>
        </li>
    );
}

export default UploadFile;

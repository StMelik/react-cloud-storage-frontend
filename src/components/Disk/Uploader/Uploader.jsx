import { useDispatch, useSelector } from 'react-redux';
import { hideUploaderAction } from '../../../store/reducers/uploadReducer';
import './Uploader.scss';
import UploadFile from './UploadFile';

function Uploader() {
    const { isVisible, files } = useSelector(store => store.upload)
    const dispatch = useDispatch()

    function handleCloseUploader() {
        dispatch(hideUploaderAction())
    }

    return (isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <h2 className="uploader__title">Загрузки</h2>
                <button
                    className='uploader__close'
                    onClick={handleCloseUploader}
                />
            </div>
            <ul className='uploader__list'>
                {files.map((file) =>
                    <UploadFile
                        key={file.id}
                        file={file}
                    />
                )}
            </ul>
        </div>
    );
}

export default Uploader;

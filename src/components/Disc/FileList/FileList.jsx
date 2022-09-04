
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import File from './File/File';
// import diskIcon from '../../assets/icons/disk-icon.svg'
// import { logoutAction } from '../../store/reducers/userReducer';
import './FileList.scss';

function FileList({ files }) {
    const { isAuth } = useSelector(store => store.user)
    const dispatch = useDispatch()

    return (
        <div className='file-list'>
            <div className="file-list__header">
                <p className="file-list__header-name">Название</p>
                <p className="file-list__header-date">Дата</p>
                <p className="file-list__header-size">Размер</p>
            </div>
            <ul className="file-list__list">
                {files.map((file, i) =>
                    <File
                        key={i}
                        file={file}
                    />
                )}

            </ul>
        </div>

    );
}

export default FileList;


import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import diskIcon from '../../assets/icons/disk-icon.svg'
// import { logoutAction } from '../../store/reducers/userReducer';
import './File.scss';

function File({ file }) {
    const { isAuth } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const isDir = file.type === 'dir'
    const iconCl = `file-item__icon ${isDir ? 'file-item__icon_dir' : 'file-item__icon_file'}`

    return (
        <li className="file-item">
            <div className={iconCl} />
            <p className="file-item__name">{file.name}</p>
            <p className="file-item__date">{file.date.slice(0, 10)}</p>
            <p className="file-item__size">{file.size}</p>
        </li>
    );
}

export default File;

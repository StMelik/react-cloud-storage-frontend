
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import File from './File/File';
// import diskIcon from '../../assets/icons/disk-icon.svg'
// import { logoutAction } from '../../store/reducers/userReducer';
import './FileList.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function FileList({ files }) {
    const { isAuth } = useSelector(store => store.user)
    const dispatch = useDispatch()

    if (files.length === 0) {
        return <p className="empty">Файлы не найдены</p>
    }

    return (
        <div className='file-list'>
            <div className="file-list__header">
                <p className="file-list__header-name">Название</p>
                <p className="file-list__header-date">Дата</p>
                <p className="file-list__header-size">Размер</p>
            </div>
            <TransitionGroup
                component='ul'
                className="file-list__list"
                exit={false}
            >

                {files.map((file, i) =>
                    <CSSTransition
                        key={i}
                        timeout={500}
                        classNames="file"
                    >
                        <File file={file} />
                    </CSSTransition>

                )}
            </TransitionGroup>
        </div>

    );
}

export default FileList;

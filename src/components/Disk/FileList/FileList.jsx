import { useSelector } from 'react-redux';
import File from './File/File';
import './FileList.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function FileList({ files }) {
    const { view } = useSelector(store => store.files)

    if (files.length === 0) {
        return <p className="empty">Файлы не найдены</p>
    }

    if (view === 'list') {
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

    if (view === 'grid') {
        return (
            <ul className='file-grid'>
                {files.map((file, i) =>
                    <File key={i} file={file} />
                )}
            </ul>
        );
    }
}

export default FileList;

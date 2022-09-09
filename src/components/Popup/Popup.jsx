import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDirAction } from '../../store/actions/fileActions';
import { setPopupOpenedAction } from '../../store/reducers/fileReducer';
import Input from '../Input/Input';
import './Popup.scss';

function Popup() {
    const dispatch = useDispatch()
    const { currentDir } = useSelector(store => store.files)
    const [dirName, setDirName] = useState('')

    function closePopup() {
        dispatch(setPopupOpenedAction(false))
    }

    function handleCreateDir(e) {
        e.preventDefault()
        dispatch(createDirAction(currentDir, dirName))
        closePopup()
        setDirName('')
    }

    return (
        <div
            className="popup"
            onClick={closePopup}
        >
            <div
                className="popup__content"
                onClick={e => e.stopPropagation()}
            >
                <div className="popup__header">
                    <h2 className="popup__title">Создать новую папку</h2>
                    <button
                        className="popup__close"
                        onClick={closePopup}
                    />
                </div>
                <form
                    className='popup__form'
                    onSubmit={handleCreateDir}
                >
                    <Input
                        placeholder="Введите название папки"
                        value={dirName}
                        onInput={(e) => setDirName(e.target.value)}
                        autoFocus
                    />
                    <button
                        className="popup__submit"
                        type='submit'
                    >Создать</button>
                </form>
            </div>
        </div>
    );
}

export default Popup;

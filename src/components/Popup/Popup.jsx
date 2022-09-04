import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../hooks/useInput';
import { setPopupOpenedAction } from '../../store/reducers/fileReducer';
import { createDir } from '../../utils/api';
import Input from '../Input/Input';
import './Popup.scss';

function Popup() {
    const dispatch = useDispatch()
    const { currentDir } = useSelector(store => store.files)
    const [dirName, setDirName] = useState('')

    function closePopup() {
        dispatch(setPopupOpenedAction(false))
    }

    function handleCreateDir() {
        dispatch(createDir(currentDir, dirName))
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
                <Input
                    placeholder="Введите название папки"
                    value={dirName}
                    onInput={(e) => setDirName(e.target.value)}
                />
                <button
                    className="popup__submit"
                    onClick={handleCreateDir}
                >Создать</button>
            </div>
        </div>
    );
}

export default Popup;

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../utils/api';
import './Profile.scss'

function Profile() {
    const dispatch = useDispatch()
    const file = useRef()

    function handleDeleteAvatar() {
        dispatch(deleteAvatar())
    }

    function handleUploadAvatar(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className="profile">
            <button
                className='profile__button'
                onClick={handleDeleteAvatar}
            >Удалить аватар</button>
            <label className='profile__label'>
                <button
                    className='profile__button'
                    onClick={() => file.current.click()}
                >Загрузить аватар</button>
                <input
                    ref={file}
                    className='profile__input-file'
                    accept='image/*'
                    type="file"
                    placeholder='Загрузить аватар'
                    onChange={handleUploadAvatar}
                />
            </label>

        </div>
    );
}

export default Profile;

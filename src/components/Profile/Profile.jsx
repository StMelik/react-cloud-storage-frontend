import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvatarAction, uploadAvatarAction } from '../../store/actions/fileActions';
import './Profile.scss'

function Profile() {
    const dispatch = useDispatch()
    const file = useRef()
    const { currentUser } = useSelector(state => state.user)

    const textButton = currentUser.avatar ? "Обновить аватар" : "Загрузить аватар"

    function handleDeleteAvatar() {
        dispatch(deleteAvatarAction())
    }

    function handleUploadAvatar(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatarAction(file))
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="profile__wrapper">
                    <label className='profile__label'>
                        <button
                            className='profile__button'
                            onClick={() => file.current.click()}
                        >{textButton}</button>
                        <input
                            ref={file}
                            className='profile__input-file'
                            accept='image/*'
                            type="file"
                            placeholder='Загрузить аватар'
                            onChange={handleUploadAvatar}
                        />
                    </label>
                    <button
                        className='profile__button'
                        onClick={handleDeleteAvatar}
                    >Удалить аватар</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;

import axios from 'axios'
import { apiConfig } from '../../utils/apiConfig';
import { hideButtonLoaderAction } from '../reducers/appReducer';
import { setUserAction } from '../reducers/userReducer';

export const registrationAction = (values) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('sign-up', values, apiConfig)
            alert(response.data.message)
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        } finally {
            dispatch(hideButtonLoaderAction())
        }
    }

}

export const loginAction = (values) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('sign-in', values, apiConfig)

            dispatch(setUserAction(response.data.user))
            localStorage.setItem('jwt', response.data.token)
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        } finally {
            dispatch(hideButtonLoaderAction())
        }
    }
}

export const authAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('auth', {
                ...apiConfig,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

            dispatch(setUserAction(response.data.user))
            localStorage.setItem('jwt', response.data.token)
        } catch (e) {
            localStorage.removeItem('jwt')
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

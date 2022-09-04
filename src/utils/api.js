import axios from 'axios'
import { setUserAction } from '../store/reducers/userReducer'
import { addFilrAction, setFiles } from '../store/reducers/fileReducer'
import { apiConfig } from './apiConfig'

export const registration = async (values) => {
    try {
        const response = await axios.post('sign-up', values, apiConfig)
        alert(response.data.message)
    } catch (e) {
        alert('Ошибка! ' + e.response.data.message)
    }
}

export const login = (values) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('sign-in', values, apiConfig)

            dispatch(setUserAction(response.data.user))
            localStorage.setItem('jwt', response.data.token)
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

export const auth = () => {
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

export const getFiles = (dirId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('files', {
                ...apiConfig,
                params: {
                    parent: dirId
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

            dispatch(setFiles(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

export const createDir = (dirId, name) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('files',
                { name, parent: dirId, type: 'dir' },
                {
                    ...apiConfig,
                    params: {
                        parent: dirId
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })

            dispatch(addFilrAction(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

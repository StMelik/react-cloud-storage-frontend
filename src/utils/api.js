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

export const uploadFile = (file, dirId) => {
    return async (dispatch) => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if (dirId) {
                formData.append('parent', dirId)
            }

            const response = await axios.post('files/upload',
                formData,
                {
                    ...apiConfig,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                    onUploadProgress: ProgressEvent => {
                        const totalLength = ProgressEvent.lengthComputable ? ProgressEvent.total : ProgressEvent.target.getResponseHeader('content-length') || ProgressEvent.target.getResponseHeader('x-decompressed-content-length')
                        console.log('totalLength', totalLength);

                        if (totalLength) {
                            let progress = Math.round((ProgressEvent.loaded * 100) / totalLength)
                            console.log('progress', progress);
                        }
                    }
                })

            dispatch(addFilrAction(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

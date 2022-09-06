import axios from 'axios'
import { setUserAction } from '../store/reducers/userReducer'
import { addFilrAction, deleteFileAction, setFiles } from '../store/reducers/fileReducer'
import { apiConfig } from './apiConfig'
import { addUploadFileAction, changeUploadFileAction, showUploaderAction } from '../store/reducers/uploadReducer'
import uniqid from 'uniqid';
import { hideLoaderAction, showLoaderAction } from '../store/reducers/appReducer'

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

export const getFiles = (dirId, sort) => {
    return async (dispatch) => {
        try {
            dispatch(showLoaderAction())
            const response = await axios.get('files', {
                ...apiConfig,
                params: {
                    parent: dirId,
                    sort
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

            dispatch(setFiles(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        } finally {
            dispatch(hideLoaderAction())
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

            const uploadFile = {
                id: uniqid(),
                name: file.name,
                progress: 0
            }
            dispatch(showUploaderAction())
            dispatch(addUploadFileAction(uploadFile))

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
                            uploadFile.progress = Math.round((ProgressEvent.loaded * 100) / totalLength)
                            dispatch(changeUploadFileAction(uploadFile))
                        }
                    }
                })

            dispatch(addFilrAction(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

export const downloadFile = async (file) => {
    try {
        const response = await axios.get('files/download',
            {
                ...apiConfig,
                params: {
                    id: file._id
                },
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

        const downloadLink = URL.createObjectURL(response.data)
        const linkElement = document.createElement('a')
        linkElement.href = downloadLink
        linkElement.download = file.name
        document.body.appendChild(linkElement)
        linkElement.click()
        linkElement.remove()

    } catch (e) {
        alert('Ошибка! ' + e.response.data.message)
    }
}

export const deleteFile = (file) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete('files',
                {
                    ...apiConfig,
                    params: {
                        id: file._id
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                })

            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

export const searchFile = (query) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('files/search',
                {
                    ...apiConfig,
                    params: {
                        search: query
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                })

            dispatch(setFiles(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        } finally {
            dispatch(hideLoaderAction())
        }
    }
}

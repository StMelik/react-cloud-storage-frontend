import axios from 'axios'
import uniqid from 'uniqid';
import { apiConfig } from '../../utils/apiConfig'
import { setUserAction } from '../reducers/userReducer'
import { addFilrAction, deleteFileAction, setFiles } from '../reducers/fileReducer'
import { addUploadFileAction, changeUploadFileAction, showUploaderAction } from '../reducers/uploadReducer'
import { hideLoaderAction, showLoaderAction } from '../reducers/appReducer'

export const getFilesAction = (dirId, sort) => {
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

export const createDirAction = (dirId, name) => {
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

export const uploadFileAction = (file, dirId) => {
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

export const downloadFileAction = async (file) => {
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

export const deleteFileBdAction = (file) => {
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

export const searchFileAction = (query) => {
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

export const uploadAvatarAction = (file) => {
    return async (dispatch) => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await axios.post('files/avatar',
                formData,
                {
                    ...apiConfig,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                })

            dispatch(setUserAction(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

export const deleteAvatarAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.delete('files/avatar',
                {
                    ...apiConfig,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                })

            dispatch(setUserAction(response.data))
        } catch (e) {
            alert('Ошибка! ' + e.response.data.message)
        }
    }
}

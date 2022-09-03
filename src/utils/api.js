import axios from 'axios'
import { apiConfig } from './apiConfig'

export const registration = async (values) => {
    try {
        const response = await axios.post('sign-up', values, apiConfig)
        alert(response.data.message)
    } catch (e) {
        alert('Ошибка! ' + e.response.data.message)
    }
}
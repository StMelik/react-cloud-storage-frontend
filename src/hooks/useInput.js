import { useState } from "react"


export const useInput = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues)

    const onChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setValues({
            ...values,
            [name]: value
        })
    }

    return { values, onChange }
}
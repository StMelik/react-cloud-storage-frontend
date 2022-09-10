const SHOW_LOADER = "SHOW_LOADER"
const HIDE_LOADER = "HIDE_LOADER"
const SHOW_BUTTON_LOADER = "SHOW_BUTTON_LOADER"
const HIDE_BUTTON_LOADER = "HIDE_BUTTON_LOADER"

const initialState = {
    loader: false,
    buttonLoader: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loader: true }
        case HIDE_LOADER:
            return { ...state, loader: false }
        case SHOW_BUTTON_LOADER:
            return { ...state, buttonLoader: true }
        case HIDE_BUTTON_LOADER:
            return { ...state, buttonLoader: false }
        default:
            return state
    }
}

export const showLoaderAction = () => ({ type: SHOW_LOADER })
export const hideLoaderAction = () => ({ type: HIDE_LOADER })
export const showButtonLoaderAction = () => ({ type: SHOW_BUTTON_LOADER })
export const hideButtonLoaderAction = () => ({ type: HIDE_BUTTON_LOADER })

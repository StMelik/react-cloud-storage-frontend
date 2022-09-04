const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const ADD_FILE = "ADD_FILE"
const SET_POPUP_OPENED = "SET_POPUP_OPENED"

const initialState = {
    files: [],
    currentDir: null,
    popupOpened: false,
}

export const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES:
            return { ...state, files: action.payload }
        case SET_CURRENT_DIR:
            return { ...state, currentDir: action.payload }
        case ADD_FILE:
            return { ...state, files: [...state.files, action.payload] }
        case SET_POPUP_OPENED:
            return { ...state, popupOpened: action.payload }
        default:
            return state
    }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurrentDir = (dir) => ({ type: SET_FILES, payload: dir })
export const addFilrAction = (file) => ({ type: ADD_FILE, payload: file })
export const setPopupOpenedAction = (status) => ({ type: SET_POPUP_OPENED, payload: status })


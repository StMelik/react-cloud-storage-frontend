const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"
const ADD_FILE = "ADD_FILE"
const SET_POPUP_OPENED = "SET_POPUP_OPENED"
const PUSH_TO_STACK = "PUSH_TO_STACK"
const POP_TO_STACK = "POP_TO_STACK"
const DELETE_FILE = "DELETE_FILE"
const SET_VIEW = "SET_VIEW"

const initialState = {
    files: [],
    currentDir: null,
    popupOpened: false,
    dirStack: [],
    view: 'list'
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
        case PUSH_TO_STACK:
            return { ...state, dirStack: [...state.dirStack, action.payload] }
        case POP_TO_STACK:
            return { ...state, dirStack: state.dirStack.slice(0, -1) }
        case DELETE_FILE:
            return { ...state, files: state.files.filter(file => file._id !== action.payload) }
        case SET_VIEW:
            return { ...state, view: action.payload }
        default:
            return state
    }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir })
export const addFilrAction = (file) => ({ type: ADD_FILE, payload: file })
export const setPopupOpenedAction = (status) => ({ type: SET_POPUP_OPENED, payload: status })
export const pushToStackAction = (dir) => ({ type: PUSH_TO_STACK, payload: dir })
export const popFromStackAction = () => ({ type: POP_TO_STACK })
export const deleteFileAction = (fileId) => ({ type: DELETE_FILE, payload: fileId })
export const setViewAction = (view) => ({ type: SET_VIEW, payload: view })

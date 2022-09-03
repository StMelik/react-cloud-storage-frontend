const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"


const initialState = {
    currentUser: null,
    isAuth: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('jwt')

            return {
                ...state,
                currentUser: null,
                isAuth: false
            }
        default:
            return state
    }
}

export const setUserAction = (user) => ({ type: SET_USER, payload: user })
export const logoutAction = () => ({ type: LOGOUT })

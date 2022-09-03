import { combineReducers } from "redux";
import { fileReducer } from "./fileReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
})

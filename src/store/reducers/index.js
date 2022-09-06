import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { fileReducer } from "./fileReducer";
import { uploadReducer } from "./uploadReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer,
})

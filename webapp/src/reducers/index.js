import { combineReducers } from "redux";
import websiteReducer from './websiteReducer';
import errorReducer from "./errorReducer";


export default combineReducers({
    website: websiteReducer,
    error: errorReducer,
});
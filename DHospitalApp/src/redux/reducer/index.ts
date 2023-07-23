import appointmentListReducer from './appointmentList';
import cureHistoryListReducer from './cureHistorySlice';
import cureHistoryDetailsReducer from './cureHistoryDetailsSlice'

import { combineReducers } from "redux";
import userReducer, { setInfoUser, setRole, setUsername, userLogout, setStatus, getLoginInfo} from "./userSlice"
import appointmentReducer from "./appointmentSlice"

const rootReducer = combineReducers({
    user: userReducer,
    appointment: appointmentReducer,
    appointmentList: appointmentListReducer,
    cureHistoryList: cureHistoryListReducer,
    cureHistoryDetails: cureHistoryDetailsReducer
});

export default rootReducer;

export {
    setRole, setUsername, setInfoUser, userLogout, setStatus, getLoginInfo,
    
}

import { combineReducers } from "redux";
import userReducer, { setInfoUser, setRole, setUsername, userLogout, setStatus, getLoginInfo} from "./userSlice"
import appointmentReducer from "./appointmentSlice"

const rootReducer = combineReducers({
    user: userReducer,
    appointment: appointmentReducer,
});

export default rootReducer;

export {
    setRole, setUsername, setInfoUser, userLogout, setStatus, getLoginInfo,
    
}
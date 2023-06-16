
import { combineReducers } from "redux";
import userReducer, { setInfoUser, setRole, setUsername, userLogout, setStatus, getLoginInfo} from "./userSlice"

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;

export {
    setRole, setUsername, setInfoUser, userLogout, setStatus, getLoginInfo
}
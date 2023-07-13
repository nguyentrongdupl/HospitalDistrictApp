
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, AccountRole } from '../../utils/enum';
import { ApiGet, loginApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../api/config/axios';

interface CurrentUserState {
    role: AccountRole | null;
    username: string | null;
    info: IUserInfo | null;
    status: ApiStatus;
}

export interface IUserInfo {
  address: string;
  avatar: string;
  bloodPressureDiastolic: number;
  bloodPressureSystolic: number;
  dateOfBirth: string;
  email: string;
  fullname: string;
  gender: number;
  glucose: number;
  heartRate: number;
  height: number;
  hospitalization: number;
  identification: string;
  insurance: string;
  phonenumber: string;
  temperature: number;
  userId: string;
  weight: number
}

const initialState: CurrentUserState = {
    role: null,
    username: null,
    info: {
      address: '',
      avatar: '',
      bloodPressureDiastolic: 0,
      bloodPressureSystolic: 0,
      dateOfBirth: '',
      email: '',
      fullname: '',
      gender: 0,
      glucose: 0,
      heartRate: 0,
      height: 0,
      hospitalization: 0,
      identification: '',
      insurance: '',
      phonenumber: '',
      temperature: 0,
      userId: '',
      weight: 0
    },
    status: ApiStatus.None
};

async function StorageSave(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export const getLoginInfo = createAsyncThunk(
  "login",
  async (req: {username: string, password: string}) => {
    const res = await loginApi(req);    
    return res.data;
  }
);

export const getCurrentUserInfo = createAsyncThunk(
  "getCurrentUserInfo",
  async () => {
    const res = await ApiGet(`${baseURL}/auth/infocurrentuser`);
    return res.data;    
  }
);


export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
    },
    setUsername: (state, action) => {
        state.username = action.payload
    },
    setInfoUser: (state, action) => {
        state.info = action.payload
    },
    userLogout: (state) => {
        state.role = null,
        state.username = null,
        state.info = null
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(getLoginInfo.pending, (state) =>{
      state.status = ApiStatus.Loading;
    })
    .addCase(getLoginInfo.fulfilled, (state, action) => {
        state.status =ApiStatus.Success;
        const {accessToken, refreshToken, role, username } = action.payload;
        
        StorageSave("accessToken", accessToken);
        StorageSave("refreshToken", refreshToken);
        StorageSave("username", username);
        state.role = role;
        state.username = username;
    })
    .addCase(getLoginInfo.rejected, (state) =>{
      state.status = ApiStatus.Failed;
    })

    .addCase(getCurrentUserInfo.pending, (state) =>{
      state.status = ApiStatus.Loading;
    })
    .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        state.status =ApiStatus.Success;
        state.info = action.payload;
    })
    .addCase(getCurrentUserInfo.rejected, (state) =>{
      state.status = ApiStatus.Failed;
    })
  },
});

export const { setRole, setUsername, setInfoUser, userLogout, setStatus } = userSlice.actions;

export default userSlice.reducer;


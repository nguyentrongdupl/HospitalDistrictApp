
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, AccountRole } from '../../utils/enum';
import { loginApi } from '../../api';

interface CurrentUserState {
    role: AccountRole | null;
    username: string | null;
    info: any;
    status: ApiStatus;
}

const initialState: CurrentUserState = {
    role: null,
    username: null,
    info: {},
    status: ApiStatus.None
};

export const getLoginInfo = createAsyncThunk(
  "login",
  async (req: {username: string, password: string}) => {
    const res = await loginApi(req);    
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
        state.role = action.payload.role;
        state.username = action.payload.username;
    })
    .addCase(getLoginInfo.rejected, (state) =>{
      state.status = ApiStatus.Failed;
    })
  },
});

export const { setRole, setUsername, setInfoUser, userLogout, setStatus } = userSlice.actions;

export default userSlice.reducer;


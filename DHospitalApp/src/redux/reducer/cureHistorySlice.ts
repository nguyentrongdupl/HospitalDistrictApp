
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiPost } from '../../api';
import { baseURL } from '../../api/config/axios';
import { ApiStatus } from '../../utils/enum';

interface ICureHistory{
    _id: string;
    address: string;
    appointmentDate: string;
    dateOfBirth: string;
    departmentId: string;
    departmentName: string;
    doctorId: string;
    email: string;
    fullname: string;
    gender: number;
    identification: string;
    initialSymptom: string;
    patientId: string;
    phonenumber: string;
    position: number;
    rank: number;
    statusAppointment: number;
    typeAppointment: number;
    userId: string;
}

interface CureHistoryListState {
    cureHistoryList: ICureHistory[];
    status: ApiStatus;
}

export interface ICureHistoryListReq{
    page: number;
    pageSize: number;
    searchKey: string;
    tableType: number;
}

export const getCureHistoryList = createAsyncThunk(
    "cureHistoryList/get",
    async(req: ICureHistoryListReq) => {
        const res = await ApiPost(`${baseURL}/healthcare/gethistorymedical`, req);
        console.log(res.data);
        
        return res.data;
    }
)

const initialState: CureHistoryListState = {
    cureHistoryList: [],
    status: ApiStatus.None,
};


export const cureHistoryListSlice = createSlice({
  name: 'cureHistoryList',
  initialState,
  reducers: {
    resetHistoryListStatus: (state) => {
        state.status = ApiStatus.None;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(getCureHistoryList.pending, (state) =>{
      state.status = ApiStatus.Loading;
    })
    .addCase(getCureHistoryList.fulfilled, (state, action) => {
            state.status =ApiStatus.Success;
            state.cureHistoryList = action.payload.values || [];
    })
    .addCase(getCureHistoryList.rejected, (state) =>{
      state.status = ApiStatus.Failed;
    })
  },
});

export const {resetHistoryListStatus} = cureHistoryListSlice.actions;

export default cureHistoryListSlice.reducer;


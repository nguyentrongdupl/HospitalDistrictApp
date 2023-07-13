import { appointmentSlice } from './appointmentSlice';
import { AppointmentList } from './../../screen/AppointmentList/AppointmentList';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, AccountRole } from '../../utils/enum';
import { ApiGet, ApiPost, loginApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../api/config/axios';

interface IAppointment{
    __v: number;
    _id: string;
    appointmentDate: string;
    departmentName: string;
    doctorId: string;
    doctorName: string;
    doctorPosition: number;
    doctorRank: number;
    initialSymptom: string;
    patientId: string;
    status: number;
    typeAppointment: number
}

interface AppointmentListState {
    appointmentList: IAppointment[];
    status: ApiStatus;
}

export interface IAppointmentListReq{
    page: number;
    pageSize: number;
    searchKey: string;
    tableType: number;
}

export const getAppointmentList = createAsyncThunk(
    "appointmentList/get",
    async(req: IAppointmentListReq) => {
        const res = await ApiPost(`${baseURL}/schedule/getlistrequestmedical`, req);
        console.log(res.data);
        
        return res.data;
    }
)

const initialState: AppointmentListState = {
    appointmentList: [],
    status: ApiStatus.None,
};


export const appointmentListSlice = createSlice({
  name: 'appointmentList',
  initialState,
  reducers: {
    resetListStatus: (state) => {
        state.status = ApiStatus.None;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(getAppointmentList.pending, (state) =>{
      state.status = ApiStatus.Loading;
    })
    .addCase(getAppointmentList.fulfilled, (state, action) => {
            state.status =ApiStatus.Success;
            state.appointmentList = action.payload.values || [];
    })
    .addCase(getAppointmentList.rejected, (state) =>{
      state.status = ApiStatus.Failed;
    })
  },
});

export const {resetListStatus} = appointmentListSlice.actions;

export default appointmentListSlice.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, AccountRole } from '../../utils/enum';
import { ApiGet, ApiPost, loginApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../api/config/axios';
import { DoctorInfomation } from '../../utils/model';

export interface IFilter {
  page: number;
  pageSize: number;
  tableType: number;
  searchKey: string;
  departmentId: string;
}

interface ISubReq {
  departmentId: string;
  appointmentDate: string;
  initialSymptom: string;
  doctorId: string;
}

interface appointmentState {
  department: {
    _id: string,
    departmentCode: number,
    departmentName: string,
  }[],
  departmentStatus: ApiStatus;
  doctorList: DoctorInfomation[];
  doctorStatus: ApiStatus;
  filter: {
    page: number;
    pageSize: number;
    tableType: number;
    searchKey: string;
    departmentId: string;
  };
  submitStatus: ApiStatus;
}

const initialState: appointmentState = {
  department: [],
  departmentStatus: ApiStatus.None,
  doctorList: [],
  doctorStatus: ApiStatus.None,
  filter: {
    page: 1,
    pageSize: 10,
    tableType: 5,
    searchKey: "",
    departmentId: "",
  },
  submitStatus: ApiStatus.None
};

export const getAllDepartment = createAsyncThunk(
  "appointment/getAllDepartment",
  async () => {
    const res = await ApiGet(`${baseURL}/department/getall`);
    return res.data;
  }
);

export const getDoctorByDepartment = createAsyncThunk(
  "appointment/getDoctor",
  async (req: IFilter) => {
    const res = await ApiPost(`${baseURL}/department/getalldoctors`, req);
    return res.data.values;
  }
)

export const submitAppointment = createAsyncThunk(
  "appointment/submitAppointment",
  async (req: ISubReq) => {
    const res = await ApiPost(`${baseURL}/schedule/requestmedical`,req);
    return res;
  }
)


export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    resetDepartmentStatus: (state) => {
      state.departmentStatus = ApiStatus.None
    },
    resetDoctorStatus: (state) => {
      state.doctorStatus = ApiStatus.None
    },
    resetSubmitStatus: (state) => {
      state.submitStatus = ApiStatus.None
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDepartment.pending, (state) => {
        state.departmentStatus = ApiStatus.Loading;
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {
        state.departmentStatus = ApiStatus.Success;
        state.department = action.payload || [];
      })
      .addCase(getAllDepartment.rejected, (state) => {
        state.departmentStatus = ApiStatus.Failed;
      })

      //
      .addCase(getDoctorByDepartment.pending, (state) => {
        state.doctorStatus = ApiStatus.Loading;
      })
      .addCase(getDoctorByDepartment.fulfilled, (state, action) => {
        state.doctorStatus = ApiStatus.Success;
        state.doctorList = action.payload || [];
      })
      .addCase(getDoctorByDepartment.rejected, (state) => {
        state.doctorStatus = ApiStatus.Failed;
      })

      // submit appointment
      .addCase(submitAppointment.pending, (state) => {
        state.submitStatus = ApiStatus.Loading;
      })
      .addCase(submitAppointment.fulfilled, (state, action) => {
        if(action.payload.status === 0){
          state.submitStatus = ApiStatus.Success;
        } else {
          state.submitStatus = ApiStatus.Failed;
        }
      })
      .addCase(submitAppointment.rejected, (state) => {
        state.submitStatus = ApiStatus.Failed;
      })
  },
});

export const { resetDepartmentStatus, resetDoctorStatus, resetSubmitStatus } = appointmentSlice.actions;

export default appointmentSlice.reducer;


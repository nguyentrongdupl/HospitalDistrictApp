
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiGet, ApiPost } from '../../api';
import { baseURL } from '../../api/config/axios';
import { ApiStatus } from '../../utils/enum';

interface ICureHistoryDetails {
    appointmentDate: string,
    _id: string,
    patientId: string,
    typeAppointment: number,
    initialSymptom: string,
    statusAppointment: number,
    doctorId: string,
    departmentId: string,
    departmentName: string,
    userId: string,
    rank: number,
    position: number,
    dateOfBirth: string,
    email: string,
    fullname: string,
    phonenumber: string,
    gender: number,
    address: string,
    identification: string,
    historyId: string,
    hospitalizationCount: number,
    healthIndicator: {
        heartRate: number,
        temperature: number,
        bloodPressureSystolic: number,
        bloodPressureDiastolic: number,
        glucose: number,
        weight: number,
        height: number,
        _id: string
    },
    summary: string,
    testResult: {
        _id: string,
        detailsFileCloud: string,
        doctorId: string,
        historyId: string,
        reason: string,
        service: number,
        serviceId: string,
    }[],
    medication:
    {
        name: string,
        designation: string,
        usage: string
        price: number
    }[],
    diseases:
    {
        diseasesCode: string,
        diseasesName: string,
        symptom: string,
        prevention: string
    }[],
    note: string
}

interface CureHistoryDetailsState {
    cureHistoryDetails: ICureHistoryDetails;
    status: ApiStatus;
}

// export interface ICureHistoryDetailsReq{
//     page: number;
//     pageSize: number;
//     searchKey: string;
//     tableType: number;
// }

export const getCureHistoryDetails = createAsyncThunk(
    "cureHistoryDetails/get",
    async (id: string) => {
        const res = await ApiGet(`${baseURL}/healthcare/gethistorymedicaldetails?id=${id}`);
        return res.data;
    }
)

const initialState: CureHistoryDetailsState = {
    cureHistoryDetails: {
        appointmentDate: "",
        _id: "",
        patientId: "",
        typeAppointment: 0,
        initialSymptom: "",
        statusAppointment: 0,
        doctorId: "",
        departmentId: "",
        departmentName: "",
        userId: "",
        rank: 0,
        position: 0,
        dateOfBirth: "",
        email: "",
        fullname: "",
        phonenumber: "",
        gender: 0,
        address: "",
        identification: "",
        historyId: "",
        hospitalizationCount: 0,
        healthIndicator: {
            heartRate: 0,
            temperature: 0,
            bloodPressureSystolic: 0,
            bloodPressureDiastolic: 0,
            glucose: 0,
            weight: 0,
            height: 0,
            _id: ""
        },
        summary: "",
        testResult: [],
        medication:[],
        diseases: [],
        note: ""
    },
    status: ApiStatus.None,
};


export const cureHistoryDetailsSlice = createSlice({
    name: 'cureHistoryDetails',
    initialState,
    reducers: {
        resetHistoryListStatus: (state) => {
            state.status = ApiStatus.None;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getCureHistoryDetails.pending, (state) => {
                state.status = ApiStatus.Loading;
            })
            .addCase(getCureHistoryDetails.fulfilled, (state, action) => {
                state.status = ApiStatus.Success;
                state.cureHistoryDetails = action.payload;
            })
            .addCase(getCureHistoryDetails.rejected, (state) => {
                state.status = ApiStatus.Failed;
            })
    },
});

export const { resetHistoryListStatus } = cureHistoryDetailsSlice.actions;

export default cureHistoryDetailsSlice.reducer;



import axios from "axios";
import apiClient, { baseURL } from "./config/axios";


const api = {
    //auth
    login: `${baseURL}/auth/login`,
    checkcurrentuser: `/auth`,
    getInfoCurrentUser: '/auth/infocurrentuser',
    editPersonalInfo : '/auth/edit',

    // account
    createDoctor: '/account/registerdoctor',
    getAllDoctor: '/account/getalldoctor',
    getAllPatient: '/account/getallpatient',
    
    //healthcare
    getPatientByInsurance: '/healthcare/searchinsurance', // change
    createPatient: '/healthcare/registerpatient',
    getWaitPatient: '/healthcare/getallpatient',
    getPatientById: '/healthcare/getinfobyuserid',


    //department
    getAllDepartment: '/department/getall',

    //diseases
    getAllDiseases:'/diseases/getalldiseases',
    createDiseases: '/diseases/creatediseases',
    editDiseases: '/diseases/editdiseases',
    
    //pills
    getAllMedication: '/medication/getallmedications',
    createMedication: '/medication/createmedication',
    editMedication: '/medication/editmedication'

}

const authApi = {
    //only login use axios, other use apiclient
    login: (reqbody: any) => {
        return axios.post(api.login, reqbody);
    },
    //
    checkCurrentUser: () => apiClient.get(api.checkcurrentuser),
    getInfoCurrentUser: () => apiClient.get(api.getInfoCurrentUser),
    editPersonalInfo: (reqbody: any) => {
        return apiClient.post(api.editPersonalInfo, reqbody)
    }
}

const accountApi = {
    //
    getAllDoctor: () => apiClient.get(api.getAllDoctor),
    createDoctor: (reqbody: any) => {
        return apiClient.post(api.createDoctor, reqbody)
    },

    getAllPatient: () => apiClient.get(api.getAllPatient),
    createPatient: (reqbody: any) => {
        return apiClient.post(api.createPatient, reqbody)
    },
}

const cureProcessApi = {    

    getPatientByInsurance: (reqbody: any) => {
        return apiClient.post(api.getPatientByInsurance, reqbody);
    },
    getWaitPatient: (reqbody: any) => {
        return apiClient.post(api.getWaitPatient, reqbody);
    },
    getPatientById: (reqbody: any) => {
        return apiClient.post(api.getPatientById, reqbody);
    }
}

const departmentApi = {
    getAllDepartment: () => apiClient.get(api.getAllDepartment),
}

const diseasesApi = {
    getAllDiseases: () => apiClient.get(api.getAllDiseases),
    createDiseases: (reqbody: any) => {
        return apiClient.post(api.createDiseases,reqbody)
    },
    editDiseases: (reqbody: any) => {
        return apiClient.post(api.editDiseases,reqbody)
    }
}

const medicationApi = {
    getAllMedication: () => apiClient.get(api.getAllMedication),
    createMedication: (reqbody: any) => {
        return apiClient.post(api.createMedication, reqbody)
    },
    editMedication: (reqbody: any) => {
        return apiClient.post(api.editMedication, reqbody)
    }
}

const Api = {
    authApi, 
    accountApi, 
    cureProcessApi,
    departmentApi,
    diseasesApi,
    medicationApi
  };
export default Api;

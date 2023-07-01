import axios from "axios";
import apiClient, { baseURL } from "./config/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = {
    //auth
    login: `${baseURL}/auth/login`,
    checkcurrentuser: `/auth`,
    getInfoCurrentUser: '/auth/infocurrentuser',
    editPersonalInfo : '/auth/edit',

    // account
    createDoctor: '/account/registerdoctor',
    getAll: '/account/getall',
    
    //healthcare
    getPatientByInsurance: '/healthcare/searchinsurance', // change
    createPatient: '/healthcare/registerpatient',
    getWaitedPatient: '/schedule/schedulewait',
    getPatientById: '/healthcare/getinfobyuserid',


    //department
    getAllDepartment: '/department/getall',
    getAllDoctorInDepartment: '/department/getalldoctors',

    //diseases
    getAllDiseases:'/diseases/getall',
    createDiseases: '/diseases/creatediseases',
    editDiseases: '/diseases/editdiseases',
    
    //pills
    getAllMedication: '/medication/getall',
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
        return apiClient.put(api.editPersonalInfo, reqbody)
    }
}

const accountApi = {
    //
    getAll: (reqbody: any) => apiClient.post(api.getAll, reqbody),
    createDoctor: (reqbody: any) => {
        return apiClient.post(api.createDoctor, reqbody)
    },
    createPatient: (reqbody: any) => {
        return apiClient.post(api.createPatient, reqbody)
    },
}

const cureProcessApi = {    

    getPatientByInsurance: (reqbody: any) => {
        return apiClient.post(api.getPatientByInsurance, reqbody);
    },
    getWaitedPatient: (reqbody: any) => {
        return apiClient.post(api.getWaitedPatient, reqbody);
    },  
    getPatientById: (reqbody: any) => {
        return apiClient.post(api.getPatientById, reqbody);
    }
}

const departmentApi = {
    getAllDepartment: () => apiClient.get(api.getAllDepartment),
    getAllDepartmentForTable: (reqbody: any) => apiClient.post(api.getAllDepartment, reqbody),
    getAllDoctorInDepartment: (reqbody: any) => apiClient.post(api.getAllDoctorInDepartment, reqbody)
}

const diseasesApi = {
    getAllDiseases: (reqbody: any) => apiClient.post(api.getAllDiseases, reqbody),
    createDiseases: (reqbody: any) => {
        return apiClient.post(api.createDiseases,reqbody)
    },
    editDiseases: (reqbody: any) => {
        return apiClient.put(api.editDiseases,reqbody)
    }
}

const medicationApi = {
    getAllMedication: (reqbody: any) => apiClient.post(api.getAllMedication, reqbody),
    createMedication: (reqbody: any) => {
        return apiClient.post(api.createMedication, reqbody)
    },
    editMedication: (reqbody: any) => {
        return apiClient.put(api.editMedication, reqbody)
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

export const loginApi = (reqbody: any) =>  fetch(`${baseURL}/auth/login`, {
    headers: {
        "Content-Type": "application/json",
      },
    method: "POST",
    body: JSON.stringify(reqbody),
  }).then(res =>res.json())
  .then(response => {
    return response;
  })

  const getToken = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  export const ApiGet = async (url: string) => fetch(url, {
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${ await getToken('accessToken')}`
    },
    method: "GET",
  }).then(res =>res.json())
  .then(response => {    
    return response;
  }).catch(err => console.log(err))

  export const ApiPost = async (url: string, reqbody?: any) => fetch(url, {
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${await getToken('accessToken')}`
    },
    method: "POST",
    body: JSON.stringify(reqbody),
  }).then(res =>res.json())
  .then(response => {
    return response;
  })

  export const post = (url : string, reqbody?: any) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8", 
        "Authorization": `Bearer ${getToken('accessToken')}`},
      body: JSON.stringify(reqbody),
    }).then(response => response.json())
      .then(data => {
        if(data.status === 403 && data.message === "TokenExpiredError") {
          //clear localStorage
          // navigate to login 
        } else {
          return data;
        }
      }).catch(err => console.log(err))
  }

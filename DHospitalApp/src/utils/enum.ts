export enum AccountRole {
    Doctor,
    Patient,
    Admin
}
export enum ApiStatusCode {
    OK = 200,
    Created = 201,

    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    Forbidden = 403,

    ServerError = 500,
}

export enum ApiStatus {
    None,
    Loading,
    Success,
    Failed,
}

export enum DepartmentType {
    tiepDon,
    noiTongHop,
    ngoai,
    canLamSang,
    san,
    daLieu,
    dongY,
    truyenNhiem,
    duoc,
    nhi,
    thanNhanTao
}

export enum DoctorRank {
    thacSi,
    tienSi,
    PGSTS,
    GSTS,
    none
}

export enum DoctorPosition {
    dean,
    viceDean,
    none
}

export enum ScheduleRequestStatus {
    wait,
    accpect,
    reject
}

export enum TypeAppointmentSchedule {
    khamTheoYeuCau,
    khamThuong,
    khamTheoBHYT,
    khamTheoChiDinh,
}

export const MappingTypeAppointmentSchedule = {
    [TypeAppointmentSchedule.khamTheoYeuCau]: 'Khám theo yêu cầu',
    [TypeAppointmentSchedule.khamThuong]: 'Khám thường',
    [TypeAppointmentSchedule.khamTheoBHYT]: 'Khám theo BHYT',
    [TypeAppointmentSchedule.khamTheoChiDinh]: 'Khám theo chỉ định',
}

export enum TypeOfTest {
    sinhHoa,
    dongMau,
    huyetHoc,
    nuocTieu,
    sieuAm,
    dienTim,
    chupXQuang,
    chupCT
}

export const TestList = {
    [TypeOfTest.sinhHoa]: "Xét nghiệm sinh hóa",
    [TypeOfTest.dongMau]: "Xét nghiệm đông máu",
    [TypeOfTest.huyetHoc]: "Xét nghiệm máu",
    [TypeOfTest.nuocTieu]: "Xét nghiệm nước tiểu",
    [TypeOfTest.sieuAm]: "Siêu âm",
    [TypeOfTest.dienTim]: "Điện tâm đồ (Điện tim)",
    [TypeOfTest.chupXQuang]: "Chụp X quang",
    [TypeOfTest.chupCT]: "Chụp cắt lớp vi tính (CT)",
  }
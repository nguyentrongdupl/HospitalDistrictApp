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

export enum DoctorRank{
    thacSi,
    tienSi,
    PGSTS,
    GSTS,
    none
}

export enum DoctorPosition{
    dean,
    viceDean,
    none
}
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
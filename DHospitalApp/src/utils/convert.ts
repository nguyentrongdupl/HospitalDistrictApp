import { DoctorPosition, DoctorRank, ScheduleRequestStatus } from "./enum";

export const getGender = (gender: number) => {
    return gender ? "Nữ" : "Nam"
}

export const getDoctorRank = (rank: DoctorRank) => {
    switch (rank) {
        case DoctorRank.thacSi:
            return 'Thạc sĩ';
        case DoctorRank.tienSi:
            return 'Tiến sĩ';
        case DoctorRank.PGSTS:
            return 'Ph.Giáo sư, Tiến sĩ';
        case DoctorRank.GSTS:
            return 'Giáo sư, Tiến sĩ';
        default:
            return 'Bác sĩ';
    }
}

export const getDoctorPosition = (pos: DoctorPosition) => {
    switch (pos) {
        case DoctorPosition.viceDean:
            return 'Phó khoa';
        case DoctorPosition.dean:
            return 'Trưởng khoa'
        default:
            return 'Bác sĩ';
    }
}

export const getDatestringtoMMDDYYYY = (str: string) => {
    var dateString = new Date(str);
    return ((dateString.getMonth() > 8) ? (dateString.getMonth() + 1) : ('0' + (dateString.getMonth() + 1))) + '/' + ((dateString.getDate() > 9) ? dateString.getDate() : ('0' + dateString.getDate())) + '/' + dateString.getFullYear()
}

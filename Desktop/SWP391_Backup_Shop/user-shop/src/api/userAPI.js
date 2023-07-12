import axiosClient from '../api/axiosClient';

const END_POINT = {
    USER: "api/users",
    AUTHENTICATION: "api/users/authentication"
}

//Authentication for ADMIN
export const loginAPI = (username, password) => {
    return axiosClient.get(`${END_POINT.USER}?username=${username}&password=${password}`)
}

export const authenticationAPI = (token) => {
    return axiosClient.get(`${END_POINT.AUTHENTICATION}?token=${token}`)
}
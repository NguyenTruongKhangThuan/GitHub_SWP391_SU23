import axiosClient from "../api/axiosClient";

const END_POINT = {
  USER: "api/users",
  AUTHENTICATION: "api/users/authentication",
};

//User API
export const loginAPI = (username, password) => {
  return axiosClient.get(
    `${END_POINT.USER}?username=${username}&password=${password}`
  );
};

export const signUpAPI = (data, confirmPassword) => {
  return axiosClient.post(
    `${END_POINT.USER}?confirmPassword=${confirmPassword}`,
    data
  );
};

export const updateUserAPI = (data) => {
  return axiosClient.put(`${END_POINT.USER}`, data);
};

export const readUserInfoAPI = (token) => {
  return axiosClient.get(`${END_POINT.USER}/${token}`);
};

//Authentication
export const authenticationAPI = (token) => {
  return axiosClient.get(`${END_POINT.AUTHENTICATION}?token=${token}`);
};

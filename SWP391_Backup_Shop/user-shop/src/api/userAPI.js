import axiosClient from "../api/axiosClient";

const END_POINT = {
  USER: "api/users",
  AUTHENTICATION: "api/users/authentication",
  INFO: "api/users/info",
  PAYMENT: "api/payments",
  ORDERDETAILS: "api/orderdetails",
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

//Infor API
export const getUserInfoAPI = (token) => {
  return axiosClient.get(`${END_POINT.INFO}?token=${token}`);
};

//Payments API
export const getUserPaymentsAPI = (userID) => {
  return axiosClient.get(`${END_POINT.PAYMENT}?userId=${userID}`);
};

//OrderDetails API
export const getOrderDetailsAPI = (orderID) => {
  return axiosClient.get(`${END_POINT.ORDERDETAILS}?orderId=${orderID}`);
};

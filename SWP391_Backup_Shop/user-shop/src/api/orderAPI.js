import axiosClient from "../api/axiosClient";

const END_POINT = {
  ORDER: "api/orders",
  ORDERDETAIL: "api/orderdetails",
  PAYMENT: "api/payments",
  MOMO: "api/payments/momo",
};

//Order API
export const createOrderAPI = (data) => {
  return axiosClient.post(`${END_POINT.ORDER}`, data);
};

export const deleteOrderAPI = (orderId) => {
  return axiosClient.delete(`${END_POINT.ORDER}?orderId=${orderId}`);
};

//OrderDetail API
export const createOrderDetailAPI = async (data) => {
  return axiosClient.post(`${END_POINT.ORDERDETAIL}`, data);
};

export const getOrderDetailByOrderId = async (orderId) => {
  return axiosClient.get(`${END_POINT.ORDERDETAIL}?orderId=${orderId}`);
};

//MoMo API
export const createMoMoPayment = (data, token) => {
  return axiosClient.post(`${END_POINT.MOMO}?token=${token}`, data);
};

export const getMoMoResult = (extraData, orderId, orderInfo, amount, time) => {
  return axiosClient.get(
    `${END_POINT.MOMO}?extraData=${extraData}&orderId=${orderId}&orderInfo=${orderInfo}&amount=${amount}&time=${time}`
  );
};

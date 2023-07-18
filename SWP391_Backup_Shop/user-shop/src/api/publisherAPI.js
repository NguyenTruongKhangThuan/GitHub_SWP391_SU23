import axiosClient from "../api/axiosClient";

const END_POINT = {
  PUBLISHER: "api/owners",
  PUBLISHEDGAMEPACK: "api/owners/gamepacks",
  PUBLISHEDCOMPONENT: "api/owners/components",
  BESTSELLER: "api/owners/statistic/bestsellers",
  SOLDNUM: "api/owners/statistic/soldnumbers",
};

//Publisher API
export const readPublisherInfoAPI = (token) => {
  return axiosClient.get(`${END_POINT.PUBLISHER}?token=${token}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

//GamePack API
export const createGamePackAPI = (token, data) => {
  return axiosClient.post(`${END_POINT.PUBLISHEDGAMEPACK}`, data, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const getCreatedGamePackAPI = (token, id) => {
  return axiosClient.get(`${END_POINT.PUBLISHEDGAMEPACK}?ownerId=${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const updateGamePackAPI = (token, data) => {
  return axiosClient.put(`${END_POINT.PUBLISHEDGAMEPACK}`, data, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const deleteGamePackAPI = (token, id) => {
  return axiosClient.delete(`${END_POINT.PUBLISHEDGAMEPACK}/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

//Component in GamePack API
export const createComponentAPI = (token, data) => {
  return axiosClient.post(`${END_POINT.PUBLISHEDCOMPONENT}`, data, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const getComponentPack = (token, id) => {
  return axiosClient.get(`${END_POINT.PUBLISHEDCOMPONENT}?ownerId=${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const updateComponentAPI = (token, data) => {
  return axiosClient.put(`${END_POINT.PUBLISHEDCOMPONENT}`, data, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const deleteComponentAPI = (token, id) => {
  return axiosClient.delete(`${END_POINT.PUBLISHEDCOMPONENT}/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

//Statistic API
export const getBestSellerOfPubAPI = (token) => {
  return axiosClient.get(`${END_POINT.BESTSELLER}?token=${token}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const getSoldNumberAPI = (token) => {
  return axiosClient.get(`${END_POINT.SOLDNUM}?token=${token}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

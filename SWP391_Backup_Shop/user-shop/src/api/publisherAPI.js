import axiosClient from "../api/axiosClient";

const END_POINT = {
    OWNER: '/api/owner',
    OWNERGAMEPACKS : '/api/owner/gamepacks',
    OWNERGAMEPACKSCOMPONENTS: '/api/owner/components'
}

export const readOwnerToken = (token) => {
    return axiosClient.get(`${END_POINT.OWNER}/${token}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
    });
}

//owner game packs API
export const getOwnerGamePacksAPI = (token) => {
    return axiosClient.get(`${END_POINT.OWNERGAMEPACKS}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
    });
}

export const postOwnerGamePacksAPI = (token, data) => {
    return axiosClient.post(`${END_POINT.OWNERGAMEPACKS}`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
    });
}

export const putOwnerGamePacksAPI = (token, data) => {
    return axiosClient.put(`${END_POINT.OWNERGAMEPACKS}`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
    });
}

export const deleteOwnerGamePacksAPI = (token,listData) => {
    
}
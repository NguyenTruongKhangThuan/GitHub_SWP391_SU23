import axiosClient from '../api/axiosClient'

const END_POINT = {
    //Set end point api
    OWNER: "admin/api/owners",
    //Add others if needed
    USER: "admin/api/users",
    COMPONENTS: "admin/api/components",
    GAMEPACKS: "admin/api/gamepacks",
    BOARDGAMES: "admin/api/boardgames",
    PAYMENTS: "admin/api/payments",
    ORDERS: "admin/api/orders",
    ORDERDETAILS: "admin/api/orderdetails",
    TAGS: "admin/api/gametags",
    STATISTICUSER: "admin/api/statistics/users",
    STATISTICGAMEPACK: "admin/api/statistics/gamepacks",
    STATISTICINCOME:"admin/api/statistics/income"
}

//OwnerAPI
export const getOwnerAPI = (token) => {
    return axiosClient.get(`${END_POINT.OWNER}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

export const postOwnersAPI = (token, owner) => {
    return axiosClient.post(`${END_POINT.OWNER}`,owner,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

export const putOwnersAPI = (token) => {
    return axiosClient.put(`${END_POINT.OWNER}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//UserAPI
export const getUserAPI = (token) => {
    return axiosClient.get(`${END_POINT.USER}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//ComponentsAPI
export const getComponentsAPI = (token) => {
   return axiosClient.get(`${END_POINT.COMPONENTS}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//GamePacksAPI
export const getGamePacksAPI = (token) => {
    return axiosClient.get(`${END_POINT.GAMEPACKS}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//BoardgamesAPI
export const getBoardgamesAPI = (token) => {
    return axiosClient.get(`${END_POINT.BOARDGAMES}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

export const postBoardgamesAPI = (token, boardgame) => {
    return axiosClient.post(`${END_POINT.BOARDGAMES}`,boardgame,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

export const putBoardgameAPI = (token) => {
    return axiosClient.put(`${END_POINT.BOARDGAMES}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

export const deleteBoardgameAPI = (token,id) => {
    return axiosClient.delete(`${END_POINT.BOARDGAMES}/${id}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//GameTagsAPI
export const getGameTagsAPI = (token) => {
    return axiosClient.get(`${END_POINT.TAGS}`,
        {headers: {
            Authorization:  `bearer ${token}`
        }}
    )
}

export const postGameTagsAPI = (token, gametag) => {
    return axiosClient.post(`${END_POINT.BOARDGAMES}`,gametag,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

export const putGameTagsAPI = (token, gametag) => {
    return axiosClient.post(`${END_POINT.BOARDGAMES}`,gametag,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

export const deleteGameTagsAPI = (token, id) => {
    return axiosClient.post(`${END_POINT.BOARDGAMES}/${id}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}


//PaymentsAPI
export const getPaymentAPI = (token) => {
    return axiosClient.get(`${END_POINT.PAYMENTS}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//OrdersAPI
export const getOrderAPI = (token, id) => {
    return axiosClient.get(`${END_POINT.ORDERS}?orderId=${id}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//OrderDetailsAPI
export const getOrderDetailsAPI = (token,id) => {
    return axiosClient.get(`${END_POINT.ORDERDETAILS}?orderId=${id}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//StatisticUsers
export const getStatisticUserAPI = (token) => {
    return axiosClient.get(`${END_POINT.STATISTICUSER}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//StatisticGamepacks
export const getStatisticGamepacksAPI = (token) => {
    return axiosClient.get(`${END_POINT.STATISTICGAMEPACK}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}

//StatisticIncome
export const getStatisticIncomeAPI = (token) => {
    return axiosClient.get(`${END_POINT.STATISTICINCOME}`,
    {headers: {
        Authorization: `bearer ${token}`,
    }});
}
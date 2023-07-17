import axiosClient from "../api/axiosClient";

const END_POINT = {
  GAMEPACK: "api/gamepacks",
  BOARDGAME: "api/boardgames",
  SEARCH: "api/gamepacks/searchmethods",
  COMPONENTS: "api/components",
  GAMETAG: "api/gametags",
};

//BoardGame API
export const getBoardGameAPI = () => {
  return axiosClient.get(`${END_POINT.BOARDGAME}`);
};

//GamePack API
export const getAvailableGamePackAPI = () => {
  return axiosClient.get(`${END_POINT.GAMEPACK}`);
};

export const searchGamePackAPI = (searchValue, boardGameName) => {
  return axiosClient.get(
    `${END_POINT.SEARCH}?searchValue=${searchValue}&boardGameName=${boardGameName}`
  );
};

export const getGamePackBasedOnIDAPI = (gamePackId) => {
  return axiosClient.get(`${END_POINT.GAMEPACK}/${gamePackId}`);
};

//Components in relative Game Pack
export const getRelativeComponentsAPI = (gamePackId) => {
  return axiosClient.get(`${END_POINT.COMPONENTS}?gamePackId=${gamePackId}`);
};

//Game Tags API
export const getGameTagsAPI = () => {
  return axiosClient.get(`${END_POINT.GAMETAG}`);
};

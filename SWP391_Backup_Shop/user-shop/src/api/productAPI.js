import axiosClient from "../api/axiosClient";

const END_POINT = {
  GAMEPACK: "api/gamepacks",
  BOARDGAME: "api/boardgames",
  SEARCH: "api/gamepacks",
  COMPONENTS: "api/components",
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

//Components in relative Game Pack
export const getRelativeComponentsAPI = (gamePackId) => {
  return axiosClient.get(`${END_POINT.COMPONENTS}?gamePackId=${gamePackId}`);
};

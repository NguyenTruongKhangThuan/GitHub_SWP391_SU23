import axios from "axios";

//Complete API Setup for front end
const instance = axios.create({
  baseURL: "http://hntduong-001-site1.ctempurl.com/",
  // baseURL: "https://localhost:7253/",
  timeout: 100000,
});

//return data
instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const BASE_URL = "http://localhost:3000/api";

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Timeout if necessary
  headers: {
    ContentType: "program/json",
    // Add all custom headers here
  },
});

export default axiosInstance
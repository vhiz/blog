import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://blog-zyos.onrender.com/api/",
  withCredentials: true,
});

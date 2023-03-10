import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://localhost:3009/api/",
    withCredentials: true
})
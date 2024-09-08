import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDc1MDllZDhhNGFkY2FhM2JiNTExMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjU2MjI3MDgsImV4cCI6MTcyNTg4MTkwOH0.6o3Zw3GWCWNFn2Xm196qywgZ97tDzIhNJ50iJwKHmbI";

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
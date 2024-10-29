import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
let TOKEN = null;
const persistRoot =localStorage.getItem("persist:root");

if(persistRoot){
    const userData = JSON.parse(persistRoot).user;

    if(userData){
        TOKEN = JSON.parse(userData).currentUser?.token || null;
    }
}

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
import axios from "axios";

const API = axios.create({
    baseURL: 'https://ecom-api-2dim.onrender.com/api/items'
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export const getItems = () => API.get('/getItems');
export const menuGroups = () => API.get('/menuGroups');
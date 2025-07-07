import axios from "axios";

const API = axios.create({
    baseURL: 'https://ecom-api-2dim.onrender.com/api/auth'
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export const register = (userData) => API.post('/register', userData);
export const login = (credentials) => API.post('/login', credentials);
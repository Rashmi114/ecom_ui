import axios from "axios";

const API = axios.create({
    baseURL: 'https://ecom-api-2dim.onrender.com/api'
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
export const getItems = () => API.get('/items/getItems');
export const menuGroups = () => API.get('/items/menuGroups');
export const savedItems = (cartData) => API.post('/orders/savedItems', cartData);
export const getAllKots = ()=> API.get('/orders/getAllKots');
export const getOrderDetails = (kotNumber) => API.get(`/orders/getSavedKot/${kotNumber}`);
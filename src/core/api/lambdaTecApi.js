import axios from 'axios';

// import getEnvVariables from '../helpers/getEnvVariables';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const lambdaTecApi = axios.create({
    baseURL: VITE_API_URL,
});

lambdaTecApi.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            config.headers = {};
        }
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        // config.withCredentials = true;
        return config;
    },
    (error) => Promise.reject(error)
);

export default lambdaTecApi;

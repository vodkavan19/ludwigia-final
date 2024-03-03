import axios from 'axios';

const axiosPublic = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_URL_BE_SERVER
})

axiosPublic.interceptors.request.use(
    async (config) => {
        return config
    },
    function(error) {
        return Promise.reject(error);
    }
)

axiosPublic.interceptors.response.use(
    function (response) {
        return response.data
    },
    function(error) {
        return Promise.reject(error.response);
    }
)

export default axiosPublic


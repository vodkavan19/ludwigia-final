import { useNavigate } from 'react-router';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
    handleAdminLogout,
    handleRefreshToken
} from '~/redux/slices/adminAuth.slice';

const useAxiosPrivate = () => {
    const auth = useSelector((state) => state.adminAuth.login?.data);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const axiosPrivate = axios.create({
        withCredentials: true,
        baseURL: import.meta.env.VITE_URL_BE_SERVER
    })

    axiosPrivate.interceptors.request.use(
        (config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    )

    axiosPrivate.interceptors.response.use(
        (response) => {
            return response.data;
        },
        async (error) => {
            const originRequest = error.config;
            if (error.response.status === 403 && !originRequest._retry) {
                originRequest._retry = true;
                return new Promise(async resolve => {
                    await dispatch(handleRefreshToken(auth))
                        .unwrap()
                        .then((res) => {
                            originRequest.headers['Authorization'] = `Bearer ${res}`;
                            resolve(axiosPrivate(originRequest))
                        })
                        .catch((refreshError) => {
                            dispatch(handleAdminLogout())
                            navigate('/admin/login', { replace: true })
                            Swal.fire({
                                icon: 'error',
                                title: refreshError.message,
                                html: '<b>Phiên đăng nhập hiện tại đã hết hạn!</b><br/>'
                                    + '<b>Vui lòng tiến hành đăng nhập lại để tiếp tục!</b>',
                                confirmButtonText: 'Xác nhận'
                            })
                        })
                })
                
            }

            return Promise.reject(error.response);
        }
    )

    return axiosPrivate
}


export default useAxiosPrivate;
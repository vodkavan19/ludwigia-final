import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';

import axiosPublic from '~/utils/axiosPublic';
import InputField from '~/components/ui/inputField/InputField';
import { TOAST_STYLE } from '~/components/ui/customToastify';

function ResetPassWord() {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [verify, setVerify] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        axiosPublic
            .get('/admin/forgot-pass/verify', {
                params: { id: id, token: token }
            })
            .then(() => {
                setVerify(true)
            })
            .catch((err) => {
                setVerify(false)
                Swal.fire({
                    icon: 'error',
                    title: err.data.message,
                    text: 'Link xác minh tài khoản của bạn không còn hiệu lực, vui lòng thực hiện lại quá trình xác minh!',
                    confirmButtonText: 'Thực hiện lại'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/admin/login', { replace: true })
                    }
                })
            })
    }, [id, token, navigate])

    const form = useForm({
        defaultValues: { password: '', confirm_password: '' },
        resolver: yupResolver(
            Yup.object().shape({
                password: Yup.string().trim()
                    .required('Vui lòng không bỏ trống trường này!')
                    .min(8, 'Mật khẩu có tối thiểu 8 ký tự!')
                    .max(30, 'Mật khẩu có tối đa 30 ký tự!'),
                confirm_password: Yup.string()
                    .oneOf([Yup.ref('password')], 'Nhập lại mật khẩu không trùng khớp!')
                    .required('Vui lòng không bỏ trống trường này!')
            })
        )
    })
    var formState = form.formState

    const handleSubmit = async (value) => {
        await axiosPublic
            .put(`/admin/forgot-pass/reset/${id}`, { password: value.password })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonText: 'Tiến hành đăng nhập'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/admin/login', { replace: true })
                    }
                })
            })
            .catch(err => {
                toast.success(err.data.message, TOAST_STYLE);
            })
    }

    return (verify == true) && (
        <Box className='flex-center' minHeight='100vh' bgcolor='#e9ebee'>
            <Paper sx={{ width: 500, boxShadow: 6, borderRadius: 0.25, position: 'relative' }}>
                {(formState.isSubmitting === true) && (
                    <Box position='absolute' top={0} left={0} width='100%'>
                        <LinearProgress color="success" />
                    </Box>
                )}
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Typography variant='h5' fontWeight={600} px={3} py={2}>
                        Chọn mật khẩu mới
                    </Typography>
                    <Divider />
                    <Box px={3} py={4}>
                        <Box>
                            <InputField
                                form={form}
                                name='password'
                                label='Mật khẩu'
                                placeholder='Mật khẩu đăng nhập'
                                type={showPassword ? 'text' : 'password'}
                                endActionIcon={showPassword
                                    ? <VisibilityOffOutlined />
                                    : <VisibilityOutlined />
                                }
                                endActionFunction={() => setShowPassword((prev) => !prev)}
                                labelIconColor='primary'
                            />
                        </Box>
                        <Box mt={3}>
                            <InputField
                                form={form}
                                name='confirm_password'
                                label='Nhập lại mật khẩu'
                                placeholder='Nhập lại mật khẩu đăng nhập'
                                type={showPassword ? 'text' : 'password'}
                                endActionIcon={showPassword
                                    ? <VisibilityOffOutlined />
                                    : <VisibilityOutlined />
                                }
                                endActionFunction={() => setShowPassword((prev) => !prev)}
                                labelIconColor='primary'
                            />
                        </Box>
                    </Box>
                    <Divider />
                    <Box px={3} py={2} textAlign='end'>
                        <Button type='submit' variant='contained'>Cập nhật</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}

export default ResetPassWord;
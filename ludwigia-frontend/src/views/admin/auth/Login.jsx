import { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress'
import { Link as MuiLink } from '@mui/material';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';

import loginBG from '~/assets/images/login-bg.jpeg';
import { handleAdminLogin } from '~/redux/slices/adminAuth.slice';
import { TOAST_STYLE } from '~/components/ui/customToastify';
import InputField from '~/components/ui/inputField/InputField';
import ForgotPasswordDialog from './ForgotPassword';

import classNames from 'classnames/bind';
import styles from './login.module.scss';
const cx = classNames.bind(styles);

function AdminLogin() {
    const status = useSelector((state) => state.adminAuth.login?.status);
    const isLogin = useSelector((state) => state.adminAuth.login?.data);
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const forgotPasswordDialogRef = useRef()

    const validateSchema = Yup.object().shape({
        email: Yup.string()
            .max(50, 'Email có tối đa 50 ký tự!')
            .email('Vui lòng nhập email đúng định dạng!')
            .required('Vui lòng không bỏ trống trường này!'),
        password: Yup.string()
            .required('Vui lòng không bỏ trống trường này!')
            .min(8, 'Mật khẩu có tối thiểu 8 ký tự!')
            .max(30, 'Mật khẩu có tối đa 30 ký tự!')
    })

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(validateSchema)
    })

    const handleLogin = (values) => {
        dispatch(handleAdminLogin(values))
            .unwrap()
            .then(() => {
                toast.success('Đăng nhập thành công!', TOAST_STYLE);
                navigate('/admin/', { replace: true });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.data.message,
                    confirmButtonText: 'Xác nhận'
                })
            })
    }

    return isLogin ? (
        <Navigate to='/admin/' state={{ from: location }} replace />
    ) : (
        <Box className={cx('wrapper')} sx={{ backgroundImage: `url(${loginBG})` }}>
            <Box className={cx('form-container')} p={3} pb={4}>
                {(status === 'loading') && (
                    <Box className={cx('loading')}>
                        <LinearProgress color="success" sx={{ height: '6px' }} />
                    </Box>
                )}
                <Box className={cx('header')} mb={4} >
                    <Typography variant='h2' color='text.accent1'>LUDWIGIA</Typography>
                    <Typography variant='subtitle1' color='text.accent1'>adminstration</Typography>
                </Box>
                <form
                    noValidate
                    onSubmit={form.handleSubmit(handleLogin)}
                >
                    <Box>
                        <InputField
                            form={form}
                            type='email'
                            name='email'
                            placeholder='Email đăng nhập'
                            startLabelIcon={<AccountCircleOutlined />}
                            labelIconColor='primary'
                        />
                    </Box>
                    <Box mt={3}>
                        <InputField
                            form={form}
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder='Mật khẩu'
                            startLabelIcon={<VpnKeyOutlined />}
                            endActionIcon={showPassword
                                ? <VisibilityOffOutlined />
                                : <VisibilityOutlined />
                            }
                            endActionFunction={() => setShowPassword((prev) => !prev)}
                            labelIconColor='primary'
                        />
                    </Box>
                    <Box textAlign='end' mt={0.5}>
                        <MuiLink
                            underline='hover'
                            sx={{ fontStyle: 'italic', fontSize: '0.875rem', cursor: 'pointer' }}
                            onClick={() => forgotPasswordDialogRef.current.onOpenDialog()}
                        >
                            Quên mật khẩu?
                        </MuiLink>
                    </Box>
                    <Box mt={2.5}>
                        <Button
                            type='submit'
                            fullWidth variant='contained' size='large'
                            sx={{ py: 1.25, fontSize: '1rem' }}
                            disabled={status === 'loading'}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </form>
            </Box>

            <ForgotPasswordDialog ref={forgotPasswordDialogRef} />
        </Box>
    );
}

export default AdminLogin;

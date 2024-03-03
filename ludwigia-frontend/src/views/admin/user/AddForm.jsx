import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'

import useAxiosPrivate from '~/utils/axiosPrivate';
import InputField from '~/components/ui/inputField/InputField';
import { TOAST_STYLE } from '~/components/ui/customToastify';

function AddForm({ initValue, validateSchema, onCloseDialog }) {
    const axiosPrivate = useAxiosPrivate();
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm({
        defaultValues: initValue,
        resolver: yupResolver(validateSchema)
    })
    var formState = form.formState;

    const handleSubmit = async (value) => {
        await axiosPrivate
            .post('/admin/register', value)
            .then((res) => {
                form.reset();
                onCloseDialog();
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonText: 'Xác nhận'
                })
            })
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    return (
        <Box position='relative'>
            {(formState.isSubmitting === true) && (
                <Box position='absolute' top={0} left={0} width='100%'>
                    <LinearProgress color="success" sx={{ height: '6px' }} />
                </Box>
            )}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogTitle fontWeight={700} lineHeight={1.5}>
                    Thêm mới quản trị viên
                </DialogTitle>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Box>
                        <InputField
                            form={form}
                            name='name'
                            label='Họ và tên'
                            placeholder='Họ và tên quản trị viên'
                        />
                    </Box>
                    <Box mt={3}>
                        <InputField
                            form={form}
                            name='email'
                            label='Email'
                            placeholder='Email (tài khoản đăng nhập)'
                        />
                    </Box>
                    <Box mt={3}>
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
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        variant='contained' size='large' color='cancel'
                        disabled={formState.isSubmitting}
                        onClick={() => {
                            form.reset();
                            onCloseDialog();
                        }}
                    >
                        Trở lại
                    </Button>
                    <Button
                        type='submit' variant='contained' size='large'
                        disabled={formState.isSubmitting}
                    >
                        Thêm mới
                    </Button>
                </DialogActions>
            </form>
        </Box>
    );
}

export default AddForm;
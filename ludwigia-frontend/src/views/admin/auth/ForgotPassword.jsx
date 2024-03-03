import { forwardRef, useImperativeHandle, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import EmailOutlined from '@mui/icons-material/EmailOutlined';

import axiosPublic from '~/utils/axiosPublic';
import InputField from '~/components/ui/inputField/InputField';
import { TOAST_STYLE } from '~/components/ui/customToastify';

const ForgotPasswordDialog = forwardRef(function ForgotPasswordDialog(props, ref) {
    const [open, setOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        onOpenDialog: () => setOpen(true)
    }));

    const handleCloseDialog = (e, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false)
            form.reset()
        }
    }

    const form = useForm({
        defaultValues: { email: '' },
        resolver: yupResolver(
            Yup.object().shape({
                email: Yup.string().trim()
                    .email('Vui lòng nhập email đúng định dạng!')
                    .required('Vui lòng nhập email để tìm tài khoản!')
            })
        )
    })
    var formState = form.formState;

    const handleSubmit = async (value) => {
        await axiosPublic
            .post('/admin/forgot-pass/verify', value)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Link xác minh đã gửi đến Email của bạn!',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })
            })
            .catch(err => {
                if (err.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: err.data.message,
                        text: 'Email bạn cung cấp không chính xác hoặc tài khoản chưa được tạo trên hệ thống!',
                        confirmButtonText: 'Xác nhận'
                    })
                } else toast.error(err.data.message, TOAST_STYLE)
            })
    }

    return (
        <Dialog
            open={open}
            maxWidth='xs'
            fullWidth={true}
            onClose={handleCloseDialog}
        >
            <Box position='relative'>
                {(formState.isSubmitting === true) && (
                    <Box position='absolute' top={0} left={0} width='100%'>
                        <LinearProgress color="success" sx={{ height: '6px' }} />
                    </Box>
                )}
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogTitle fontWeight={600} sx={{ position: 'relative' }}>
                        Tìm tài khoản của bạn
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography fontWeight={500}>
                            Vui lòng nhập email để tìm kiếm tài khoản của bạn.
                        </Typography>
                        <Box mt={3}>
                            <InputField
                                form={form}
                                name='email'
                                placeholder='Email (tài khoản đăng nhập)'
                                startLabelIcon={<EmailOutlined />}
                                labelIconColor='primary'
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button
                            variant='contained' color='cancel'
                            onClick={handleCloseDialog}
                        >
                            Hủy
                        </Button>
                        <Button type='submit' variant='contained'>Tìm kiếm</Button>
                    </DialogActions>
                </form>
            </Box>
        </Dialog>
    );
})

export default ForgotPasswordDialog;
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

import useAxiosPrivate from '~/utils/axiosPrivate';
import InputField from '~/components/ui/inputField/InputField';
import { TOAST_STYLE } from '~/components/ui/customToastify';

function AddEditForm({ initValue, validateSchema, onCloseDialog, editItemId }) {
    const axiosPrivate = useAxiosPrivate();

    const form = useForm({
        defaultValues: initValue,
        resolver: yupResolver(validateSchema)
    })
    var formState = form.formState;

    const handleSubmit = async (value) => {
        if (!editItemId) {
            await handleAddGenus(value)
        } else {
            await handleEditGenus(value, editItemId)
        }
    }

    const handleAddGenus = async (data) => {
        await axiosPrivate
            .post('/genus/', data)
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

    const handleEditGenus = async (data, id) => {
        await axiosPrivate
            .put(`/genus/${id}`, data)
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
            {(formState.isSubmitting) && (
                <Box position='absolute' top={0} left={0} width='100%'>
                    <LinearProgress color="success" sx={{ height: '6px' }} />
                </Box>
            )}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogTitle fontWeight={700} lineHeight={1.5}>
                    {editItemId ? 'Chỉnh sửa Chi thực vật' : 'Thêm mới Chi thực vật'}
                </DialogTitle>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Box>
                        <InputField
                            form={form}
                            name='sci_name'
                            label='Tên khoa học'
                            placeholder='Nhập tên khoa học của Chi'
                        />
                    </Box>
                    <Box mt={3}>
                        <InputField
                            form={form}
                            name='vie_name'
                            label='Tên tiếng Việt'
                            placeholder='Nhập tên tiếng Việt của Chi'
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
                        {editItemId ? 'Chỉnh sửa' : 'Thêm mới'}
                    </Button>
                </DialogActions>
            </form>
        </Box>
    );
}

export default AddEditForm;
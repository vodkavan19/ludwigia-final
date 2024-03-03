import { forwardRef, useImperativeHandle, useState } from 'react';

import * as Yup from 'yup';

import Dialog from '@mui/material/Dialog';

import AddForm from './AddForm';

const AddUserDialog = forwardRef(function AddUserDialog({ onRefresh }, ref) {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        onOpenDialog: () => setOpen(true)
    }));

    const handleCloseDialog = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
            onRefresh();
        }
    };

    const initValue = {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    const validateSchema = Yup.object().shape({
        name: Yup.string().trim()
            .required('Vui lòng không bỏ trống trường này!'),
        email: Yup.string().trim()
            .email('Vui lòng nhập đúng định dạng của email')
            .required('Vui lòng không bỏ trống trường này!'),
        password: Yup.string().trim()
            .min(8, 'Mật khẩu có tối thiểu 8 ký tự!')
            .max(30, 'Mật khẩu có tối đa 30 ký tự!')
            .required('Vui lòng không bỏ trống trường này!'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Nhập lại mật khẩu không trùng khớp!')
            .required('Vui lòng không bỏ trống trường này!')
    })

    return (
        <Dialog
            open={open}
            maxWidth='sm'
            fullWidth={true}
            onClose={handleCloseDialog}
        >
            <AddForm
                initValue={initValue}
                validateSchema={validateSchema}
                onCloseDialog={handleCloseDialog}
            />
        </Dialog>
    );
});

export default AddUserDialog;

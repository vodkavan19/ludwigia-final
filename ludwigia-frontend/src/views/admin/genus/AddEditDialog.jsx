import { forwardRef, useImperativeHandle, useState } from 'react';

import * as Yup from 'yup';

import Dialog from '@mui/material/Dialog';

import AddEditForm from './AddEditForm';

const AddEditGenus = forwardRef(function AddEditGenus({ onRefresh }, ref) {
    const [open, setOpen] = useState(false);
    const [existValue, setExistValue] = useState()

    useImperativeHandle(ref, () => ({
        onOpenDialog: handleOpenDialog
    }));

    const handleOpenDialog = (value) => {
        setOpen(true)
        if (value != null) setExistValue(value)
        else setExistValue(null)
    }

    const handleCloseDialog = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
            onRefresh();
        }
    };

    const initValue = {
        sci_name: existValue?.sci_name || '',
        vie_name: existValue?.vie_name || ''
    }

    const validateSchema = Yup.object().shape({
        sci_name: Yup.string().trim()
            .required('Vui lòng không bỏ trống trường này!'),
        vie_name: Yup.string().trim()
            .required('Vui lòng không bỏ trống trường này!')
    })

    return (
        <Dialog
            open={open}
            maxWidth='sm'
            fullWidth={true}
            onClose={handleCloseDialog}
        >
            <AddEditForm
                initValue={initValue}
                validateSchema={validateSchema}
                onCloseDialog={handleCloseDialog}
                editItemId={existValue?._id}
            />
        </Dialog>
    );
});

export default AddEditGenus;

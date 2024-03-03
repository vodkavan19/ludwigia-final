import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useAxiosPrivate from "~/utils/axiosPrivate";
import { VALIDATE_REFERENCE_FORM } from "../schemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ArrowCircleDownTwoTone, DatasetLinkedOutlined, HighlightOffTwoTone } from "@mui/icons-material";
import InputField from "~/components/ui/inputField/InputField";
import EditorField from "~/components/ui/inputField/EditorField";
import Grid from '@mui/material/Unstable_Grid2';
import LoadingUpload from "~/components/ui/LoadingUpload";
import { toast } from "react-toastify";
import { TOAST_STYLE } from "~/components/ui/customToastify";
import { useNavigate } from "react-router";

function Reference({ defaultValues, onStepChange, editId, fileData }) {
    const authData = useSelector((state) => state.adminAuth.login?.data);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATE_REFERENCE_FORM)
    })
    var formState = form.formState;

    const referencesForm = useFieldArray({
        name: 'references',
        control: form.control
    });

    useEffect(() => {
        if(fileData != null) {
            form.reset((value) => ({ ...value, ...fileData }))
        }
    }, [fileData])

    const handleSubmit = async (values) => {
        if(!editId) {
            await axiosPrivate
                .post('/species', { ...values, admin: authData._id })
                .then((res) => {
                    form.reset()
                    onStepChange(0)
                    navigate('/admin/species')
                })
                .catch((err) => {
                    onStepChange(0)
                    if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
                })
        } else {
            await axiosPrivate
                .put(`/species/${editId}`, { ...values, admin: authData._id })
                .then((res) => {
                    form.reset()
                    onStepChange(0)
                    navigate('/admin/species')
                })
                .catch((err) => {
                    onStepChange(0)
                    if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
                })
        }
    }

    return (  
        <Box>
         <form onSubmit={form.handleSubmit(handleSubmit)}>
            {referencesForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    <Box mb={2} alignItems='center' display='flex'>
                        <Box display='flex' alignItems='center' color='text.accent1'>
                            <DatasetLinkedOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={700} fontStyle='italic'>
                                Tài liệu tham khảo số {index + 1}:
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex'>
                        <Box mr={1}>
                            <Fragment>
                                <Box>
                                    <Tooltip title='Xóa tài liệu này' arrow placement="right">
                                        <span>
                                            <IconButton
                                                color="error"
                                                disabled={referencesForm.fields.length <= 1}
                                                onClick={() => referencesForm.remove(index)}
                                            >
                                                <HighlightOffTwoTone fontSize="large" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <Tooltip title='Thêm một tài liệu mới bên dưới' arrow placement="right">
                                        <span>
                                            <IconButton
                                                color="primary"
                                                onClick={() => referencesForm.insert(index + 1, { content: '', link: '' })}
                                            >
                                                <ArrowCircleDownTwoTone fontSize="large" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>
                            </Fragment>
                        </Box>
                        <Grid flex={1} container spacing={2}>
                            <Grid xs={12}>
                                <InputField
                                    form={form}
                                    name={`references.${index}.link`}
                                    label='URL tài liệu trực tuyến'
                                />
                            </Grid>
                            <Grid xs={12}>
                                <EditorField
                                    form={form}
                                    name={`references.${index}.content`}
                                    placeholder='Tên tài liệu tham khảo'
                                />
                            </Grid>
                            
                        </Grid>
                    </Box>
                    <Divider sx={{ border: '1px dashed', borderColor: 'divider', my: 2 }} />
                </Fragment>
            ))}
            <Box mt={3} display='flex' justifyContent='flex-end'>
                <Button
                    type='submit'
                    variant='contained' size='large' color='primary'
                >
                    Tiếp theo
                </Button>
            </Box>
        </form>

        <LoadingUpload open={formState.isSubmitting} />
        </Box>
    );
}

export default Reference;
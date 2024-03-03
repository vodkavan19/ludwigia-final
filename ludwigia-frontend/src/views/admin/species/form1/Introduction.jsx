import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircleTwoTone, DashboardCustomizeOutlined, DashboardOutlined, RemoveCircleTwoTone } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "~/components/ui/inputField/InputField";
import SelectField from "~/components/ui/inputField/SelectField";
import { VALIDATE_INTRODUCTION_FORM } from "../schemaValidation";
import ImageField from "~/components/ui/inputField/ImageField";
import useAxiosPrivate from "~/utils/axiosPrivate";
import LoadingUpload from "~/components/ui/LoadingUpload";
import { buildFormData } from "~/utils/buildFormData";
import { toast } from "react-toastify";
import { TOAST_STYLE } from "~/components/ui/customToastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Introduction({ genusOptions, defaultValues, editId, onStepChange, fileData }) {
    const authData = useSelector((state) => state.adminAuth.login?.data);
    const axiosPrivate = useAxiosPrivate();
    const indexStep = 0; 

    const form = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATE_INTRODUCTION_FORM)
    })
    var formState = form.formState;
    const otherNameForm = useFieldArray({
        name: 'other_name',
        control: form.control
    })
    const vieNameForm = useFieldArray({
        name: 'vie_name',
        control: form.control
    })

    useEffect(() => {
        if(fileData != null) {
            form.reset((value) => ({ ...value, ...fileData }))
        }
    }, [fileData])

    const handleSubmit = async (values) => {
        const formData = new FormData();
        buildFormData(formData, {
            ...values,
            admin: authData._id,
            editId: editId
        });
        await axiosPrivate
            .post('/species/introduction', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => onStepChange(indexStep + 1))
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    return ( 
        <Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={2}>
                    <Grid xs={12} display='flex' alignItems='center' color='text.accent1'>
                        <DashboardOutlined sx={{ mr: .75 }} />
                        <Typography fontWeight={700} fontStyle='italic'>
                            Thông tin chung:
                        </Typography>
                    </Grid>
                    <Grid xs={6} container>
                        <Grid xs={12}>
                            <SelectField
                                form={form}
                                name='genus_ref'
                                options={genusOptions}
                                label='Loài thuộc Chi'
                            />
                        </Grid>
                        <Grid xs={12}>
                            <InputField
                                form={form}
                                name='sci_name'
                                label='Tên khoa học'
                            />
                        </Grid>
                        <Grid xs={8}>
                            <InputField
                                form={form}
                                name='author'
                                label='Tác giả mô tả'
                            />
                        </Grid>
                        <Grid xs={4}>
                            <InputField
                                form={form}
                                name='debut_year'
                                type='number'
                                label='Năm mô tả'
                            />
                        </Grid>
                        <Grid xs={12}>
                            <InputField
                                form={form}
                                name='family_description'
                                label='Mô tả Họ của Loài'
                                multiline={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={6}>
                        <ImageField
                            form={form}
                            name='avatar'
                            label='Hình ảnh đại diện'
                            height='100%'
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={3}>
                    <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                        <Grid xs={12} display='flex' alignItems='center' color='text.accent1'>
                            <DashboardCustomizeOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={700} fontStyle='italic'>
                                Tên khoa học khác:
                            </Typography>
                        </Grid>
                        {otherNameForm.fields.map((field, index) => (
                            <Grid xs={12} key={field.id} container flexWrap='nowrap'>
                                <Grid flexGrow={1}>
                                    <InputField
                                        form={form}
                                        name={`other_name.${index}.name`}
                                        label='Tên khoa học'
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <InputField
                                        form={form}
                                        type='number'
                                        name={`other_name.${index}.reference`}
                                        label='TLTK số'
                                    />
                                </Grid>
                                <Grid pr={0} pl={0.5} py={1.25}>
                                    {index == 0 ? (
                                        <Tooltip title='Thêm một tên tiếng Việt' arrow>
                                            <span>
                                                <IconButton
                                                    color='primary'edge='start'
                                                    onClick={() => otherNameForm.append({ name: '', reference: '' })}
                                                >
                                                    <AddCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Xóa tên này' arrow>
                                            <span>
                                                <IconButton
                                                    color='error' edge='start'
                                                    onClick={() => otherNameForm.remove(index)}
                                                >
                                                    <RemoveCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                        <Grid xs={12} display='flex' alignItems='center' color='text.accent1'>
                            <DashboardCustomizeOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={700} fontStyle='italic'>
                                Tên tiếng Việt:
                            </Typography>
                        </Grid>
                        {vieNameForm.fields.map((field, index) => (
                            <Grid xs={12} key={field.id} container flexWrap='nowrap'>
                                <Grid flexGrow={1}>
                                    <InputField
                                        form={form}
                                        name={`vie_name.${index}.name`}
                                        label='Tên tiếng Việt'
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <InputField
                                        form={form}
                                        type='number'
                                        name={`vie_name.${index}.reference`}
                                        label='TLTK số'
                                    />
                                </Grid>
                                <Grid pr={0} pl={0.5} py={1.25}>
                                    {index == 0 ? (
                                        <Tooltip title='Thêm một tên tiếng Việt' arrow>
                                            <span>
                                                <IconButton
                                                    color='primary'edge='start'
                                                    onClick={() => vieNameForm.append({ name: '', reference: '' })}
                                                >
                                                    <AddCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Xóa tên này' arrow>
                                            <span>
                                                <IconButton
                                                    color='error' edge='start'
                                                    onClick={() => vieNameForm.remove(index)}
                                                >
                                                    <RemoveCircleTwoTone fontSize='large' />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={3}>
                    <Grid xs={12} display='flex' alignItems='center' color='text.accent1'>
                        <DashboardOutlined sx={{ mr: .75 }} />
                        <Typography fontWeight={700} fontStyle='italic'>
                            Phân loại theo hệ thống Takhtajan:
                        </Typography>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.kingdom.name'
                                label='Thuộc giới'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.kingdom.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.kingdom.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.division.name'
                                label='Thuộc Ngành'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.division.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.division.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.layer.name'
                                label='Thuộc Lớp'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.layer.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.layer.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.order.name'
                                label='Thuộc Bộ'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.order.nomenclature'
                                label='Danh pháp khoa học'

                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.order.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.family.name'
                                label='Thuộc Họ'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.family.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.family.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.genus.name'
                                label='Thuộc Chi'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <InputField
                                form={form}
                                name='takhtajan_system.genus.nomenclature'
                                label='Danh pháp khoa học'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.genus.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} container>
                        <Grid xs={10}>
                            <InputField
                                form={form}
                                name='takhtajan_system.species.nomenclature'
                                label='Danh pháp khoa học của Loài'
                            />
                        </Grid>
                        <Grid xs={2}>
                            <InputField
                                form={form}
                                type='number'
                                name='takhtajan_system.species.reference'
                                label='TLTK số'
                            />
                        </Grid>
                    </Grid>
                </Grid>
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

export default Introduction;
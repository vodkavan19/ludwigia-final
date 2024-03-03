import { Fragment, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingUpload from "~/components/ui/LoadingUpload";
import { TOAST_STYLE } from "~/components/ui/customToastify";
import EditorField from "~/components/ui/inputField/EditorField";
import ImageField from "~/components/ui/inputField/ImageField";
import InputField from "~/components/ui/inputField/InputField";
import MultipleInputField from "~/components/ui/inputField/MultipleInputField";
import useAxiosPrivate from "~/utils/axiosPrivate";
import { buildFormData } from "~/utils/buildFormData";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowCircleDownTwoTone, HighlightOffTwoTone, ScienceOutlined } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import * as initValue from "../initValueForm"
import { VALIDATE_PHYTOCHEMICAL_FORM } from "../schemaValidation";

function Phytochemical({ defaultValues, onStepChange, fileData }) {
    const authData = useSelector((state) => state.adminAuth.login?.data);
    const axiosPrivate = useAxiosPrivate();
    const indexStep = 4; 

    const form = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATE_PHYTOCHEMICAL_FORM)
    })
    var formState = form.formState;

    const phytochemicalForm = useFieldArray({
        name: 'phytochemicals',
        control: form.control
    });

    useEffect(() => {
        if(fileData != null) {
            form.reset((value) => ({ ...value, ...fileData }))
        }
    }, [fileData])

    const handleSubmit = async (values) => {
        var phytImg = [], phytFileIdx = [];
        const phytData = values.phytochemicals.map((item, idx) => {
            var { chemical_structure, ...rest } = item
            if (chemical_structure[0] instanceof File) {
                phytImg.push(chemical_structure[0])
                phytFileIdx.push(idx)
                return { ...rest }
            } else {
                return { ...item }
            }
        })
        const formData = new FormData();
        buildFormData(formData, {
            phytochemicals: phytData,
            phytochemical_images: phytImg,
            phytochemical_file_idx: phytFileIdx,
            admin: authData._id,
            field: "phytochemicals" 
        });
        
        await axiosPrivate
            .post('/species/phytochemical', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(() => onStepChange(indexStep + 1))
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    return (  
        <Box>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            {phytochemicalForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    <Box alignItems='center' display='flex' mb={2}>
                        <Box display='flex' alignItems='center' color='text.accent1'>
                            <ScienceOutlined sx={{ mr: .75 }} />
                            <Typography fontWeight={700} fontStyle='italic'>
                                Thông tin hoạt chất số {index + 1}:
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex'>
                        <Box mr={1}>
                            <Fragment>
                                <Box>
                                    <Tooltip title='Xóa hoạt chất này' arrow placement="right">
                                        <span>
                                            <IconButton
                                                color="error"
                                                disabled={phytochemicalForm.fields.length <= 1}
                                                onClick={() => phytochemicalForm.remove(index)}
                                            >
                                                <HighlightOffTwoTone fontSize="large" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <Tooltip title='Thêm một hoạt chất mới bên dưới' arrow placement="right">
                                        <span>
                                            <IconButton
                                                color="primary"
                                                onClick={() => phytochemicalForm.insert(
                                                    index + 1, 
                                                    initValue.phytochemical.phytochemicals[0]
                                                )}
                                            >
                                                <ArrowCircleDownTwoTone fontSize="large" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>
                            </Fragment>
                        </Box>
                        <Grid flex={1} container spacing={2} columns={16} >
                            <Grid xs={10} container>
                                <Grid xs={16}>
                                    <EditorField
                                        form={form}
                                        name={`phytochemicals.${index}.bio_active`}
                                        label='Hoạt chất'
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <InputField
                                        form={form}
                                        type='number'
                                        name={`phytochemicals.${index}.bio_reference`}
                                        label='TLTK số'
                                    />
                                </Grid>
                                <Grid xs>
                                    <InputField
                                        form={form}
                                        name={`phytochemicals.${index}.chemical_group`}
                                        label='Hoạt chất thuộc nhóm'
                                    />
                                </Grid>
                                <Grid xs>
                                    <InputField
                                        form={form}
                                        name={`phytochemicals.${index}.segment`}
                                        label='Phân đoạn chiết tách'
                                    />
                                </Grid>
                                <Grid xs={16}>
                                    <MultipleInputField
                                        form={form}
                                        name={`phytochemicals.${index}.spectrum`}
                                        label='Quang phổ'
                                        options={[]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={6}>
                                <ImageField
                                    form={form}
                                    name={`phytochemicals.${index}.chemical_structure`}
                                    label='Cấu trúc hóa học'
                                    height={'100%'}
                                />
                            </Grid>
                            <Grid xs={16}>
                                <EditorField
                                    form={form}
                                    name={`phytochemicals.${index}.physical_properties`}
                                    placeholder='Mô tả tính chất vật lý.'
                                />
                            </Grid>
                            <Grid xs={16}>
                                <EditorField
                                    form={form}
                                    name={`phytochemicals.${index}.pharma_effect`}
                                    placeholder='Mô tả tác dụng dược lý.'
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    {phytochemicalForm.fields.length > 1 &&
                        <Divider sx={{ border: '1px dashed', borderColor: 'divider', my: 2 }} />
                    }
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

export default Phytochemical;
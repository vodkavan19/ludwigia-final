import { useSelector } from "react-redux";
import useAxiosPrivate from "~/utils/axiosPrivate";
import { VALIDATE_MICROSURGERY_FORM } from "../schemaValidation";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { ArrowCircleDownTwoTone, ArrowDropDownCircleTwoTone, BiotechOutlined, FormatListNumbered, HighlightOffTwoTone, RemoveCircleTwoTone } from "@mui/icons-material";
import Grid from '@mui/material/Unstable_Grid2';
import InputField from "~/components/ui/inputField/InputField";
import ImageField from "~/components/ui/inputField/ImageField";
import { buildFormData } from "~/utils/buildFormData";
import LoadingUpload from "~/components/ui/LoadingUpload";
import { toast } from "react-toastify";
import { TOAST_STYLE } from "~/components/ui/customToastify";

function Microsurgery({ defaultValues, onStepChange, fileData }) {
    const authData = useSelector((state) => state.adminAuth.login?.data);
    const axiosPrivate = useAxiosPrivate();
    const indexStep = 2; 

    const form = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATE_MICROSURGERY_FORM)
    })
    var formState = form.formState; 
    const microsurgeryForm = useFieldArray({
        name: 'microsurgerys',
        control: form.control
    });
 
    useEffect(() => {
        if(fileData != null) {
            form.reset((value) => ({ ...value, ...fileData }))
        }
    }, [fileData])

    const handleSubmit = async (values) => {
        var micrImg = [], micrFileIdx = [];
        const micrData = values.microsurgerys.map((item, idx) => {
            if (item.image[0] instanceof File) {
                micrImg.push(item.image[0])
                micrFileIdx.push(idx)
                return { 
                    caption: item.caption,  
                    explains: item.explains.map(explain => explain.content)
                }
            } else {
                return {
                    ...item,
                    explains: item.explains.map(explain => explain.content)
                }
            }
        })
        const formData = new FormData();
        buildFormData(formData, {
            microsurgerys: micrData,
            microsurgery_images: micrImg,
            microsurgery_file_idx: micrFileIdx,
            admin: authData._id,
            field: "microsurgerys" 
        });

        await axiosPrivate
            .post('/species/microsurgery', formData, {
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
            {microsurgeryForm.fields.map((field, index) => (
                <Fragment key={field.id}>
                    <Box display='flex' alignItems='center' color='text.accent1' mb={2}>
                        <BiotechOutlined sx={{ mr: .75 }} />
                        <Typography fontWeight={700} fontStyle='italic'>
                            Mô tả vi phẩu số {index + 1}:
                        </Typography>
                    </Box>
                    <Box display='flex'>
                        <Box mr={1}>
                            <Fragment>
                                <Box>
                                    <Tooltip title='Xóa vi phẩu này' arrow placement="right">
                                        <span>
                                            <IconButton
                                                color="error"
                                                disabled={microsurgeryForm.fields.length <= 1}
                                                onClick={() => microsurgeryForm.remove(index)}
                                            >
                                                <HighlightOffTwoTone fontSize="large" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <Tooltip title='Thêm một vi phẩu mới bên dưới' arrow placement="right">
                                        <span>
                                            <IconButton
                                                color="primary"
                                                onClick={() => microsurgeryForm.insert(
                                                    index + 1,  
                                                    { image: '', caption: '', explains: [{ content: '' }] }
                                                )}
                                            >
                                                <ArrowCircleDownTwoTone fontSize="large" />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>
                            </Fragment>
                        </Box>
                        <Grid flex={1} container spacing={2}>
                            <Grid xs={6} container flexDirection='column' alignItems='flex-start'>
                                <Grid xs={12}>
                                    <ImageField
                                        form={form}
                                        name={`microsurgerys.${index}.image`}
                                        label={`Vi phẩu thứ ${index + 1}`}
                                        height={240}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <InputField
                                        form={form}
                                        name={`microsurgerys.${index}.caption`}
                                        label="Mô tả hình ảnh vi phẩu"
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={6} flexDirection='column' alignItems='flex-start'>
                                <Box display='flex' alignItems='center' mb={2}>
                                    <FormatListNumbered sx={{ mr: .75 }} fontSize='small' />
                                    <Typography fontWeight={500} fontStyle='italic'>
                                        Diễn giải chú thích:
                                    </Typography>
                                </Box>
                                <Box>
                                    <ExplainsNestedForm 
                                        form={form} 
                                        nestIndex={index} 
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    {microsurgeryForm.fields.length > 1 &&
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

const ExplainsNestedForm = ({ form, nestIndex }) => {
    const explainsForm = useFieldArray({
        name: `microsurgerys.${nestIndex}.explains`,
        control: form.control
    });

    return (
        <Grid container spacing={2}>
            {explainsForm.fields.map((field, index) => (
                <Grid xs={12} key={field.id} display='flex'>
                    <Box flexGrow={1}>
                        <InputField
                            form={form}
                            name={`microsurgerys.${nestIndex}.explains.${index}.content`}
                            label={`Diễn giải chú thích số ${index + 1}`}
                        />
                    </Box>
                    <Box display='flex' alignItems='center' ml={1}>
                        <Tooltip title='Thêm' arrow>
                            <span>
                                <IconButton
                                    color="primary" size='small'
                                    onClick={() => explainsForm.insert(index + 1, { content: '' })}
                                >
                                    <ArrowDropDownCircleTwoTone sx={{ fontSize: '2rem' }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title='Xóa diễn giải chú thích này' arrow>
                            <span>
                                <IconButton
                                    color="error" size='small'
                                    disabled={explainsForm.fields.length === 1}
                                    onClick={() => explainsForm.remove(index)}
                                >
                                    <RemoveCircleTwoTone sx={{ fontSize: '2rem' }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default Microsurgery;
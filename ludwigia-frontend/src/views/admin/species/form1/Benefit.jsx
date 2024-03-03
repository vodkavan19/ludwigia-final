import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "~/utils/axiosPrivate";
import { VALIDATE_BENEFIT_FORM } from "../schemaValidation";
import { Box, Button, Typography } from "@mui/material";
import { VerifiedOutlined } from "@mui/icons-material";
import EditorField from "~/components/ui/inputField/EditorField";
import LoadingUpload from "~/components/ui/LoadingUpload";
import { toast } from "react-toastify";
import { TOAST_STYLE } from "~/components/ui/customToastify";
import { removeAllTempEditorImages } from "~/redux/slices/tempImage.slice";
import { forwardRef, useEffect, useImperativeHandle } from "react";

function Benefit({ defaultValues, onStepChange, fileData }) {
    const authData = useSelector((state) => state.adminAuth.login?.data);
    const imageUploaded = useSelector((state) => state.tempImageId.editorImages);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const indexStep = 5; 

    const form = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATE_BENEFIT_FORM)
    })
    var formState = form.formState;

    useEffect(() => {
        if(fileData != null) {
            form.reset((value) => ({ ...value, ...fileData }))
        }
    }, [fileData])

    const handleSubmit = async (values) => {
        await axiosPrivate
            .post('/species/simple-data', {
                ...values, 
                uploaded: imageUploaded,
                admin: authData._id,
                field: "benefits"
            })
            .then((res) => {
                onStepChange(indexStep + 1)
                dispatch(removeAllTempEditorImages())
            }) 
            .catch((err) => {
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    return (  
        <Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box display='flex' alignItems='center' color='text.accent1' mb={2}>
                    <VerifiedOutlined sx={{ mr: .75 }} />
                    <Typography fontWeight={700} fontStyle='italic' >
                        Bộ phận dùng và công dụng:
                    </Typography>
                </Box>
                <EditorField
                    form={form}
                    name='benefits'
                    placeholder='Nhập thông tin về bộ phận dùng & công dụng của Loài!'
                    minHeight={320}
                />
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

export default Benefit;
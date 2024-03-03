import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingUpload from "~/components/ui/LoadingUpload";
import { TOAST_STYLE } from "~/components/ui/customToastify";
import EditorField from "~/components/ui/inputField/EditorField";
import { removeAllTempEditorImages } from "~/redux/slices/tempImage.slice";
import useAxiosPrivate from "~/utils/axiosPrivate";
import { yupResolver } from "@hookform/resolvers/yup";
import { MapOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { VALIDATE_DESCRIPTION_FORM } from "../schemaValidation";

function Description({ defaultValues, onStepChange, fileData }) {
    const authData = useSelector((state) => state.adminAuth.login?.data);
    const imageUploaded = useSelector((state) => state.tempImageId.editorImages);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const indexStep = 1; 

    const form = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATE_DESCRIPTION_FORM)
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
                field: "description"
            })
            .then(() => {
                onStepChange(indexStep + 1);
                dispatch(removeAllTempEditorImages())
            })
            .catch((err) => {
                console.log(err);
                if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
            })
    }

    return (  
        <Box>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Box display='flex' alignItems='center' color='text.accent1' mb={2}>
                    <MapOutlined sx={{ mr: .75 }} />
                    <Typography fontWeight={700} fontStyle='italic' >
                        Phân bố sinh thái:
                    </Typography>
                </Box>
                <Box>
                    <EditorField
                        form={form}
                        name='description'
                        placeholder='Nhập nội dung về phân bố sinh thái của Loài!'
                        minHeight={320}
                    />
                </Box>
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

export default Description;
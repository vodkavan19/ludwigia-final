import { CloudUploadTwoTone } from "@mui/icons-material";
import { Backdrop, Box, CircularProgress } from "@mui/material";

function LoadingUpload({ open }) {
    return (
        <Backdrop
            open={open}
            sx={{ zIndex: 9000 }}
        >
            <Box position='relative' >
                <CircularProgress size={120} thickness={4} />
                <Box
                    className='flex-center' position='absolute'
                    top={0} bottom={0} left={0} right={0} mb={1}
                >
                    <CloudUploadTwoTone color='primary' sx={{ fontSize: '4rem' }} />
                </Box>
            </Box>
        </Backdrop>
    );
}

export default LoadingUpload;
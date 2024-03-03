import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function PlantImageCard({ frameImage, dataImage, height }) {
    return (
        <Box
            className='flex-center'
            sx={{
                aspectRatio: 4/3,
                height: height ? height : '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {dataImage ? (
                <Box 
                    component='img' src={dataImage} alt='' 
                    height='100%' width='100%' 
                    sx={{ objectFit: 'cover' }} 
                />
            ) : (
                <Skeleton 
                    variant="rectangular" 
                    width='100%' height='100%' 
                />
            )}
            <Box
                component='img' src={frameImage} alt=''
                position='absolute' top={0} left={0}
                width='100%' height='100%'
            />
        </Box>
    );
}

export default PlantImageCard;
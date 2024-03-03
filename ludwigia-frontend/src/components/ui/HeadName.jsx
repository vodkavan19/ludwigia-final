import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import frameImage from '~/assets/images/frame-accent-image.png'
import PlantImageCard from './card/PlantImageCard';

function HeadName({ title, subTitle, image }) {
    return (
        <Container maxWidth={false} sx={{ bgcolor: 'background.accent1' }}>
            <Box display='flex' height='120px' py={0.5}>
                {image && (
                    <PlantImageCard
                        frameImage={frameImage}
                        dataImage={image}
                        height='100%'
                    />
                )}
                <Box
                    flex={1}
                    className='flex-center'
                    flexDirection='column'
                    color='#FFF' fontStyle='italic'
                >
                    <Typography variant='h3' fontWeight={700}>{title}</Typography>
                    <Typography variant='subtitle1' fontWeight={500}>{subTitle}</Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default HeadName;
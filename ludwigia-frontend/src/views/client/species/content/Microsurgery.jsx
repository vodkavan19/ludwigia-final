import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Microsurgery({ data }) {
    return (data.length === 1 && data[0].caption.toLowerCase() === 'chưa được công bố') 
        ? (
            <Box textAlign='center'>Chưa được công bố</Box>
        )
        : (
            <Box>
                {data && data.map((mirc, idx) => {
                    const explains = mirc.explains.filter(explain => explain !== '') || []
                    return (
                        <Box key={idx} textAlign='center' mt={8}>
                            <Box 
                                borderRadius={6}
                                component='img' src={mirc.image.fileUrl} alt=''
                                width={(explains.length !== 0) ? '40%' : '30%'} 
                            />
                            <Typography 
                                variant='subtitle1' fontWeight={700} 
                                maxWidth='75%' textAlign='center' mx='auto' mt={2}
                            >
                                Hình {idx + 1}: {mirc.caption}
                            </Typography>
                            <Box 
                                display='flex' flexWrap='wrap' justifyContent='center'
                                maxWidth='75%' mx='auto' mt={1}
                            >
                                {explains.map((explain, i) => (
                                    <Typography key={i} mx={1} mt={0.25}>{i + 1}. {explain}</Typography>
                                ))}
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        );
}

export default Microsurgery;

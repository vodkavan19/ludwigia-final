import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import blue from '@mui/material/colors/blue';

function References({ data }) {
    return (
        <Box>
            <Box component='ol'>
                {data.map((item, idx) => (
                    <Box component='li' id={`reference-${idx + 1}`} key={idx} mb={1.5}>
                        {item.link !== '' ? (
                            <Box
                                component={Link} to={item.link} target='_blank'
                                dangerouslySetInnerHTML={{ __html: item.content }}
                                sx={{
                                    '&:hover': {
                                        color: blue[900],
                                        textDecoration: 'underline'
                                    }
                                }}
                            />
                        ) : (
                            <Box dangerouslySetInnerHTML={{ __html: item.content }} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default References;
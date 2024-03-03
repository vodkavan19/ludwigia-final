import StringHasQuote from '~/components/ui/StringHasQuote';
import Box from '@mui/material/Box';

function Distribution({ data, references }) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& p': {
                    textAlign: 'justify',
                    '&:has(img)': {
                        display: 'flex',
                        justifyContent: 'center'
                    },
                },
                '& figure': {
                    mx: 0,
                    textAlign: 'center'                    
                },
                '& img': {
                    width: '100%'
                }
            }}
        >
            <StringHasQuote
                htmlStr={data}
                references={references}
            />
        </Box>
    );
}

export default Distribution;

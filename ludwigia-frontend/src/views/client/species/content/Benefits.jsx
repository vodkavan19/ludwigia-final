import Box from '@mui/material/Box';
import StringHasQuote from '~/components/ui/StringHasQuote';

function Benefits({ data, references }) {
    return (
        <Box
            sx={{
                '& p': {
                    textAlign: 'justify',
                    '&:has(img)': {
                        display: 'flex',
                        justifyContent: 'center'
                    },
                },
                '& figure': {
                    mx: 0,
                    textAlign: 'center',
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

export default Benefits;
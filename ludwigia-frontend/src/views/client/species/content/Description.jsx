import StringHasQuote from '~/components/ui/StringHasQuote';
import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';

function Description({ data, references }) {

    return (
        <Box
            sx={{
                '& div': {
                    mb: 2,
                    textAlign: 'justify',
                    '& figure': {
                        my: 0
                    },
                    '&:has(figure img)': {
                        display: 'flex',
                        justifyContent: 'center'
                    },
                },
                '& figure': {
                    mx: 0,
                    '& figcaption': {
                        fontSize: 14,
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: grey.A700
                    }
                },
            }}
        >
            <StringHasQuote
                htmlStr={data}
                references={references}
            />
        </Box>
    );
}

export default Description;

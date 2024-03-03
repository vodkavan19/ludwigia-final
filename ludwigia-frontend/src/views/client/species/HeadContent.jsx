import Typography from '@mui/material/Typography';

function HeadContent({ children, mx, mb }) {
    return (
        <Typography
            variant='h4'
            color='white'
            bgcolor='background.accent1'
            textAlign='center'
            fontWeight={600}
            mx={mx || 0} mb={mb || 0} 
            py={0.875}
        >
            {children}
        </Typography>
    );
}

export default HeadContent;
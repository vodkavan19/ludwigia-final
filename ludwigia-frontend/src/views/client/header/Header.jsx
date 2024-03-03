import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CottageTwoTone from '@mui/icons-material/CottageTwoTone';
import SpaTwoTone from '@mui/icons-material/SpaTwoTone';
import EmailTwoTone from '@mui/icons-material/EmailTwoTone';

import SearchBar from './SearchBar';

const navLinks = [
    { name: 'Trang chủ', icon: <CottageTwoTone sx={{ pr: .5 }} />, href: '/' },
    { name: 'Giới thiệu', icon: <SpaTwoTone sx={{ pr: .5 }} />, href: '/introduction' },
    { name: 'Liên hệ', icon: <EmailTwoTone sx={{ pr: .5 }} />, href: 'mailto:sonba7b1@gmail.com' }
]

function ClientHeader() {

    return (
        <Container
            maxWidth={false}
            component='header'
            className='flex-between'
            sx={{
                py: 0.75,
                bgcolor: 'background.header'
            }}
        >
            <Box display='flex'>
                <Box mr={2}>
                    <Typography
                        variant='h4' lineHeight={1}
                        color='text.accent1' align='center'
                        fontFamily='var(--signika-font)'
                        fontWeight={900} fontStyle='italic'
                    >
                        LUDWIGIA
                    </Typography>
                </Box>
                <Box display='flex'>
                    {navLinks.map((link, idx) => (
                        <Box
                            key={idx}
                            component={NavLink} to={link.href}
                            className='flex-center' mx={2}
                            sx={{
                                fontWeight: 600,
                                color: 'text.darkActive1',
                                '&:hover': { color: 'text.accent1' }
                            }}
                        >
                            {link.icon}{link.name}
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box>
                <SearchBar />
            </Box>
        </Container>
    );
}

export default ClientHeader;
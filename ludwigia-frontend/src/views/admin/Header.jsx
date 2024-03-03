import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Menu as MenuContainer } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/MenuOpen';
import Logout from '@mui/icons-material/Logout';
import teal from '@mui/material/colors/teal';

import { handleAdminLogout } from '~/redux/slices/adminAuth.slice';
import { CustomAppBar, HeaderButton } from './customMuiLayoutComp';
import { TOAST_STYLE } from '~/components/ui/customToastify';

function AdminHeader({ fullSidebar, onFullSidebar }) {
    const isLogin = useSelector((state) => state.adminAuth.login?.data);
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(handleAdminLogout())
            .unwrap()
            .then((res) => {
                toast.success(res.message, TOAST_STYLE);
                navigate('/admin/login', { replace: true });
            });
    };

    return (
        <CustomAppBar position="fixed" open={fullSidebar}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center">
                    <HeaderButton
                        variant="contained"
                        disableElevation
                        onClick={onFullSidebar}
                    >
                        {fullSidebar ? <MenuOpen /> : <Menu />}
                    </HeaderButton>
                    <Box ml={2} display={fullSidebar ? 'none' : 'block'}>
                        <Typography
                            variant='h4' lineHeight={1}
                            color='text.accent2'
                            fontFamily='var(--signika-font)'
                            fontWeight={900} fontStyle='italic'
                        >
                            LUDWIGIA
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <HeaderButton
                        variant="contained"
                        disableElevation
                        onClick={(e) => setOpenMenu(e.currentTarget)}
                        aria-haspopup="true"
                        aria-controls={openMenu ? 'account-menu' : undefined}
                        aria-expanded={openMenu ? 'true' : undefined}
                    >
                        <Avatar
                            src={isLogin?.avatar?.link || '/'}
                            alt={isLogin.name}
                            sx={{ mr: 1.5, width: 36, height: 36, bgcolor: 'text.accent2' }}
                        />
                        {isLogin.name}
                    </HeaderButton>
                    <MenuContainer
                        anchorEl={openMenu}
                        id="account-menu"
                        open={Boolean(openMenu)}
                        onClose={() => setOpenMenu(null)}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        MenuListProps={{ disablePadding: true }}
                    >
                        <Box
                            minWidth={280}
                            py={1.5}
                            className="flex-center"
                            flexDirection="column"
                            bgcolor="text.active1"
                            color="background.paper"
                            border="2px solid #fff"
                            sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                        >
                            <Avatar
                                src={isLogin?.avatar?.link || '/'} alt={isLogin?.name?.toUpperCase()}
                                sx={{
                                    width: 80, height: 80,
                                    bgcolor: 'text.accent2', fontSize: '3rem',
                                    border: '4px solid', borderColor: teal[300]
                                }}
                            />
                            <Typography fontWeight={600}>
                                {isLogin.name}
                            </Typography>
                            <Typography variant="body2" fontStyle="italic">
                                {isLogin.email}
                            </Typography>
                        </Box>
                        <MenuItem sx={{ py: 1.25 }} onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" sx={{ color: 'text.primary' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary='Đăng xuất'
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                        </MenuItem>
                    </MenuContainer>
                </Box>
            </Toolbar>
        </CustomAppBar>
    );
}

export default AdminHeader;
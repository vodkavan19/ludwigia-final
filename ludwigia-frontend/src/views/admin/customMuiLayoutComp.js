import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const sidebarWidth = 240
export const headerHeight = 48

const openedFullSidebar = (theme) => ({
    width: sidebarWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    borderRight: 0
});

const closedFullSidebar = (theme) => ({
    width: theme.spacing(7),
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    borderRight: 0
});

export const CustomAppBar = styled(AppBar)(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[0],
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    '& .MuiToolbar-root': {
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: headerHeight
    },
    ...(open && {
        marginLeft: sidebarWidth,
        width: `calc(100% - ${sidebarWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export const CustomDrawer = styled(Drawer)(({ theme, open }) => ({
    width: sidebarWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedFullSidebar(theme),
        '& .MuiDrawer-paper': openedFullSidebar(theme)
    }),
    ...(!open && {
        ...closedFullSidebar(theme),
        '& .MuiDrawer-paper': closedFullSidebar(theme)
    })
}));

export const AdminContentWrapper = styled(Box)(({ theme, open }) => ({
    backgroundColor: theme.palette.background.adminContent,
    overflow: 'hidden',
    minHeight: '100vh',
    ...(open && {
        width: `calc(100% - ${sidebarWidth})`
    }),
    ...(!open && {
        width: `calc(100% - ${theme.spacing(7)})`
    })
}))

export const HeaderButton = styled(Button)(({ theme }) => ({
    minWidth: 'unset',
    minHeight: headerHeight,
    borderRadius: 0,
    paddingRight: theme.spacing(2)
}))
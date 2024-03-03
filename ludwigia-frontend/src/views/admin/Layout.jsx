import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import { AdminContentWrapper, headerHeight } from './customMuiLayoutComp';
import AdminHeader from './Header';
import AdminSidebar from './Sidebar';

function AdminLayout() {
    const isLogin = useSelector((state) => state.adminAuth.login?.data);
    const [fullSidebar, setFullSiderbar] = useState(true);
    const location = useLocation();

    return isLogin ? (
        <Box display="flex">
            <AdminHeader
                fullSidebar={fullSidebar}
                onFullSidebar={() => setFullSiderbar((prev) => !prev)}
            />
            <AdminSidebar fullSidebar={fullSidebar} />
            <AdminContentWrapper>
                <Box minHeight={headerHeight} />
                <Box component="main" p={2}>
                    <Outlet />
                </Box>
            </AdminContentWrapper>
        </Box>
    ) : (
        <Navigate to="/admin/login" state={{ from: location }} replace />
    );
}

export default AdminLayout;

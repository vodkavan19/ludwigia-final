import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Speed from '@mui/icons-material/Speed';

import RouterBreadcrumbs from '~/components/ui/Breadcrumbs';
import styles from './dashboard.module.scss';

const cx = classNames.bind(styles);
const BREADCRUMBS = [{ label: 'Trang chủ', link: '/admin/' }];

function Dashboard() {
    return (
        <Fragment>
            <Box className="flex-between" alignItems="flex-end">
                <Box>
                    <Typography variant="h5" fontWeight="700" gutterBottom>
                        Dashboard
                    </Typography>
                    <RouterBreadcrumbs prevLink={BREADCRUMBS} currentPage="Tổng quan" homeIcon={<Speed />} />
                </Box>
            </Box>
            <Box>
                <Typography variant='h5' fontWeight={700} align='center' my={4}>
                    *Chức năng đang được phát triển
                </Typography>
                <div className={cx('gears', 'loading')}>
                    <div className={cx('gear', 'one')}>
                        <div className={cx('bar')}></div>
                        <div className={cx('bar')}></div>
                        <div className={cx('bar')}></div>
                    </div>
                    <div className={cx('gear', 'two')}>
                        <div className={cx('bar')}></div>
                        <div className={cx('bar')}></div>
                        <div className={cx('bar')}></div>
                    </div>
                    <div className={cx('gear', 'three')}>
                        <div className={cx('bar')}></div>
                        <div className={cx('bar')}></div>
                        <div className={cx('bar')}></div>
                    </div>
                </div>
            </Box>
            <Box mt={28}>
                <Typography variant='h5' color='text.accent1' fontWeight={700} align='center' my={4}>
                    Chức năng đã có:
                </Typography>
                <Box className='flex-center'>
                    <Button variant='contained' component={Link} to='/admin/user' sx={{ mr: 1 }}>
                        Quản lý người dùng
                    </Button>
                    <Button variant='contained' component={Link} to='/admin/genus' sx={{ mr: 1 }}>
                        Quản lý Chi thực vật
                    </Button>
                    <Button variant='contained' component={Link} to='/admin/species'>
                        Quản lý Loài thực vật
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
}

export default Dashboard;

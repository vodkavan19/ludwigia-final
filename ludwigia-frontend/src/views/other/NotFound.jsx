import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import Box from '@mui/material/Box';

import styles from './notFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <Box className={cx('wrapper')}>
            <Box className={cx('stars')}>
                <Box className={cx('center-content')}>
                    <Box className={cx('center-title')}>Ooops! Page not found</Box>
                    <Box className={cx('center-description')}>Không tìm thấy trang hiện tại!</Box>
                    <Box className={cx('center-description')}>Vui lòng chọn nút bên dưới để quay về trang chủ!</Box>
                    <Link className={cx('btn-go-home')} to='/' >
                        Về trang chủ
                    </Link>
                </Box>
                <Box className={cx('objects')}>
                    <Box>
                        <img
                            className={cx('object_rocket')}
                            src="http://salehriaz.com/404Page/img/rocket.svg"
                            width="40px"
                        />
                    </Box>
                    <Box className={cx('earth-moon')}>
                        <img
                            className={cx('object_earth')}
                            src="http://salehriaz.com/404Page/img/earth.svg"
                            width="100px"
                        />
                        <img
                            className={cx('object_moon')}
                            src="http://salehriaz.com/404Page/img/moon.svg"
                            width="80px"
                        />
                    </Box>
                    <Box className={cx('astronaut')}>
                        <img
                            className={cx('object_astronaut')}
                            src="http://salehriaz.com/404Page/img/astronaut.svg"
                            width="140px"
                        />
                    </Box>
                </Box>
                <Box className={cx('glowing_stars')}>
                    <Box className={cx('star')}></Box>
                    <Box className={cx('star')}></Box>
                    <Box className={cx('star')}></Box>
                    <Box className={cx('star')}></Box>
                    <Box className={cx('star')}></Box>
                </Box>
            </Box>
        </Box>
    );
}

export default NotFound;

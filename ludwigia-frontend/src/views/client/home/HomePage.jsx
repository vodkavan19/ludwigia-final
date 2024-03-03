import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import rightBanner from '~/assets/images/right-banner.png';
import linkPaddingBG from '~/assets/images/link-bg1.png';
import linkBG from '~/assets/images/link-bg.png';
import styles from './homePage.module.scss';
import SearchBar from './SearchBar';

const cx = classNames.bind(styles);

function HomePage() {

    return (
        <main>
            <Box className={cx('homepage-container')}>
                <Box className={cx('left-side')}>
                    <Box className={cx('left-side-content')}>
                        <Typography variant="h1" color="text.accent1">Ludwigia</Typography>
                        <Typography variant="h6" color="text.accent1">
                            Tra cứu khoa học - Thông tin tin cậy - Tham khảo dễ dàng
                        </Typography>
                        <Box mt={3}>
                            <SearchBar />
                        </Box>
                    </Box>
                    <Box className={cx('left-side-nav')}>
                        <Box>
                            <Link to="/introduction">
                                <Typography
                                    className={cx('nav-item')}
                                    sx={{
                                        color: 'background.paper',
                                        backgroundImage: `url(${linkBG}), url(${linkPaddingBG})`
                                    }}
                                >
                                    Giới thiệu chung
                                </Typography>
                            </Link>
                        </Box>
                        <Box>
                            <Link to="mailto:sonba7b1@gmail.com">
                                <Typography
                                    className={cx('nav-item')}
                                    sx={{
                                        color: 'background.paper',
                                        backgroundImage: `url(${linkBG}), url(${linkPaddingBG})`
                                    }}
                                >
                                    Liên hệ
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <Box component="img" src={rightBanner} className={cx('right-banner')} />
            </Box>
        </main>
    );
}

export default HomePage;

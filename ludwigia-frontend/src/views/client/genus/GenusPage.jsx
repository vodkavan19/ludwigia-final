import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import emptyBox from '~/assets/images/empty-box.png'
import frameImage from '~/assets/images/frame-image.png'
import axiosPublic from '~/utils/axiosPublic';
import HeadName from '~/components/ui/HeadName';
import PlantImageCard from '~/components/ui/card/PlantImageCard';
import styles from './genusPage.module.scss';

const cx = classNames.bind(styles);

function GenusPage() {
    const { id } = useParams();
    const [species, setSpecies] = useState([]);
    const [genusInfo, setGenusInfo] = useState({});
    const [fetching, setFetching] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const controler = new AbortController();

        const fetchGenusInfo = axiosPublic.get(`/genus/${id}`)
        const fetchSpecies = axiosPublic.get(`/species/by_genus/${id}`)

        Promise.all([fetchGenusInfo, fetchSpecies])
            .then(res => {
                setGenusInfo(res[0]);
                setSpecies(res[1]);
                setFetching(false)
            })
            .catch(() => navigate('/internal-server-error'));

        return () => {
            controler.abort();
        }
    }, [id, navigate])

    return (
        <Box>
            <HeadName title={genusInfo.sci_name} subTitle={genusInfo.vie_name} />
            <Container maxWidth={false} component={Box} pt={8}>
                <Grid container spacing={2}>
                    {species.length === 0
                        ? fetching
                            ? Array.from({ length: 6 }, (_, i) => i + 1).map((item, idx) => (
                                <Grid xs={4} key={idx} className='flex-center'>
                                    <Box>
                                        <PlantImageCard
                                            frameImage={frameImage}
                                            height='200px'
                                        />
                                        <Skeleton variant="text" sx={{ fontSize: '1.75rem', mt: 1.5, mb: 4 }} />
                                    </Box>
                                </Grid>
                            ))
                            : (
                                <Grid xs={12} className='flex-center' flexDirection='column'>
                                    <Box component='img' src={emptyBox} alt='' height={240} />
                                    <Typography my={3} variant='h6'>Không tìm thấy dữ liệu!</Typography>
                                </Grid>
                            )
                        : species.map((item, idx) => (
                            <Grid xs={4} key={idx} className='flex-center'>
                                <Box component={Link} to={`/species/${item._id}`} className={cx('plant-item')}>
                                    <PlantImageCard
                                        frameImage={frameImage}
                                        dataImage={item.avatar.fileUrl}
                                        height='200px'
                                    />
                                    <Typography
                                        mt={1.5} mb={4}
                                        variant='h6' color='text.accent1'
                                        textAlign='center' fontStyle='italic'
                                    >
                                        {item.short_name}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Box>
    );
}

export default GenusPage;
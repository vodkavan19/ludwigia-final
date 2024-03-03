import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Marker } from 'react-mark.js';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined'
import LocalFloristOutlined from '@mui/icons-material/LocalFloristOutlined'
import Search from '@mui/icons-material/Search';

import useDebounce from '~/hooks/useDebounce';
import axiosPublic from '~/utils/axiosPublic';
import { HeaderSearchInput } from '~/components/themeMUI/customComponents';
import styles from './searchBar.module.scss';

const cx = classNames.bind(styles);

function SearchBar() {
    const [value, setValue] = useState('');
    const [searchGenus, setSearchGenus] = useState([]);
    const [searchSpecies, setSearchSpecies] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const navigate = useNavigate();
    const inputRef = useRef();

    var searchValue = useDebounce(value, 300)

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchGenus([]);
            setSearchSpecies([]);
            return;
        }

        const searchGenus = axiosPublic
            .get('/genus/search', { params: { q: searchValue } });
        const searchSpecies = axiosPublic
            .get('/species/search', { params: { q: searchValue } });

        Promise.all([searchGenus, searchSpecies])
            .then(res => {
                setSearchGenus(res[0]);
                setSearchSpecies(res[1]);
            })
            .catch(() => navigate('/internal-server-error'));
    }, [searchValue, navigate])

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setValue(value);
        }
    }

    const handleSubmit = (e) => {
        if(value) {
            navigate('/search',{ state: { searchValue: value }})
            setShowResult(false)
        } else {
            inputRef.current.focus();
        }
    }


    return (
        <Box className={cx('search-container')}>
            <Tippy
                interactive
                placement='bottom'
                visible={showResult && (searchGenus.length !== 0 || searchSpecies.length !== 0)}
                onClickOutside={() => setShowResult(false)}
                render={(attrs) => (
                    <Paper
                        tabIndex="-1" {...attrs}
                        elevation={8} className={cx('search-result-wrapper')}
                    >
                        <List className={cx('search-result', 'custom-scrollbar')}>
                            {searchGenus.length !== 0 && (
                                <Box component="li">
                                    <Box component="ul" pl={0} my={0}>
                                        <ListSubheader sx={{ lineHeight: '40px' }}>Chi thực vật</ListSubheader>
                                        {searchGenus.map((item, idx) => (
                                            <ListItemButton
                                                key={idx} sx={{ fontWeight: 500 }}
                                                component={Link} to={`/genus/${item._id}`}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        justifyContent: 'center',
                                                        color: (searchValue.toLowerCase() === item.sci_name.toLowerCase())
                                                            ? 'text.active1'
                                                            : 'inherit'
                                                    }}
                                                >
                                                    <AccountTreeOutlined />
                                                </ListItemIcon>
                                                <Marker mark={searchValue} options={{ className: 'highlighter' }}>
                                                    {item.sci_name}
                                                </Marker>
                                            </ListItemButton>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                            {searchSpecies.length !== 0 && (
                                <Box component="li">
                                    <Box component="ul"  pl={0} my={0}>
                                        <ListSubheader sx={{ lineHeight: '40px' }}>Loài thực vật</ListSubheader>
                                        {searchSpecies.map((item, idx) => (
                                            <ListItemButton
                                                key={idx} sx={{ fontWeight: 500 }}
                                                component={Link} to={`/species/${item._id}`}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        justifyContent: 'center',
                                                        color: (searchValue.toLowerCase() === item.sci_name.toLowerCase())
                                                            ? 'text.active1'
                                                            : 'inherit'
                                                    }}
                                                >
                                                    <LocalFloristOutlined />
                                                </ListItemIcon>
                                                <Marker mark={searchValue} options={{ className: 'highlighter' }}>
                                                    {item.short_name}
                                                </Marker>
                                            </ListItemButton>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </List>
                    </Paper>
                )}
            >
                <Box className={cx('search-input')}>
                    <HeaderSearchInput
                        size="small"
                        width="320px"
                        inputRef={inputRef}
                        placeholder="Nhập thông tin loài cần tìm..."
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={handleSubmit}>
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={handleSearchChange}
                        onFocus={() => setShowResult(true)}
                    />
                </Box>
            </Tippy>
        </Box>
    );
}

export default SearchBar;

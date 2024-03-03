import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { Marker } from 'react-mark.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import Search from '@mui/icons-material/Search';
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import DriveFileRenameOutlineTwoTone from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import Speed from '@mui/icons-material/Speed';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import VisibilityOffTwoTone from '@mui/icons-material/VisibilityOffTwoTone';
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone';

import empty from '~/assets/images/empty.png'
import useDebounce from '~/hooks/useDebounce';
import useAxiosPrivate from '~/utils/axiosPrivate';
import { getComparator, stableSort } from '~/utils/tableSort';
import RouterBreadcrumbs from '~/components/ui/Breadcrumbs';
import { TOAST_STYLE } from '~/components/ui/customToastify';
import AddEditGenus from './AddEditDialog';

const BREADCRUMBS = [
    { label: 'Trang chủ', link: '/admin/' },
    { label: 'Chi thực vật', link: '/admin/genus' }
];

const TABLE_HEADER = [
    { label: 'Tên khoa học', sortBy: 'sci_name' },
    { label: 'Tên tiếng Việt', sortBy: 'vie_name' },
    { label: 'Ngày thêm', sortBy: 'createdAt' },
    { label: 'Số loài', sortBy: 'species' },
    { label: 'Trạng thái', sortBy: 'status' }
];

function GenusManager() {
    const [list, setList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [refresh, setRefresh] = useState(0);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('createdAt');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fetching, setFetching] = useState(true)

    const dialogRef = useRef();
    const navigate = useNavigate()

    const axiosPrivate = useAxiosPrivate()
    const searchParam = useDebounce(searchValue, 500).trim();
    const emptyRows = page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

    useEffect(() => {
        const controler = new AbortController();

        axiosPrivate
            .get('/genus/admin-search', {
                params: { q: searchParam }
            })
            .then((res) => {
                setList(res)
                setFetching(false)
            })
            .catch((err) => {
                if (err.status !== 403) navigate('/internal-server-error')
            }); 

        return () => {
            controler.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, searchParam, navigate]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    }

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc chắn muốn xóa Chi thực vật này?',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Trở lại'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPrivate
                    .delete(`/genus/${id}`)
                    .then((res) => {
                        toast.success(res.message, TOAST_STYLE);
                        setRefresh((prev) => prev + 1);
                    })
                    .catch((err) => {
                        if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
                    })
            }
        })
    }

    const handleToggleStatus = (id, status) => {
        Swal.fire({
            icon: 'question',
            title: `Bạn chắc chắn muốn ${status === true ? 'ẩn' : 'hiển thị'} Chi thực vật này?`,
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Trở lại'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPrivate
                    .put(`/genus/toggle-status/${id}`)
                    .then((res) => {
                        toast.success(res.message, TOAST_STYLE);
                        setRefresh((prev) => prev + 1);
                    })
                    .catch((err) => {
                        if (err.status !== 403) toast.error(err.data.message, TOAST_STYLE)
                    })
            }
        })
    }

    return (
        <Fragment>
            <Box className="flex-between" alignItems="flex-end">
                <Box>
                    <Typography variant="h5" fontWeight="700" gutterBottom>
                        Danh sách Chi thực vật
                    </Typography>
                    <RouterBreadcrumbs
                        prevLink={BREADCRUMBS}
                        currentPage="Danh sách"
                        homeIcon={<Speed />}
                    />
                </Box>
                <Box mb={1}>
                    <Button
                        variant="contained"
                        startIcon={<PlaylistAdd />}
                        onClick={() => dialogRef.current.onOpenDialog()}
                    >
                        Thêm mới
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ mt: 3 }} elevation={4}>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Tìm kiếm với tên khoa học"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color='primary' />
                            </InputAdornment>
                        ),
                        sx: {
                            px: 2, py: 1.5,
                            '& input::placeholder': {
                                fontStyle: 'italic',
                                fontSize: '0.875rem'
                            }
                        }
                    }}
                    onChange={handleSearchChange}
                />
                <Box width="100%">
                    <TableContainer className='custom-scrollbar'>
                        <Table>
                            <TableHead>
                                <TableRow selected>
                                    {TABLE_HEADER.map((item, idx) => (
                                        <TableCell key={idx} sortDirection={orderBy === item.sortBy ? order : false}>
                                            <TableSortLabel
                                                active={orderBy === item.sortBy}
                                                direction={orderBy === item.sortBy ? order : 'asc'}
                                                onClick={() => handleRequestSort(item.sortBy)}
                                                sx={{ whiteSpace: 'nowrap' }}
                                            >
                                                {item.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                    <TableCell colSpan={3} align="center">
                                        Hành động
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.length === 0
                                    ? fetching
                                        ? Array.from({ length: 5 }, (_, i) => i + 1).map(idx => (
                                            <TableRow key={idx}>
                                                <TableCell><Skeleton variant='text' sx={{ width: '100%', fontSize: '1.25rem' }} /></TableCell>
                                                <TableCell><Skeleton variant='text' sx={{ width: '100%', fontSize: '1.25rem' }} /></TableCell>
                                                <TableCell><Skeleton variant='text' sx={{ width: '100%', fontSize: '1.25rem' }} /></TableCell>
                                                <TableCell><Skeleton variant='text' sx={{ width: '100%', fontSize: '1.25rem' }} /></TableCell>
                                                <TableCell><Skeleton variant='rounded' sx={{ width: '100%', height: 24, borderRadius: 160 }} /></TableCell>
                                                <TableCell><Skeleton variant='circular' width={44} height={44} /></TableCell>
                                                <TableCell><Skeleton variant='circular' width={44} height={44} /></TableCell>
                                                <TableCell><Skeleton variant='circular' width={44} height={44} /></TableCell>
                                            </TableRow>
                                        ))
                                        : (
                                            <TableRow height={56.68 * rowsPerPage} overflow='hidden'>
                                                <TableCell colSpan={10} padding='none' align='center'>
                                                    <Box component='img' src={empty} alt='' height={56.68 * rowsPerPage - 2} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    : stableSort(list, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, idx) => {
                                            return (
                                                <TableRow hover key={idx}>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        <Marker mark={searchParam} options={{ className: 'highlighter' }}>
                                                            {row.sci_name}
                                                        </Marker>
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.vie_name}</TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        {new Date(Date.parse(row.createdAt)).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.species} loài</TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        <Chip
                                                            size="small"
                                                            label={row.status === true ? 'Hiển thị' : 'Đã bị ẩn'}
                                                            color={row.status === true ? 'greenChip' : 'redChip'}
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center" size="small">
                                                        <Tooltip title="Chỉnh sửa" arrow>
                                                            <span>
                                                                <IconButton
                                                                    color="primary"
                                                                    onClick={() => dialogRef.current.onOpenDialog(row)}
                                                                >
                                                                    <DriveFileRenameOutlineTwoTone />
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell align="center" size="small">
                                                        <Tooltip arrow title={row.status === true ? 'Ẩn đối tượng' : 'Hiển thị đối tượng'}>
                                                            <span>
                                                                <IconButton
                                                                    color="secondary"
                                                                    onClick={() => handleToggleStatus(row._id, row.status)}
                                                                >
                                                                    {row.status === true ? (<VisibilityOffTwoTone />) : (<VisibilityTwoTone />)}
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell align="center" size="small">
                                                        <Tooltip title="Xóa" arrow>
                                                            <span>
                                                                <IconButton color="error" onClick={() => handleDelete(row._id)}>
                                                                    <DeleteTwoTone />
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                }
                                {(emptyRows > 0 && list.length !== 0 ) && (
                                    <TableRow style={{ height: 56.68 * emptyRows }}>
                                        <TableCell colSpan={8} padding='none'/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 15]}
                        count={list?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        labelRowsPerPage="Hiển thị mỗi trang"
                        labelDisplayedRows={({ from, to, count }) => {
                            return `${from}–${to} trong ${count}`;
                        }}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value));
                            setPage(0);
                        }}
                    />
                </Box>
            </Paper>

            <AddEditGenus
                ref={dialogRef}
                onRefresh={() => setRefresh(prev => prev + 1)}
            />
        </Fragment>
    );
}

export default GenusManager;

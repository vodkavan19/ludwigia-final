import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';
import { Marker } from 'react-mark.js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

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
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton';
import Search from '@mui/icons-material/Search';
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import Speed from '@mui/icons-material/Speed';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone';
import LockPersonTwoTone from '@mui/icons-material/LockPersonTwoTone';

import empty from '~/assets/images/empty.png'
import useDebounce from '~/hooks/useDebounce';
import useAxiosPrivate from '~/utils/axiosPrivate';
import { getComparator, stableSort } from '~/utils/tableSort';
import RouterBreadcrumbs from '~/components/ui/Breadcrumbs';
import { TOAST_STYLE } from '~/components/ui/customToastify';
import AddUserDialog from './AddDialog';

const BREADCRUMBS = [
    { label: 'Trang chủ', link: '/admin/' },
    { label: 'Quản trị viên', link: '/admin/user' }
];

const TABLE_HEADER = [
    { label: 'Quản trị viên', sortBy: 'name' },
    { label: 'Email', sortBy: 'email' },
    { label: 'Ngày tạo', sortBy: 'createdAt' },
    { label: 'Loại tài khoản', sortBy: 'root_role' },
    { label: 'Trạng thái', sortBy: 'status' }
];

function UserManager() {
    const isLogin = useSelector((state) => state.adminAuth.login?.data);
    const [list, setList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [refresh, setRefresh] = useState(0);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('createdAt');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fetching, setFetching] = useState(true)

    const dialogRef = useRef();
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate()
    const searchParam = useDebounce(searchValue, 500).trim();
    const emptyRows = page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

    useEffect(() => {
        const controler = new AbortController();

        axiosPrivate
            .get('/admin/', {
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
    }, [refresh, searchParam]);

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
            title: 'Bạn có chắc muốn xóa Quản trị viên này?',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Trở lại'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPrivate
                    .delete(`/admin/${id}`)
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
            title: `Bạn chắc chắn muốn ${status === true ? 'khóa' : 'mở khóa'} Tài khoản này?`,
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Trở lại'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPrivate
                    .put(`/admin/toggle-status/${id}`)
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
                        Danh sách Quản trị viên
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
                        disabled={isLogin.root_role != true}
                    >
                        Thêm mới
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ mt: 3 }} elevation={4}>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Tìm kiếm với tên hoặc email của quản trị viên"
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
                                    <TableCell colSpan={2} align="center">
                                        Hành động
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(list.length === 0)
                                    ? fetching
                                        ? Array.from({ length: 5 }, (_, i) => i + 1).map(idx => (
                                            <TableRow key={idx}>
                                                <TableCell>
                                                    <Box display='flex' alignItems='center'>
                                                        <Skeleton variant='circular' width={40} height={40} sx={{ mr: 1.5 }} />
                                                        <Skeleton variant='text' sx={{ flex: 1, fontSize: '1.25rem' }} />
                                                    </Box>
                                                </TableCell>
                                                <TableCell><Skeleton variant='text' sx={{ width: '100%', fontSize: '1.25rem' }} /></TableCell>
                                                <TableCell><Skeleton variant='text' sx={{ width: '100%', fontSize: '1.25rem' }} /></TableCell>
                                                <TableCell><Skeleton variant='text' sx={{ width: '100%', fontSize: '1.25rem' }} /></TableCell>
                                                <TableCell><Skeleton variant='rounded' sx={{ width: '100%', height: 24, borderRadius: 160 }} /></TableCell>
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
                                                    <TableCell sx={{ whiteSpace: 'nowrap', py: .75 }}>
                                                        <Box display='flex' alignItems='center'>
                                                            <Avatar
                                                                src={row?.avatar?.fileUrl || '/'} alt={row.name.toUpperCase()}
                                                                sx={{ border: '1px solid', borderColor: 'text.accent1', bgcolor: 'text.accent2', mr: 1.5 }}
                                                            />
                                                            <Marker mark={searchParam} options={{ className: 'highlighter' }}>
                                                                {row.name}
                                                            </Marker>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        <Marker mark={searchParam} options={{ className: 'highlighter' }}>
                                                            {row.email}
                                                        </Marker>
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        {new Date(Date.parse(row.createdAt)).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        {row.root_role == true ? 'Tài khoản gốc' : 'Quản trị viên'}
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        <Chip
                                                            size="small"
                                                            label={row.status === true ? 'Hoạt động' : 'Đã bị khóa'}
                                                            color={row.status === true ? 'greenChip' : 'redChip'}
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center" size="small">
                                                        <Tooltip arrow title={row.status === true ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}>
                                                            <span>
                                                                <IconButton
                                                                    color="secondary"
                                                                    onClick={() => handleToggleStatus(row._id, row.status)}
                                                                    disabled={isLogin.root_role != true || row.root_role == true}
                                                                >
                                                                    {row.status === true ? (<LockPersonTwoTone />) : (<LockOpenTwoTone />)}
                                                                </IconButton>
                                                            </span>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell align="center" size="small">
                                                        <Tooltip title="Xóa Quản trị viên" arrow>
                                                            <span>
                                                                <IconButton
                                                                    color="error"
                                                                    onClick={() => handleDelete(row._id)}
                                                                    disabled={isLogin.root_role != true || row.root_role == true}
                                                                >
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
                                        <TableCell colSpan={7} padding='none'/>
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

            <AddUserDialog
                ref={dialogRef}
                onRefresh={() => setRefresh(prev => prev + 1)}
            />
        </Fragment>
    );
}

export default UserManager;

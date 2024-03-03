import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosPublic from '~/utils/axiosPublic';

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        login: {
            data: null,
            status: 'idle',
            error: null
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleAdminLogin.pending, (state) => {
                state.login.status = 'loading'
            })
            .addCase(handleAdminLogin.fulfilled, (state, action) => {
                state.login.status = 'success'
                state.login.data = action.payload
                state.login.error = null
            })
            .addCase(handleAdminLogin.rejected, (state, action) => {
                state.login.status = 'fail'
                state.login.error = action.payload
            })
            .addCase(handleAdminLogout.pending, (state) => {
                state.login.status = 'loading'
            })
            .addCase(handleAdminLogout.fulfilled, (state) => {
                state.login.status = 'success'
                state.login.data = null
                state.login.error = null
            })
            .addCase(handleAdminLogout.rejected, (state, action) => {
                state.login.status = 'fail'
                state.login.error = action.payload
            })
            .addCase(handleRefreshToken.fulfilled, (state, action) => {
                state.login.data = { ...state.login.data, accessToken: action.payload };
            })
    }
});

export const handleAdminLogin = createAsyncThunk(
    'adminAuth/handleAdminLogin', async (data, { rejectWithValue }) => {
        try {
            const res = await axiosPublic.post('/admin/login', data);
            return res;
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
)

export const handleAdminLogout = createAsyncThunk(
    'adminAuth/handleAdminLogout', async (props, { rejectWithValue }) => {
        try {
            const res = await axiosPublic.get('/admin/login');
            return res;
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
)

export const handleRefreshToken = createAsyncThunk(
    'adminAuth/handleRefreshToken', async (data, { rejectWithValue }) => {
        try {
            const accessToken = await axiosPublic.post('admin/refresh', data);
            return accessToken;
        } catch (err) {
            throw rejectWithValue(err);
        }
    }
)

export default adminAuthSlice.reducer;


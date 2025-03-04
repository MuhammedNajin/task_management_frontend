
  import { createSlice } from '@reduxjs/toolkit';
  import { AuthState } from '../../types/User';
  import authService from '../../service/api/auth';
import { getCurrentUser, loginUser, registerUser } from '../actions/actions';
  
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
  
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        authService.logout();
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      },
      clearAuthError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      // Login cases
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          console.log("user", action.payload)
          state.user = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Login failed';
        });
      
      builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
          state.loading = false
          state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Registration failed';
        });
      
      builder
        .addCase(getCurrentUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
        })
        .addCase(getCurrentUser.rejected, (state) => {
          state.loading = false;
        });
    },
  });
  
  export const { logout, clearAuthError } = authSlice.actions;
  export default authSlice.reducer;
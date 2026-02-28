import { createSlice } from '@reduxjs/toolkit';

const hasSession = localStorage.getItem('isLoggedIn') === 'true';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthReady: !hasSession, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isAuthReady = true;
      localStorage.setItem('isLoggedIn', 'true');
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthReady = true;
      localStorage.removeItem('isLoggedIn');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
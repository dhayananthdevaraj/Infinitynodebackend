import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: localStorage.getItem("role") || null,
  usersData:[]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    setusersData: (state, action) => {
      state.usersData = action.payload;
    },
  },
});

export const { setUserRole, setusersData } = userSlice.actions;
export default userSlice.reducer;

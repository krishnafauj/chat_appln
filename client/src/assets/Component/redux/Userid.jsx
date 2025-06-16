import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    user_id: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.email;
      state.user_id = action.payload.user_id;
    },
    removeUser: (state) => {
      state.user = null;
      state.user_id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

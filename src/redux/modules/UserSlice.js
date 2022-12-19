import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  isLoading: false,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    getUser: (state, payload) => {
      console.log(state.posts, payload);
    },
  },
});

export default UserSlice.reducer;

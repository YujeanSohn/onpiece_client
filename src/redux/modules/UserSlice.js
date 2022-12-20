import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api/client";

export const __getAppliedStudies = createAsyncThunk(
  "getAppliedStudies",
  async (userId, thunkAPI) => {
    try {
      const { data } = await client.get(`/users/${userId}/apply`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      alert(`getAppliedStudiesError: ${e}`);
    }
  }
);

const initialState = {
  isLogin: false,
  id: 0,
  applied: [],
  isLoading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getAppliedStudies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getAppliedStudies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applied = action.payload;
      });
  },
});

export default UserSlice.reducer;

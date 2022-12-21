import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client, { nonTokenClient } from "../../api/client";

export const __emailCheck = createAsyncThunk(
  "emailCheck",
  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(
        `/users/signup/emailNnickname?email=${payload.email}&nickname=${""}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __nicknameCheck = createAsyncThunk(
  "nicknameCheck",
  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.get(
        `/users/signup/emailNnickname?email=${""}&nickname=${payload.name}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __signUp = createAsyncThunk(
  "signUp",
  async (payload, thunkAPI) => {
    try {
      const { data } = await nonTokenClient.post("/users/signup", payload);
      alert("회원가입이 완료되었습니다");
      window.location.href = "/login";
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __signIn = createAsyncThunk(
  "signin",
  async (payload, thunkAPI) => {
    try {
      const response = await nonTokenClient.post("/users/login", payload);
      localStorage.setItem("accessToken", response.data.token);
      alert("로그인 성공!");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      alert("회원정보가 없습니다!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  id: 0,
  isLogin: localStorage.getItem("accessToken") !== undefined ? true : false,
  applied: [],
  isLoading: false,
  isEmailDuplicated: false,
  isNicknameDuplicated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getAppliedStudies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getAppliedStudies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applied = action.payload;
      })
      .addCase(__emailCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__emailCheck.fulfilled, (state) => {
        state.isLoading = false;
        state.isEmailDuplicated = false;
      })
      .addCase(__emailCheck.rejected, (state) => {
        state.isLoading = false;
        state.isEmailDuplicated = true;
      })
      .addCase(__nicknameCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__nicknameCheck.fulfilled, (state) => {
        state.isLoading = false;
        state.isNicknameDuplicated = false;
      })
      .addCase(__nicknameCheck.rejected, (state) => {
        state.isLoading = false;
        state.isNicknameDuplicated = true;
      })
      .addCase(__signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__signIn.fulfilled, (state) => {
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(__signIn.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

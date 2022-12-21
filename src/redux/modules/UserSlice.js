import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client, { nonTokenClient } from "../../api/client";

const initialState = {
  id: 0,
  isLogin: false,
  userinfo: {},
  applied: [],
  finished: [],
  isLoading: false,
  emailCheck: false,
  nicknameCheck: false,
};

export const __userDescriptionUpdate = createAsyncThunk(
  "userDescUpdate",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { data } = await client.put(`/users/${payload.id}`, {
        description: payload.description,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      alert(`userDescriptionUpdate: ${e}`);
    }
  }
);

export const __getUserInfo = createAsyncThunk(
  "getUserInfo",
  async (userId, thunkAPI) => {
    try {
      const { data } = await client.get(`/users/${userId}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      console.log(e);
      alert(`getUserInfo: ${e}`);
    }
  }
);

export const __getAppliedStudies = createAsyncThunk(
  "getAppliedStudies",
  async (userId, thunkAPI) => {
    try {
      console.log("getApplied");
      const { data } = await client.get(`/users/${userId}/apply`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      console.log(e);
      alert(`getAppliedStudiesError: ${e}`);
    }
  }
);

export const __getFinishedStudy = createAsyncThunk(
  "getFinishedStudy",
  async (userId, thunkAPI) => {
    try {
      console.log("getApplied");
      const { data } = await client.get(`/users/${userId}/posts`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      console.log(e);
      alert(`getAppliedStudiesError: ${e}`);
    }
  }
);

export const __signUp = createAsyncThunk(
  "signUp",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.post("/users/signup", payload);
      window.location.href = "/login";
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __emailCheck = createAsyncThunk(
  "emailCheck",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.get(
        `/users/signup/emailNnickname?email=${payload.Email}&nickname=${""}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __nicknameCheck = createAsyncThunk(
  "nicknameCheck",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.get(
        `/users/signup/emailNnickname?email=${""}&nickname=${payload.Name}`
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
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
      window.alert("로그인 성공!");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      window.alert("회원정보가 없습니다!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userinfo = action.payload;
      })
      .addCase(__getAppliedStudies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getAppliedStudies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applied = action.payload;
      })
      .addCase(__getFinishedStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getFinishedStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.finished = action.payload;
      })
      .addCase(__emailCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__emailCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emailCheck = false;
      })
      .addCase(__emailCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.emailCheck = true;
      })
      .addCase(__nicknameCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__nicknameCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nicknameCheck = false;
      })
      .addCase(__nicknameCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.nicknameCheck = true;
      })
      .addCase(__signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
      })
      .addCase(__signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
      });
  },
});

export default UserSlice.reducer;

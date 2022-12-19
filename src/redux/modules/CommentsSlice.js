import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.get(`/posts/${payload.postId}/comments`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      alert(`getCommentsError: ${e}`);
    }
  }
);

export const __addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.post(`/posts/${payload.postId}/comments`, {
        comment: payload.comment,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      alert(`addCommentsError: ${e}`);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "updateComment",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.put(
        `/posts/comments/${payload.commentId}`,
        {
          comment: payload.comment,
        }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      alert(`updateCommentError: ${e}`);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "deleteComment",
  async (payload, thunkAPI) => {
    try {
      await client.delete(`/posts/comments/${payload.commentId}`);
      return thunkAPI.fulfillWithValue(payload.commentId);
    } catch (e) {
      alert(`deleteCommentError: ${e}`);
    }
  }
);

const initialState = {
  postId: 1,
  comments: [
    {
      commentId: 1,
      userId: 1,
      nickname: "",
      comment: "",
      updatedAt: 1671425197822,
    },
  ],
  isLoading: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(__addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(__updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const comments = [...state.comments];
        state.comments = comments.map((comment) => {
          if (comment.commentId === action.payload.commentId) {
            return action.payload;
          }

          return comment;
        });
      })
      .addCase(__deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const comments = [...state.comments];
        state.comments = comments.filter(
          (comment) => comment.commentId !== action.payload
        );
      });
  },
});

export default commentsSlice.reducer;

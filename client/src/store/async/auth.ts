import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../libs/api/call/auth";
import { getUser } from "../../libs/api/call/user";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await loginApi(data);
      const token = res.data.data;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      const err = error as unknown as Error;
      console.log(error);

      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUserAsync = createAsyncThunk(
  "auth/getUser",
  async (token: string) => {
    try {
      const { data } = await getUser(token);

      return data.data;
    } catch (error) {
      const err = error as unknown as Error;
      console.log(err.message);
    }
  }
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/app";

interface IAuthState {
  user: IUser | undefined;
  token: string;
}

const initialState: IAuthState = {
  user: undefined,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    SET_LOGOUT: (state) => {
      localStorage.removeItem("token");
      state.user = undefined;
      window.location.reload();
    },
  },
});

export const { SET_LOGIN, SET_LOGOUT } = authSlice.actions;
export default authSlice.reducer;

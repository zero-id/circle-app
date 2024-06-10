import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFollowings, IFollowers } from "../../types/app";

interface IFollowState {
  followers: IFollowers[];
  followings: IFollowings[];
}

const initialState: IFollowState = {
  followers: [],
  followings: [],
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    GET_FOLLOW: (
      state,
      action: PayloadAction<{
        followers: IFollowers[];
        followings: IFollowings[];
      }>
    ) => {
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
    },
    // SET_LOGOUT: (state) => {
    //   localStorage.removeItem("token");
    //   state.user = undefined;
    //   window.location.reload();
    // },
  },
});

export const { GET_FOLLOW } = followSlice.actions;
export default followSlice.reducer;

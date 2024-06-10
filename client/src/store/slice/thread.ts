import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../types/app";

interface IThreadState {
  threads: IThread[];
}

const initialState: IThreadState = {
  threads: [],
};

export const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    SET_THREADS: (state, action: PayloadAction<IThread[]>) => {
      state.threads = action.payload;
    },
  },
});

export const { SET_THREADS } = threadSlice.actions;
export default threadSlice.reducer;

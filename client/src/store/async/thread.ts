import { createAsyncThunk } from "@reduxjs/toolkit";
import { getThreads } from "../../libs/api/call/thread";

export const getThreadsAsync = createAsyncThunk(
  "thread/getThreads",
  async () => {
    try {
        const threadRes = await getThreads();

        return threadRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

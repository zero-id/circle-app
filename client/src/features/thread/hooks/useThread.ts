import { useState } from "react";
import { IThread } from "../../../types/app";
import { getThread, getThreads } from "../../../libs/api/call/thread";
import { useParams } from "react-router-dom";

const useThread = () => {
  const { id } = useParams();

  const [thread, setThread] = useState<IThread[] | []>([]);

  const [threadDetail, setThreadDetail] = useState<IThread>({
    userId: 0,
    content: "",
    image: [],
    id: 0,
  });

  async function fetchThreads() {
    try {
      const res = await getThreads();
      const data = res.data.data;

      setThread(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchThread = async () => {
    try {
      const res = await getThread(+id!);
      setThreadDetail(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { thread, fetchThreads, threadDetail, fetchThread };
};

export default useThread;
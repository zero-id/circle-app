import { useParams } from "react-router-dom";
import { IThread } from "../../../types/app";
import { getThread } from "../../../libs/api/call/thread";
import { useState } from "react";

const useThreadDetail = () => {
  const avatar =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const { id } = useParams();

  const [thread, setThread] = useState<IThread>({
    userId: 0,
    content: "",
    image: [],
    id: 0,
  });

  const fetchThread = async () => {
    try {
      const res = await getThread(+id!);
      setThread(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { thread, fetchThread, avatar };
};

export default useThreadDetail;

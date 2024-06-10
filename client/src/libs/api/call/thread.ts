import { API } from "..";

export const getThreads = async () => {
  return await API.get("/threads");
};

export const createThread = async (data: {
  content: string;
  image: FileList | null;
  threadId?: number | undefined;
}) => {
  const formData = new FormData();

  if (data.image) {
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }
  }

  if (data.threadId) {
    formData.append("threadId", data.threadId.toString());
  }

  formData.append("content", data.content);
  return await API.post("/threads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getThread = async (id: number) => {
  return await API.get(`threads/${id}`);
};

export const getReplies = async (id: number) => {
  return await API.get("/threads/replies/" + id);
};


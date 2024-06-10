import { API } from "..";

export const checkLike = async (threadId: number) => {
  return await API.get(`/check-likes/${threadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const likeThread = async (body: { threadId: number }) => {
  return await API.post(`/likes`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

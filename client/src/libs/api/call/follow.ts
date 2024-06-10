import { API } from "..";

export const follow = async (body: { followingId: number }) => {
  return await API.post("/follows", body, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

export const getFollowers = async () => {
  return await API.get(`/follows/followers`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

export const getFollowings = async () => {
  return await API.get(`/follows/followings`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

export const getSuggestions = async () => {
  return await API.get("/follows/suggestions", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

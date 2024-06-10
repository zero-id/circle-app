import { API } from "..";

export const getProfile = async (token: string) => {
  return await API.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

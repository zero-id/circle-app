import { API } from "..";

export const updateUser = async (data: {
  username?: string;
  fullname?: string;
}) => {
  return await API.patch(`/users`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateProfile = async (data: FormData) => {
  return API.patch(`/users/profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getUsers = async () => {
  return await API.get(`/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getUser = async (token: string) => {
  return await API.get(`/users-detail`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

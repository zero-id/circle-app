import { API } from "..";

interface ILoginData {
  username: string;
  password: string;
}

export const loginApi = async (data: ILoginData) => {
  return await API.post("/auth/login", data);
};

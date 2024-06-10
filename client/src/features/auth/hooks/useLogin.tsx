import React from "react";
import { loginApi } from "../../../libs/api/call/auth";
import { useAppDispatch } from "../../../store";
import { SET_LOGIN } from "../../../store/slice/auth";
import { getUser } from "../../../libs/api/call/user";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const [formLogin, setFormLogin] = React.useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = async ({
    e,
    onClose,
  }: {
    e: React.FormEvent<HTMLFormElement>;
    onClose: () => void;
  }) => {
    e.preventDefault();
    try {
      const res = await loginApi(formLogin);
      const token = res.data.data;

      const resUser = await getUser(token);

      localStorage.setItem("token", token);

      dispatch(SET_LOGIN({ user: resUser.data.data, token }));
      onClose();
    } catch (error) {
      alert("Wrong username or password");
      console.log(error);
    }
  };

  const check = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getUser(token);
      dispatch(SET_LOGIN({ user: res.data.data, token }));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formLogin,
    handleChange,
    handleLogin,
    check,
  };
};

export default useLogin;

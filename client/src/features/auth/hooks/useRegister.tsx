import React from "react";
import { API } from "../../../libs/api";

const useRegiseter = () => {
  const [formRegister, setFormRegister] = React.useState<{
    fullname: string;
    username: string;
    email: string;
    password: string;
  }>({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async ({
    onClose,
    onOpenLogin,
  }: {
    onClose: () => void;
    onOpenLogin: () => void;
  }): Promise<void> => {
    try {
      const response = await API.post("/auth/register", formRegister);

  

      if (response.status === 201) {
        alert("Register success");
        onClose();
        onOpenLogin();
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    formRegister,
    handleChange,
    handleSubmit,
  };
};

export default useRegiseter;

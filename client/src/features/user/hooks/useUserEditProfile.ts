import React from "react";
import {
  updateUser,
  updateProfile,
  getUser,
} from "../../../libs/api/call/user";
import { useAppDispatch, useAppSelector } from "../../../store";
import { SET_LOGIN } from "../../../store/slice/auth";

const useUserEditProfile = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const [preview, setPreview] = React.useState({
    avatar: "",
    cover: "",
  });

  const [form, setForm] = React.useState<{
    fullname?: string;
    username?: string;
    bio?: string;
    avatar?: string;
    cover?: string;
  }>({
    fullname: "",
    username: "",
    bio: "",
    avatar: "",
    cover: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" || name === "cover") {
      if (!files) return;
      setForm({
        ...form,
        [name]: files[0],
      });
      setPreview({
        ...preview,
        [name]: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async ({
    e,
    onClose,
    callback,
  }: {
    e: React.FormEvent<HTMLFormElement>;
    onClose: () => void;
    callback?: () => void;
  }) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      if (!form.fullname) form.fullname = user?.fullname;
      if (!form.username) form.username = user?.username;

      if (!form.cover) form.cover = user?.profile?.cover;
      if (!form.avatar) form.avatar = user?.profile?.avatar;

      await updateUser({
        username: form.username,
        fullname: form.fullname,
      });

      const formProfile = new FormData();

      if (form.avatar !== user?.profile?.avatar) {
        formProfile.append("avatar", form.avatar as string);
      }
      if (form.cover !== user?.profile?.cover) {
        formProfile.append("cover", form.cover as string);
      }

      if (form.bio !== user?.profile?.bio) {
        formProfile.append("bio", form.bio as string);
      }

      await updateProfile(formProfile);

      const token = localStorage.getItem("token");

      if (token) {
        const res = await getUser(token);

        dispatch(SET_LOGIN({ user: res.data.data, token }));
      }

      if (callback) callback();

      setPreview({
        avatar: "",
        cover: "",
      });

      onClose();
    } catch (error) {
      const err = error as unknown as Error;
      if (err.message === "Request failed with status code 500")
        alert("Username already exists");

      if (err.message === "Request failed with status code 400")
        alert("Max file size is 2MB");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    preview,
    handleChange,
    handleSubmit,
    user,
    isLoading,
  };
};

export default useUserEditProfile;

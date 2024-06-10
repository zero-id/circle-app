import { useState } from "react";
import { IUser } from "../../../types/app";
import { getUsers } from "../../../libs/api/call/user";

const useUser = () => {
  const avatar =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const cover = "https://placehold.co/600x400";

  const [users, setUsers] = useState<IUser[] | []>([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
      
    }
  };

  return { avatar, cover, users, fetchUsers };
};

export default useUser;

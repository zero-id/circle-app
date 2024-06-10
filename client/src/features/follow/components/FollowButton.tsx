import { Box, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../store";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../types/app";
import { follow } from "../../../libs/api/call/follow";
import useLogin from "../../auth/hooks/useLogin";
import { SET_LOGIN } from "../../../store/slice/auth";
import { getUser } from "../../../libs/api/call/user";

type IFollowButtonProps = {
  user: IUser;
};

const FollowButton: React.FC<IFollowButtonProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { check } = useLogin();

  const checkFollowing = () => {
    if (auth.user && user) {
      const following = auth?.user?.follower?.find(
        (following) => following.followingId === user.id
      );
      setIsFollowing(following ? true : false);
    }
  };

  useEffect(() => {
    checkFollowing();
  }, [user]);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await follow({ followingId: +user.id! });

      await check();
      const resUser = await getUser(localStorage.token);
      dispatch(
        SET_LOGIN({
          user: resUser.data.data,
          token: localStorage.token,
        })
      );
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Button
        isLoading={isLoading}
        size={"sm"}
        variant={isFollowing ? "solid" : "outline"}
        borderRadius={"full"}
        colorScheme={"green"}
        bg={isFollowing ? "green" : ""}
        color={isFollowing ? "white" : "green"}
        px={3}
        onClick={handleFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  );
};

export default FollowButton;

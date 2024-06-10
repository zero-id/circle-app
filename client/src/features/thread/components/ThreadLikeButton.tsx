import React, { useEffect } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ModalDialog from "../../../components/ModalDialog";
import FormLogin from "../../auth/components/FormLogin";
import { IThread } from "../../../types/app";
import useThreadLike from "../hooks/useThreadLike";
import FormRegister from "../../auth/components/FormRegister";

interface IThreadLikeButtonProps {
  thread?: IThread | undefined;
}

const ThreadLikeButton: React.FC<IThreadLikeButtonProps> = ({ thread }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  const { isLiked, setLikesCount, checkLike, handleLike, auth, likesCount } =
    useThreadLike();

  useEffect(() => {
    checkLike({ thread });
    setLikesCount(thread?._count?.like);
  }, [thread?._count?.like, auth?.user]);

  return (
    <>
      <Button
        onClick={() =>
          localStorage.getItem("token") ? handleLike({ thread }) : onOpen()
        }
        _hover={{ backgroundColor: "transparent" }}
        backgroundColor={"transparent"}
        justifyContent={"left"}
        alignItems={"center"}
        padding={"0"}
        color={"white"}
        gap={"1"}
        fontSize={"13px"}
        me={"20px"}
      >
        {likesCount}
        {isLiked ? (
          <AiFillHeart color="red" style={{ fontSize: "20px", padding: "0" }} />
        ) : (
          <AiOutlineHeart
            color="white"
            style={{ fontSize: "20px", padding: "0" }}
          />
        )}
        {}
      </Button>
      <ModalDialog
        isOpen={isOpen}
        onClose={onClose}
        children={
          <FormLogin onClose={onClose} onOpenRegister={onCloseRegister} />
        }
        title="Login"
      />
      <ModalDialog
        isOpen={isOpenRegister}
        onClose={onCloseRegister}
        children={
          <FormRegister onClose={onCloseRegister} onOpenLogin={onOpen} />
        }
        title="Register"
      />
    </>
  );
};

export default ThreadLikeButton;

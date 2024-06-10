import {
  Button,
  FormLabel,
  Input,
  Image,
  Box,
  FormControl,
  useDisclosure,
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import React from "react";
import useThreadPost from "../hooks/useThreadPost";
import ModalDialog from "../../../components/ModalDialog";
import FormLogin from "../../auth/components/FormLogin";
import FormRegister from "../../auth/components/FormRegister";

interface IPostThreadProps {
  threadId?: number | undefined;
  callback: () => void;
  onClose?: () => void;
}

const profileDefault =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const ThreadPost = ({ threadId, callback, onClose }: IPostThreadProps) => {
  const {
    profile,
    formThread,
    handleChange,
    handlePostThread,
    onCloseLogin,
    isOpenLogin,
    isLoading,
    onOpenLogin,
  } = useThreadPost();

  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  return (
    <Box>
      <form
        onSubmit={(e: React.FocusEvent<HTMLFormElement>) =>
          handlePostThread({ e, callback, threadId, onClose })
        }
        style={{ display: "flex", gap: "3" }}
        encType="multipart/form-data"
      >
        <FormControl display={"flex"} alignItems={"center"} gap={"3"}>
          <Image
            w={"40px"}
            h={"40px"}
            rounded={"full"}
            objectFit={"cover"}
            src={profile?.profile?.avatar ?? profileDefault}
          />
          <Input
            placeholder="What is happening?!"
            color={"white"}
            type="text"
            border={"none"}
            name="content"
            value={formThread.content}
            onChange={handleChange}
          />
          <FormLabel htmlFor="image" mt={"7px"} position={"relative"}>
            <LuImagePlus cursor={"pointer"} color="green" fontSize={"20px"} />
            {formThread.image && (
              <Box
                style={{
                  color: "green",
                  fontSize: "12px",
                  position: "absolute",
                  bottom: "-20px",
                  right: "-65px",
                  width: "100px",
                }}
              >
                {formThread.image?.length} Image
              </Box>
            )}
          </FormLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            max={4}
            display={"none"}
            id="image"
            name="image"
            onChange={handleChange}
          />
          <Button
            isLoading={isLoading}
            borderRadius={"20px"}
            backgroundColor={"green"}
            type="submit"
            fontSize={"14px"}
            w={"auto"}
            h={"auto"}
            px={"20px"}
            py={"5px"}
          >
            Post
          </Button>
          <ModalDialog
            isOpen={isOpenLogin}
            onClose={onCloseLogin}
            children={
              <FormLogin
                onClose={onCloseLogin}
                onOpenRegister={onOpenRegister}
              />
            }
            title="Login"
          />
          <ModalDialog
            isOpen={isOpenRegister}
            onClose={onCloseRegister}
            children={
              <FormRegister
                onClose={onCloseRegister}
                onOpenLogin={onOpenLogin}
              />
            }
            title="Register"
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default ThreadPost;

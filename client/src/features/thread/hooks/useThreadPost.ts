import { useState } from "react";
import { useAppSelector } from "../../../store";
import { createThread } from "../../../libs/api/call/thread";
import { useDisclosure } from "@chakra-ui/react";

const useThreadPost = () => {
  const profile = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);

  const [formThread, setFormThread] = useState<{
    content: string;
    image: FileList | null;
    threadId?: number | undefined;
  }>({
    content: "",
    image: null,
  });

  const {
    onOpen: onOpenLogin,
    isOpen: isOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("form", formThread);

    const { name, value, files } = e.target;
    if (name === "image") {
      setFormThread({
        ...formThread,
        [name]: files,
      });
    } else {
      setFormThread({
        ...formThread,
        [name]: value,
      });
    }
  };

  const handlePostThread = async ({
    e,
    callback,
    threadId,
    onClose,
  }: {
    e: React.FormEvent<HTMLFormElement>;
    callback: () => void;
    onClose?: () => void;
    threadId?: number | undefined;
  }) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      

      if (!profile) {
        onOpenLogin();
        return;
      }

      if (formThread.content === "") {
        alert("Content is require!")
      }

      if (threadId) {
        formThread.threadId = threadId;
      }

      await createThread(formThread);

      callback();

      if (onClose) onClose();

      setFormThread({
        content: "",
        image: null,
      });
    } catch (error) {
      const err = error as Error;
      if (err.message === "Request failed with status code 400")
        alert("Max image size 2mb");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formThread,
    handleChange,
    handlePostThread,
    profile,
    onCloseLogin,
    isOpenLogin,
    isLoading,
    onOpenLogin,
  };
};

export default useThreadPost;

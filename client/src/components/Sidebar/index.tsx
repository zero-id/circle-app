import {
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import ModalDialog from "../ModalDialog";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidHomeCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbUserSearch, TbLogout2 } from "react-icons/tb";
import { SET_LOGOUT } from "../../store/slice/auth";
import FormLogin from "../../features/auth/components/FormLogin";
import FormRegister from "../../features/auth/components/FormRegister";
import ThreadPost from "../../features/thread/components/ThreadPost";
import { useEffect } from "react";
import useThread from "../../features/thread/hooks/useThread";

const Sidebar = () => {
  const auth = useAppSelector((state) => state.auth);
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();
  const {
    isOpen: isOpenThread,
    onOpen: onOpenThread,
    onClose: onCloseThread,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { fetchThreads } = useThread();

  useEffect(() => {
    fetchThreads();
  }, []);

  return !auth.user ? (
    <Box>
      <Box pb={"20px"}>
        <Text
          textAlign={"center"}
          color={"green"}
          fontSize={"40px"}
          fontWeight={"bold"}
        >
          circle
        </Text>
      </Box>
      <Box pb={"20px"}>
        <Button colorScheme="green" width={"100%"} onClick={onOpenLogin}>
          Login
        </Button>
        <ModalDialog
          isOpen={isOpenLogin}
          onClose={onCloseLogin}
          children={
            <FormLogin onClose={onCloseLogin} onOpenRegister={onOpenRegister} />
          }
          title="Login"
        />
      </Box>
      <Box>
        <Button colorScheme="green" width={"100%"} onClick={onOpenRegister}>
          Register
        </Button>
        <ModalDialog
          isOpen={isOpenRegister}
          onClose={onCloseRegister}
          children={
            <FormRegister onClose={onCloseRegister} onOpenLogin={onOpenLogin} />
          }
          title="Register"
        />
      </Box>
    </Box>
  ) : (
    <Box h={"100%"} pos={"relative"}>
      <UnorderedList
        listStyleType="none"
        display="flex"
        flexDir={"column"}
        gap={"5"}
        ms={"0px"}
      >
        <ListItem color={"green"} fontSize={"40px"} fontWeight={"bold"}>
          circle
        </ListItem>
        <ListItem
          color={"white"}
          display={"flex"}
          alignItems={"center"}
          gap={"2"}
          cursor={"pointer"}
          onClick={() => {
            navigate("/");
          }}
        >
          <BiSolidHomeCircle style={{ fontSize: "25px" }} />
          Home
        </ListItem>
        <ListItem
          color={"white"}
          display={"flex"}
          alignItems={"center"}
          gap={"2"}
          onClick={() => {
            navigate("/search");
          }}
          cursor={"pointer"}
        >
          <TbUserSearch style={{ fontSize: "25px" }} /> Search
        </ListItem>
        <ListItem
          color={"white"}
          display={"flex"}
          alignItems={"center"}
          gap={"2"}
          cursor={"pointer"}
          onClick={() => {
            navigate("/follows");
          }}
        >
          <AiOutlineHeart style={{ fontSize: "25px" }} />
          Follows
        </ListItem>
        <ListItem
          color={"white"}
          display={"flex"}
          alignItems={"center"}
          gap={"2"}
          cursor={"pointer"}
          onClick={() => {
            navigate("/detail-profile/" + auth?.user?.id);
          }}
        >
          <FaRegUserCircle style={{ fontSize: "25px" }} />
          Profile
        </ListItem>
        <ListItem
          onClick={onOpenThread}
          color={"white"}
          display={"flex"}
          alignItems={"center"}
          gap={"2"}
          bgColor={"green"}
          justifyContent={"center"}
          fontSize={"15px"}
          borderRadius={"20px"}
          p={"6px"}
          mt={"10px"}
        >
          Create Post
          <ModalDialog
            isOpen={isOpenThread}
            onClose={onCloseThread}
            children={
              <ThreadPost callback={fetchThreads} onClose={onCloseThread} />
            }
            title="Login"
          />
        </ListItem>
      </UnorderedList>
      <Flex
        onClick={() => {
          dispatch(SET_LOGOUT());
        }}
        gap={"2"}
        alignItems={"center"}
        color={"white"}
        bottom={"40px"}
        position={"absolute"}
        cursor={"pointer"}
      >
        <TbLogout2 fontSize={"20px"} />

        <Text>Logout</Text>
      </Flex>
    </Box>
  );
};

export default Sidebar;

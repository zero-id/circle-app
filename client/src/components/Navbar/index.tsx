import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidHomeCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLogout2, TbUserSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { SET_LOGOUT } from "../../store/slice/auth";
import ModalDialog from "../ModalDialog";
import FormLogin from "../../features/auth/components/FormLogin";
import FormRegister from "../../features/auth/components/FormRegister";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
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

  return (
    <Box
      bgColor={!auth.user ? "rgba(29, 29, 29, 1)" : "green"}
      pos={"fixed"}
      left={"0"}
      right={"0"}
      bottom={"0"}
      h={"50px"}
      zIndex={"10"}
      display={{base: "block", md: "none"}}
    >
      {!auth.user ? (
        <Flex gap={"3"} p={2}>
          <Box flex={"1"} pb={"20px"}>
            <Button
              size={"sm"}
              colorScheme="green"
              width={"100%"}
              onClick={onOpenLogin}
            >
              Login
            </Button>
            <ModalDialog
              isOpen={isOpenLogin}
              onClose={onCloseLogin}
              children={<FormLogin onClose={onCloseLogin} onOpenRegister={onOpenRegister} />}
              title="Login"
            />
          </Box>
          <Box flex={"1"}>
            <Button
              size={"sm"}
              colorScheme="green"
              width={"100%"}
              onClick={onOpenRegister}
            >
              Register
            </Button>
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
          </Box>
        </Flex>
      ) : (
        <Flex
          fontSize={"14px"}
          gap={"7"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            pt={"4px"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={() => {
              navigate("/");
            }}
          >
            <BiSolidHomeCircle style={{ fontSize: "22px" }} />
            <Text>Home</Text>
          </Flex>
          <Flex
            pt={"4px"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={() => {
              navigate("/search");
            }}
          >
            <TbUserSearch style={{ fontSize: "22px" }} />
            <Text>Search</Text>
          </Flex>
          <Flex
            pt={"4px"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={() => {
              navigate("/follows");
            }}
          >
            <AiOutlineHeart style={{ fontSize: "22px" }} />
            <Text>Follows</Text>
          </Flex>
          <Flex
            pt={"4px"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={() => {
              navigate("/detail-profile/" + auth?.user?.id);
            }}
          >
            <FaRegUserCircle style={{ fontSize: "22px" }} />
            <Text>Profile</Text>
          </Flex>
          <Flex
            pt={"4px"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={() => {
              dispatch(SET_LOGOUT());
            }}
          >
            <TbLogout2 fontSize={"20px"} />
            <Text>Logout</Text>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;

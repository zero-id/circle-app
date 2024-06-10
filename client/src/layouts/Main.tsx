import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAppSelector } from "../store";
import { FooterCard } from "../components/Footer";
import { UserProfileCard } from "../features/user/components/UserProfileCard";
import useLogin from "../features/auth/hooks/useLogin";
import FollowSuggesttion from "../features/follow/components/FollowSuggesttion";
import Navbar from "../components/Navbar";

const Main = () => {
  const { id } = useParams();
  const { check } = useLogin();
  const auth = useAppSelector((state) => state.auth.user);

  console.log(auth, "auth");

  useEffect(() => {
    check();
  }, []);

  return (
    <Flex
      maxW={"1280px"}
      bgColor={"rgba(29, 29, 29, 1)"}
      h={"100vh"}
      color={"white"}
    >
      <Box p={"20px"} display={{ base: "none", md: "block" }} flex={1.1}>
        <Sidebar />
      </Box>
      <Box
        flex={2.5}
        overflow={"auto"}
        className="scrollbar-hide"
        border={{ base: "none", md: "1px solid gray" }}
        borderTop={"none"}
      >
        <Navbar />
        <Outlet />
      </Box>
      <Box
        p={"20px"}
        flex={1.4}
        display={{ base: "none", md: "flex" }}
        flexDir={"column"}
        gap={"10px"}
        overflow={"auto"}
        className="scrollbar-hide"
      >
        {auth && auth.id !== +id! && (
          <>
            <Box
              w={"100%"}
              p={"15px"}
              backgroundColor={"rgba(38, 38, 38, 1)"}
              gap={"2"}
              display={"flex"}
              flexDir={"column"}
              borderRadius={"5px"}
            >
              <Text fontSize={"16px"} fontWeight={"bold"}>
                My Profile
              </Text>
              <UserProfileCard user={auth} />
            </Box>
            <FollowSuggesttion />
          </>
        )}

        <FooterCard />
      </Box>
    </Flex>
  );
};

export default Main;

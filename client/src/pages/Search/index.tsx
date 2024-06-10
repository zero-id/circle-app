import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { TbUserSearch } from "react-icons/tb";
import useUser from "../../features/user/hooks/useUser";
import { useAppSelector } from "../../store";
import UserCard from "../../features/user/components/UserCard";

export default function SearchPage() {
  const [filter, setFilter]: [string, (search: string) => void] =
    React.useState("");

  const auth = useAppSelector((state) => state.auth.user);

  const { fetchUsers, users } = useUser();

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const userWithOutLogin = users?.filter((user: any) => user.id !== auth?.id);

  console.log(userWithOutLogin);
  

  const handleChangeFilter = (e: { target: { value: string } }) => {
    setFilter(e.target.value);
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        borderColor={"brand.grey"}
        p={"20px"}
        w={"100%"}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            {/* <AiOutlineTeam color={"gray"} /> */}
            <TbUserSearch color="gray" />
          </InputLeftElement>
          <Input
            variant={"outline"}
            colorScheme="teal"
            borderRadius={"full"}
            color={"white"}
            placeholder="Search your friend"
            fontWeight={"semibold"}
            fontSize={"sm"}
            border={"1px solid #d3d3d3"}
            type="text"
            onChange={handleChangeFilter}
          />
        </InputGroup>
        {/* <Flex justifyContent={"center"} mt={"40vh"} flexDir={"column"}>
          <Text align={"center"} color={"white"} fontWeight={"semibold"}>
            Write and search something
          </Text>
          <Text align={"center"} color={"gray"} fontSize={"12px"}>
            Try searching for something else or check the <br /> spelling of
            what you typed.
          </Text>
        </Flex> */}

        {filter == "" ? (
          <Flex justifyContent={"center"} mt={"40vh"} flexDir={"column"}>
            <Text align={"center"} color={"white"} fontWeight={"semibold"}>
              Write and search something
            </Text>
            <Text align={"center"} color={"gray"} fontSize={"12px"}>
              Try searching for something else or check the <br /> spelling of
              what you typed.
            </Text>
          </Flex>
        ) : (
          userWithOutLogin?.map((data: any) => {
            if (data.fullname.toLowerCase().includes(filter.toLowerCase())) {
              return (
                <Box width={"full"} mt={2} key={data.id} px={1}>
                  <UserCard
                    id={data.id}
                    fullname={data?.fullname}
                    username={data?.username}
                    profile={data?.profile}
                  />
                </Box>
              );
            }
          })
        )}
      </Box>
    </Box>
  );
}

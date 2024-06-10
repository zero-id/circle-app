import {
  Box,
  Grid,
  GridItem,
  Image,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { UserProfileCard } from "../../features/user/components/UserProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../features/user/hooks/useUser";
import { useEffect } from "react";
import ThreadCard from "../../features/thread/components/ThreadCard";
import { IThread } from "../../types/app";

const ProfilePage = () => {
  const { users, fetchUsers } = useUser();
  const { id } = useParams();
  const user = users.find((user) => user.id === +id!);

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigate = useNavigate();
  return (
    <Box className="beranda" color={"white"}>
      <Box>
        <Box
          w={"100%"}
          p={"15px"}
          backgroundColor={"rgba(29, 29, 29, 1)"}
          gap={"3"}
          display={"flex"}
          flexDir={"column"}
          borderRadius={"5px"}
        >
          <Text
            onClick={() => navigate("/")}
            fontSize={"20px"}
            fontWeight={"bold"}
            cursor={"pointer"}
          >
            &larr; {user?.fullname}
          </Text>
          <UserProfileCard user={user} callback={fetchUsers} />
        </Box>
        <Tabs isFitted variant="">
          <TabList
            mb="1em"
            border={"1px solid rgba(63, 63, 63, 1)"}
            borderTop={"none"}
          >
            <Tab
              onClick={() => {
                // dispatch(SET_FOLLOW_STATE("followers"));
              }}
            >
              All Post
            </Tab>
            <Tab
              onClick={() => {
                // dispatch(SET_FOLLOW_STATE("followings"));
              }}
            >
              Media
            </Tab>
          </TabList>
          <TabIndicator mt="-17px" height="2px" bg="green" borderRadius="1px" />
          <TabPanels>
            <TabPanel p={"0"}>
              {user?.thread
                ?.filter((thread) => thread.userId === +id!)
                .map((thread) => (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    callback={fetchUsers}
                  />
                ))}
            </TabPanel>
            <TabPanel>
              {user?.thread && (
                <Grid
                  templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
                  gap={3}
                >
                  {user?.thread?.map(
                    (
                      thread: IThread,
                      i: number
                    ): React.JSX.Element | undefined => {
                      if (thread?.image && thread.image.length > 0)
                        return (
                          <GridItem key={i}>
                            <Image
                              onClick={() =>
                                navigate(`/detail-image/${thread.id}`)
                              }
                              src={thread?.image[0]?.image}
                              alt="Image 1"
                              w={"170px"}
                              h={"170px"}
                              borderRadius={"5px"}
                              objectFit={"cover"}
                            />
                          </GridItem>
                        );
                    }
                  )}
                </Grid>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfilePage;

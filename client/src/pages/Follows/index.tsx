import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { getFollowers, getFollowings } from "../../libs/api/call/follow";
import { useEffect, useState } from "react";
import { IFollowers, IFollowings } from "../../types/app";
import UserCard from "../../features/user/components/UserCard";

const FollowsPage = () => {
  const [follow, setFollow] = useState<{
    followers: IFollowers[];
    followings: IFollowings[];
  }>({
    followers: [],
    followings: [],
  });

  const followers = follow.followers.map((follower: any) => follower);
  const following = follow.followings.map((following: any) => following);

  const fetchFollowersFollowings = async () => {
    try {
      const resfollowers = await getFollowers();
      const resfollowings = await getFollowings();

      const followers = resfollowers.data.data.map(
        (follower: any) => follower.follower
      );
      const followings = resfollowings.data.data.map(
        (following: any) => following.following
      );

      setFollow({
        ...follow,
        followers: followers,
        followings: followings,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowersFollowings();
  }, []);

  return (
    <Box className="beranda" color={"white"}>
      <Box>
        <Text px={"20px"} pt={"20px"} fontWeight={"bold"} fontSize={"20px"}>
          Follows
        </Text>
        <Tabs isFitted variant="">
          <TabList
            mb="1em"
            border={"1px solid rgba(63, 63, 63, 1)"}
            borderTop={"none"}
          >
            <Tab
              onClick={() => {
                fetchFollowersFollowings();
              }}
            >
              Followers
            </Tab>
            <Tab
              onClick={() => {
                fetchFollowersFollowings();
              }}
            >
              Followings
            </Tab>
          </TabList>
          <TabIndicator mt="-17px" height="2px" bg="green" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              {followers.map((follower, index) => (
                <UserCard
                  key={index}
                  id={follower?.id}
                  fullname={follower?.fullname}
                  username={follower?.username}
                  profile={follower?.profile}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {following.map((following, index) => (
                <UserCard
                  key={index}
                  id={following.id}
                  fullname={following?.fullname}
                  username={following?.username}
                  profile={following?.profile}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default FollowsPage;

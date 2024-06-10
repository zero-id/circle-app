import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import ThreadPost from "../../features/thread/components/ThreadPost";
import ThreadCard from "../../features/thread/components/ThreadCard";
import useThread from "../../features/thread/hooks/useThread";
import { useAppSelector } from "../../store";

const Home = () => {
  const { thread, fetchThreads } = useThread();
  const auth = useAppSelector((state) => state.auth.user?.follower);

  const threadFilter = thread.filter((thread) => thread.threadId === null);

  console.log(auth, "auth");
  console.log(thread, "thread");

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <Box className="beranda" overflow={"auto"}>
      <Box
        border={"1px solid rgba(63, 63, 63, 1)"}
        borderTop={"none"}
        p={"20px"}
        pt={"15px"}
      >
        <Text mb={"20px"} fontSize={"22px"} color={"white"} fontWeight={"bold"}>
          Home
        </Text>
        <ThreadPost callback={fetchThreads} />
      </Box>
      {threadFilter.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} callback={fetchThreads} />
      ))}
    </Box>
  );
};

export default Home;

import { SimpleGrid, GridItem, Box, Text, Image } from "@chakra-ui/react";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import ThreadCard from "./ThreadCard";
import ThreadLikeButton from "./ThreadLikeButton";
import ThreadPost from "./ThreadPost";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useThread from "../hooks/useThread";
import useUser from "../../user/hooks/useUser";
import { IThread, IThreadImage } from "../../../types/app";

const ThreadDetail = () => {
  const { avatar } = useUser();
  const { id } = useParams();
  const { thread, fetchThreads } = useThread();

  const threadDetail = thread.find((thread) => thread?.id === +id!);

  const navigate = useNavigate();
  useEffect(() => {
    fetchThreads();
  }, []);
  return (
    <Box className="beranda" overflow={"auto"}>
      <Box
        border={"1px solid rgba(63, 63, 63, 1)"}
        p={"20px"}
        display={"flex"}
        flexDir={"column"}
        gap={"2"}
      >
        <Text
          display={"flex"}
          alignItems={"center"}
          gap={"3"}
          mb={"20px"}
          fontSize={"22px"}
          color={"white"}
          fontWeight={"bold"}
        >
          <BsArrowLeft cursor={"pointer"} onClick={() => navigate("/")} />
          Status
        </Text>
        <Box display={"flex"} gap={"5"}>
          <Image
            width={"40px"}
            height={"40px"}
            borderRadius={"100%"}
            objectFit={"cover"}
            src={threadDetail?.author?.profile?.avatar ?? avatar}
          />
          <Box>
            <Text fontWeight={"bold"} fontSize={"14px"} color={"white"}>
              {threadDetail?.author?.fullname}
            </Text>
            <Text fontSize={"14px"} color={"gray"}>
              @{threadDetail?.author?.username}
            </Text>
          </Box>
        </Box>
        <Text fontSize={"14px"} color={"white"}>
          {threadDetail?.content}
        </Text>
        {threadDetail?.image && threadDetail?.image?.length > 0 && (
          <SimpleGrid
            gap={"10px"}
            columns={threadDetail.image.length === 1 ? 1 : 2}
            spacing={2}
          >
            {threadDetail?.image?.map((image: IThreadImage, i: number) => {
              return (
                <GridItem w={"100%"} key={i}>
                  <Image
                    w={"100%"}
                    h={"250px"}
                    objectFit={"cover"}
                    borderRadius={"5px"}
                    cursor={"pointer"}
                    onClick={() => navigate("/detail-image/" + threadDetail.id)}
                    src={image.image ? image.image : ""}
                  />
                </GridItem>
              );
            })}
          </SimpleGrid>
        )}
        <Box fontSize={"14px"} color={"grey"} display={"flex"}>
          {moment(threadDetail?.createdAt).fromNow()}
        </Box>
        <Box display={"flex"}>
          <ThreadLikeButton thread={threadDetail} />
          <Text
            _hover={{ backgroundColor: "transparent" }}
            backgroundColor={"transparent"}
            justifyContent={"left"}
            padding={"0"}
            color={"grey"}
            gap={"1"}
            fontSize={"14px"}
            display={"flex"}
            cursor={"pointer"}
            alignItems={"center"}
          >
            <BiCommentDetail
              color="white"
              style={{ fontSize: "20px", padding: "0" }}
            />
            {threadDetail?.replies?.length}
          </Text>
        </Box>
      </Box>
      <Box border={"1px solid rgba(63, 63, 63, 1)"} p={"20px"} pt={"15px"}>
        <ThreadPost threadId={threadDetail?.id} callback={fetchThreads} />
      </Box>
      {threadDetail?.replies?.map((replies: IThread, i: number) => {
        return <ThreadCard callback={fetchThreads} key={i} thread={replies} />;
      })}
    </Box>
  );
};

export default ThreadDetail;

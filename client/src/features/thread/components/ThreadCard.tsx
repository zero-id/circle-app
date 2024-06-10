import React from "react";
import { Box, GridItem, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IThread, IThreadImage } from "../../../types/app";
import ThreadLikeButton from "./ThreadLikeButton";
import useUser from "../../user/hooks/useUser";

interface IThreadCardProps {
  thread: IThread;
  callback: () => void;
}

const ThreadCard: React.FC<IThreadCardProps> = ({ thread, callback }) => {
  const navigate = useNavigate();

  const { avatar } = useUser();

  return (
    <Box
      display={"flex"}
      border={"1px solid rgba(63, 63, 63, 1)"}
      borderTop={"none"}
      p={"20px"}
      pt={"20px"}
      gap={"20px"}
    >
      <Box
        cursor={"pointer"}
        onClick={() => navigate(`/detail-profile/${thread.author?.id}`)}
      >
        <Image
          w={"40px"}
          h={"40px"}
          rounded={"full"}
          objectFit={"cover"}
          borderRadius={"100%"}
          src={
            thread?.author?.profile?.avatar
              ? thread.author.profile.avatar
              : avatar
          }
        />
      </Box>
      <Box
        w={"90%"}
        display={"flex"}
        flexDir={"column"}
        gap={"10px"}
        color={"white"}
        fontSize={"14px"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Text
            onClick={() => navigate(`/detail-profile/${thread.author?.id}`)}
            fontSize={"14px"}
            fontWeight={"bold"}
            pe={"10px"}
            cursor={"pointer"}
          >
            {thread.author?.fullname}
          </Text>
          <Text fontSize={"14px"} color={"gray"}>
            @{thread.author?.username}
          </Text>
          <BsDot color="gray" />
          <Text fontSize={"14px"} color={"gray"}>
            {moment(thread.createdAt).fromNow()}
          </Text>
        </Box>
        <Text
          cursor={"pointer"}
          onClick={() => {
            callback();
            navigate(`/detail-thread/${thread.id}`);
          }}
        >
          {thread?.content}
        </Text>

        {thread?.image && thread?.image?.length > 0 && (
          <SimpleGrid
            gap={"10px"}
            columns={thread.image.length === 1 ? 1 : 2}
            spacing={2}
          >
            {thread?.image?.map((image: IThreadImage, i: number) => {
              return (
                <GridItem w={"100%"} key={i}>
                  <Image
                    w={"100%"}
                    h={"250px"}
                    objectFit={"cover"}
                    borderRadius={"5px"}
                    onClick={() => navigate("/detail-image/" + thread.id)}
                    src={image.image ? image.image : ""}
                  />
                </GridItem>
              );
            })}
          </SimpleGrid>
        )}
        <Box display={"flex"} gap={"10px"}>
          <ThreadLikeButton thread={thread} />

          <Box
            _hover={{ backgroundColor: "transparent" }}
            backgroundColor={"transparent"}
            padding={"0"}
            color={"white"}
            fontSize={"14px"}
            display={"flex"}
            cursor={"pointer"}
            alignItems={"center"}
            gap={"1"}
          >
            <BiCommentDetail
              color="white"
              style={{ fontSize: "20px", padding: "0" }}
              onClick={() => navigate(`/detail-thread/${thread.id}`)}
            />
            <Text>{thread?._count?.replies}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ThreadCard;

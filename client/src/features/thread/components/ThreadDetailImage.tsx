import { Flex, Button, Box, Text, Image } from "@chakra-ui/react";
import moment from "moment";
import { BiCommentDetail } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import ThreadLikeButton from "./ThreadLikeButton";
import useThreadDetailImage from "../hooks/useThreadDetailImage";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThreadPost from "./ThreadPost";
import ThreadCard from "./ThreadCard";
import useUser from "../../user/hooks/useUser";
import { IThread } from "../../../types/app";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const ThreadDetailImage = () => {
  const navigate = useNavigate();
  const { avatar } = useUser();
  const [display, setDisplay] = React.useState(true);

  const {
    threadDetail,
    fetchThreads,
    slides,
    slidesCount,
    carouselStyle,
    prevSlide,
    nextSlide,
  } = useThreadDetailImage();

  useEffect(() => {
    fetchThreads();
  });

  return (
    <Flex pos={"relative"} bgColor={"rgba(29, 29, 29, 1)"}>
      <Box
        pos={"absolute"}
        color={"black"}
        right={"30px"}
        top={"5px"}
        bgColor={"white"}
        lineHeight={"20px"}
        fontWeight={"bold"}
        shadow={"lg"}
        cursor={"pointer"}
        zIndex={"10"}
        p={"5px 10px"}
        borderRadius={"100%"}
        onClick={() => navigate(-1)}
      >
        <Text>X</Text>
      </Box>
      <Flex
        w="full"
        position={"relative"}
        overflow="hidden"
        rounded={"md"}
        pos="relative"
        flex={2.5}
      >
        <Box
          pos={"absolute"}
          right={"30px"}
          top={"30px"}
          cursor={"pointer"}
          zIndex={"10"}
          rounded={"full"}
          shadow={"lg"}
          onClick={() => setDisplay(!display)}
        >
          {display ? (
            <IoIosArrowDropright size={"30px"} />
          ) : (
            <IoIosArrowDropleft size={"30px"} />
          )}
        </Box>
        <Flex h="100vh" w="full" {...carouselStyle}>
          {slides?.map((slide, sid) => (
            <Box
              key={`slide-${sid}`}
              boxSize="full"
              p={"25px"}
              shadow="md"
              flex="none"
            >
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide}
                alt="carousel image"
                w={"full"}
                h={"full"}
                backgroundSize="cover"
                objectFit={"cover"}
              />
            </Box>
          ))}
        </Flex>
        {slides?.length === 1 ? null : (
          <>
            <Text
              position={"absolute"}
              cursor={"pointer"}
              top={"50%"}
              left="50px"
              onClick={prevSlide}
              fontSize={"3xl"}
              color={"green"}
            >
              &#10094;
            </Text>
            <Text
              position={"absolute"}
              cursor={"pointer"}
              top={"50%"}
              right="50px"
              fontSize={"3xl"}
              onClick={nextSlide}
              color={"green"}
            >
              &#10095;
            </Text>
          </>
        )}
      </Flex>
      {display && (
        <Box
          border={"1px solid rgba(63, 63, 63, 1)"}
          flex={1.2}
          h={"100vh"}
          overflow={"scroll"}
          className="scrollbar-hide"
          me={"20px"}
          display={{ base: "none", md: "block" }}
        >
          <Box p={"20px"} pb={"0"} display={"flex"} gap={"5"}>
            <Box w={"40px"} cursor={"pointer"}>
              <Image
                rounded={"full"}
                w={"40px"}
                h={"40px"}
                objectFit={"cover"}
                src={threadDetail?.author?.profile?.avatar ?? avatar}
                alt="image"
              />
            </Box>
            <Box display={"flex"} flexDir={"column"} gap={1}>
              <Box display={"flex"} gap={"3"}>
                <Box>
                  <Text
                    onClick={() =>
                      navigate(`/detail-profile/${threadDetail?.author?.id}`)
                    }
                    fontSize={"14px"}
                    fontWeight={"bold"}
                    cursor={"pointer"}
                    color={"white"}
                  >
                    {threadDetail?.author?.fullname}
                  </Text>
                  <Text fontSize={"12px"} color={"gray"}>
                    @{threadDetail?.author?.username}
                  </Text>
                </Box>
                <BsDot fontSize={"20px"} color="gray" />
                <Text fontSize={"14px"} color={"gray"}>
                  {moment(threadDetail?.createdAt).fromNow()}
                </Text>
              </Box>
              <Text
                cursor={"pointer"}
                onClick={() => navigate(`/detail-post/${threadDetail?.id}`)}
                color={"white"}
                fontSize={"14px"}
              >
                {threadDetail?.content}
              </Text>
              <Box>
                <ThreadLikeButton thread={threadDetail} />
                <Button
                  _hover={{ backgroundColor: "transparent" }}
                  backgroundColor={"transparent"}
                  justifyContent={"left"}
                  padding={"0"}
                  color={"white"}
                  gap={"1"}
                  fontSize={"14px"}
                  w={"auto"}
                  h={"auto"}
                >
                  <BiCommentDetail
                    color="white"
                    style={{ fontSize: "20px", padding: "0" }}
                    onClick={() => navigate(`/detail-post/${threadDetail?.id}`)}
                  />
                  {threadDetail?._count?.replies}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box border={"1px solid rgba(63, 63, 63, 1)"} p={"20px"} pt={"15px"}>
            <ThreadPost   threadId={threadDetail?.id} callback={fetchThreads} />
          </Box>
          {threadDetail?.replies?.map(
            (theard: IThread, i: number): React.JSX.Element => {
              return (
                <ThreadCard key={i} thread={theard} callback={fetchThreads} />
              );
            }
          )}
        </Box>
      )}
    </Flex>
  );
};

export default ThreadDetailImage;

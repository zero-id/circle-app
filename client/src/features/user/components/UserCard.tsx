import { Box, Avatar, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FollowButton from "../../follow/components/FollowButton";
import { IUser } from "../../../types/app";

export default function UserCard(props: IUser) {
  const navigate = useNavigate();

  return (
    <Box
      cursor={"pointer"}
      display={"flex"}
      gap={2}
      p={0}
      mt={2}
      alignItems={"center"}
    >
      <Avatar
        onClick={() => navigate(`/detail-profile/${props.id}`)}
        src={
          props?.profile?.avatar
            ? props?.profile?.avatar
            : "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
        }
        border={"2px solid black"}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        flex={1}
        overflow={"hidden"}
      >
        <Text
          fontSize={"sm"}
          fontWeight={"bold"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          color={"white"}
        >
          {props?.fullname}
        </Text>
        <Text fontSize={"xs"} color={"grey"}>
          @{props?.username}
        </Text>
        {props?.profile?.bio && (
          <Text fontSize={"xs"} color={"grey"}>
            {props?.profile?.bio}
          </Text>
        )}
      </Box>
      <FollowButton user={props} />
    </Box>
  );
}

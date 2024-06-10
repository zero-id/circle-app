import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import ModalDialog from "../../../components/ModalDialog";
import UserFormEditProfile from "./UserFormEditProfile";
import useUser from "../hooks/useUser";
import { IUser } from "../../../types/app";

export const UserProfileCard = ({
  callback,
  user,
}: {
  user?: IUser | null | undefined;
  callback?: () => void;
}): React.JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { avatar, cover } = useUser();

  return (
    <>
      <Box position={"relative"}>
        <Image
          height={"140px"}
          w={"100%"}
          objectFit={"cover"}
          rounded={"lg"}
          src={user?.profile?.cover ?? cover}
        />
        <Image
          position={"absolute"}
          rounded={"full"}
          border={"3px solid  rgba(29, 29, 29, 1)"}
          w={"60px"}
          h={"60px"}
          objectFit={"cover"}
          left={"20px"}
          top={"110px"}
          src={user?.profile?.avatar ?? avatar}
        />
      </Box>
      <Box w={"100%"} display={"flex"} justifyContent={"end"}>
        <Text
          px={"12px"}
          py={"5px"}
          border={"1px solid white"}
          borderRadius={"20px"}
          fontSize={"16px"}
          cursor={"pointer"}
          onClick={onOpen}
        >
          Edit Profil
        </Text>
        <ModalDialog
          isOpen={isOpen}
          onClose={onClose}
          children={
            <UserFormEditProfile callback={callback} onClose={onClose} />
          }
          title={"Edit Profile"}
        />
      </Box>
      {/* <ModalEditProfile isOpen={isOpen} onClose={onClose} /> */}
      <Box display={"flex"} fontSize={"14px"} flexDir={"column"} gap={"1px"}>
        <Text fontSize={"18px"} fontWeight={"Bold"}>
          {user?.fullname}
        </Text>
        <Text fontSize={"14px"} color={"gray"}>
          @{user?.username}
        </Text>
        <Text fontSize={"16px"}>{user?.profile?.bio ?? "Add your bio"}</Text>
        <Box display={"flex"} gap={"4"}>
          <Text fontSize={"16px"}>
            {user?._count?.following}
            <span style={{ color: "gray", fontSize: "14px" }}> Folowers </span>
          </Text>
          <Text fontSize={"16px"}>
            {user?._count?.follower}
            <span style={{ color: "gray", fontSize: "14px" }}> Following</span>
          </Text>
        </Box>
      </Box>
    </>
  );
};

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import useUserEditProfile from "../hooks/useUserEditProfile";
import useUser from "../hooks/useUser";

const UserFormEditProfile = ({
  onClose,
  callback,
}: {
  onClose: () => void;
  callback?: () => void;
}) => {
  const { preview, handleChange, handleSubmit, user, isLoading } =
    useUserEditProfile();

  const { cover, avatar } = useUser();

  return (
    <Box>
      <form
        onSubmit={(e: React.FocusEvent<HTMLFormElement>) =>
          handleSubmit({ e, onClose, callback })
        }
        action=""
      >
        <FormControl>
          <Box position={"relative"} mb={"50px"}>
            <FormLabel
              position={"absolute"}
              right={"0px"}
              bottom={"0px"}
              w={"auto"}
              h={"auto"}
              fontSize={"14px"}
              bgColor="green"
              py={"2px"}
              px={"10px"}
              rounded={"lg"}
              _hover={{ bgColor: "green", opacity: "0.8" }}
              htmlFor="cover"
            >
              Change Cover
            </FormLabel>
            <Input
              onChange={handleChange}
              type="file"
              id="cover"
              name="cover"
              display={"none"}
            />
            <Text>Image size max 2MB</Text>
            <Image
              src={
                preview.cover
                  ? preview.cover
                  : user?.profile?.cover
                  ? user?.profile.cover
                  : cover
              }
              height={"120px"}
              w={"100%"}
              objectFit={"cover"}
              rounded={"lg"}
            />
            <Image
              position={"absolute"}
              rounded={"full"}
              border={"3px solid  rgba(29, 29, 29, 1)"}
              w={"80px"}
              h={"80px"}
              objectFit={"cover"}
              left={"20px"}
              bottom={"-40px"}
              src={
                preview.avatar
                  ? preview.avatar
                  : user?.profile?.avatar
                  ? user?.profile?.avatar
                  : avatar
              }
            />
            <FormLabel
              position={"absolute"}
              bottom={"-48px"}
              left={"20px"}
              fontSize={"10px"}
              bgColor={
                preview.avatar ? "rgba(29, 29, 29, 0)" : "rgba(29, 29, 29, 0.5)"
              }
              w={"80px"}
              h={"80px"}
              rounded={"full"}
              _hover={{ opacity: "0.8" }}
              htmlFor="avatar"
              textAlign={"center"}
              lineHeight={"80px"}
              color={"white"}
              cursor={"pointer"}
              opacity={preview.avatar ? "0" : "1"}
            >
              Change Avatar
            </FormLabel>
            <Input
              onChange={handleChange}
              type="file"
              id="avatar"
              display={"none"}
              name="avatar"
            />
          </Box>

          <Box>
            <FormLabel
              lineHeight={"10px"}
              htmlFor="fullname"
              color={"white"}
              fontSize={"14px"}
            >
              Full Name
            </FormLabel>
            <Input
              id="fullname"
              placeholder="Full Name"
              defaultValue={user?.fullname}
              name="fullname"
              type="text"
              mb={"10px"}
              color={"white"}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormLabel
              lineHeight={"10px"}
              htmlFor="fullname"
              color={"white"}
              fontSize={"14px"}
            >
              Username
            </FormLabel>
            <Input
              onChange={handleChange}
              id="username"
              placeholder="Username"
              defaultValue={user?.username}
              name="username"
              type="text"
              mb={"10px"}
              color={"white"}
              // defaultValue={username}
            />
          </Box>
          <Box>
            <FormLabel
              lineHeight={"10px"}
              htmlFor="fullname"
              color={"white"}
              fontSize={"14px"}
            >
              Bio
            </FormLabel>
            <Input
              defaultValue={user?.profile?.bio ?? ""}
              onChange={handleChange}
              id="bio"
              placeholder="Bio"
              name="bio"
              type="text"
              mb={"10px"}
              color={"white"}
              h={"80px"}
            />
          </Box>
          <Button
            isLoading={isLoading}
            borderRadius={"20px"}
            backgroundColor={"green"}
            type="submit"
            fontSize={"14px"}
            w={"auto"}
            h={"auto"}
            px={"20px"}
            py={"8px"}
          >
            Post
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default UserFormEditProfile;

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useRegiseter from "../hooks/useRegister";

const FormRegister = ({
  onClose,
  onOpenLogin,
}: {
  onClose: () => void;
  onOpenLogin: () => void;
}): React.JSX.Element => {
  const { handleChange, handleSubmit } = useRegiseter();
  return (
    <FormControl
      color={"white"}
      mt={"18px"}
      display={"flex"}
      flexDir={"column"}
      gap={"3"}
    >
      <Box>
        <FormLabel fontSize={"14px"}>
          Full Name<span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          onChange={handleChange}
          name="fullname"
          type="text"
          placeholder="Full name"
          id="fullname"
        />
      </Box>
      <Box>
        <FormLabel fontSize={"14px"}>
          Username<span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
          id="username"
        />
      </Box>
      <Box>
        <FormLabel fontSize={"14px"}>
          Email<span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Email"
          id="email"
        />
      </Box>
      <Box>
        <FormLabel fontSize={"14px"}>
          Password<span style={{ color: "red" }}>*</span>
        </FormLabel>
        <Input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          id="password"
        />
      </Box>
      <Button
        onClick={() => handleSubmit({ onClose, onOpenLogin })}
        type="submit"
        colorScheme="green"
      >
        Create
      </Button>
      <Text
        fontSize={"14px"}
        fontWeight={"semibold"}
        textAlign={"right"}
        mt={"5px"}
      >
        Already have an account?
        <span
          onClick={() => {
            onOpenLogin();
            onClose();
          }}
          style={{ color: "green", cursor: "pointer", paddingLeft: "5px" }}
        >
          Sign In
        </span>
      </Text>
    </FormControl>
  );
};

export default FormRegister;

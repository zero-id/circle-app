import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useLogin from "../hooks/useLogin";

interface IFormLoginProps {
  onClose: () => void;
  onOpenRegister: () => void;
}

const FormLogin = ({ onClose, onOpenRegister }: IFormLoginProps) => {
  const { handleChange, handleLogin } = useLogin();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        handleLogin({ e, onClose })
      }
    >
      <FormControl
        color={"white"}
        mt={"18px"}
        display={"flex"}
        flexDir={"column"}
        gap={"3"}
      >
        <Box>
          <FormLabel htmlFor="username" fontSize={"14px"}>
            Username or Email<span style={{ color: "red" }}>*</span>
          </FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="Username or Email"
            id="username"
            onChange={handleChange}
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

        <Button type="submit" colorScheme="green">
          Login
        </Button>
      </FormControl>
      <Text
        color={"white"}
        fontSize={"14px"}
        mt={"25px"}
        fontWeight={"semibold"}
      >
        Don't have an account?{" "}
        <span
           onClick={() => {
            onOpenRegister();
            onClose();
          }}
          style={{ color: "green", cursor: "pointer" }}
        >
          Create account
        </span>
      </Text>
    </form>
  );
};

export default FormLogin;

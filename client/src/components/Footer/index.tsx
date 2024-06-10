import { Card, CardBody, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
  RiFacebookCircleFill,
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import iconDW from "../../assets/dw.png";
export const FooterCard: React.FC = () => {
  return (
    <Card bgColor={"#262626"} color={"white"}>
      <CardBody p={"10px"}>
        <Text
          display={"flex"}
          fontWeight={"bold"}
          fontSize={"0.8rem"}
          alignItems={"center"}
          gap={"10px"}
          pb={"5px"}
        >
          Developed by Abdullatiff •
          <Text fontSize={"1.2rem"} as={"span"}>
            <RiGithubFill />
          </Text>
          <Text fontSize={"1.2rem"} as={"span"}>
            <RiLinkedinBoxFill />
          </Text>
          <Text fontSize={"1.2rem"} as={"span"}>
            <RiFacebookCircleFill />
          </Text>
          <Text fontSize={"1.2rem"} as={"span"}>
            <RiInstagramLine />
          </Text>
        </Text>
        <Text
          fontSize={"0.6rem"}
          display={"flex"}
          alignItems={"center"}
          gap={"4px"}
          style={{ wordSpacing: "5px" }}
        >
          Powered by <Image src={iconDW} width={"1.2rem"} display={"inline"} />{" "}
          DumbWays Indonesia • #1 CodingBootcamp
        </Text>
      </CardBody>
    </Card>
  );
};

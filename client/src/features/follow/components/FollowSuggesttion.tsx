import { Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";
import UserCard from "../../user/components/UserCard";
import { IUser } from "../../../types/app";
import { getSuggestions } from "../../../libs/api/call/follow";

const FollowSuggesttion = () => {
  const [suggestions, setSuggestions] = React.useState<IUser[]>([]);

  const fetchSuggestions = async () => {
    try {
      const response = await getSuggestions();
      setSuggestions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <Card bgColor={"#262626"} color={"white"}>
      <CardBody>
        <Text mb={"10px"}>Suggested for you</Text>
        {suggestions?.map((suggestion) => (
          <UserCard
            key={suggestion.id}
            id={suggestion.id}
            fullname={suggestion.fullname}
            username={suggestion.username}
            profile={suggestion.profile}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default FollowSuggesttion;

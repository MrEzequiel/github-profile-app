import { Container, View, Text, Box, ScrollView } from "native-base";
import { FC } from "react";
import Repos from "../Repos";
import { User } from "../../interface/User";

interface UserInfoProps {
  user: User;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <ScrollView>
      <Box
        px={5}
        py={6}
        bgColor="gray.100"
        borderTopLeftRadius="3xl"
        borderTopRightRadius="3xl"
        flex={1}
      >
        <Repos user={user} />
      </Box>
    </ScrollView>
  );
};

export default UserInfo;

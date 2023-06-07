import { FC, useMemo } from "react";
import { User } from "../../interface/User";
import { Center, Text, View, Image, Box, HStack } from "native-base";

interface UserProfileProps {
  user: User;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  const userInfo = useMemo(() => {
    const info = [];
    if (user.location) {
      info.push(user.location);
    }
    if (user.company) {
      info.push(user.company);
    }
    if (user.email) {
      info.push(user.email);
    }

    return info.join(" | ");
  }, [user]);

  return (
    <>
      <Center alignItems="center" justifyContent="center" py={12} px={4}>
        <Image
          source={{
            uri: user.avatar_url,
          }}
          alt="User avatar"
          borderRadius="full"
          size="xl"
        />
        <Text fontSize="xl" bold mt={1}>
          {user.name}
        </Text>
        <Text fontSize="sm" color="gray.600">
          @{user.login}
        </Text>

        <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
          {user.bio}
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          {userInfo}
        </Text>

        <HStack space={2} mt={4}>
          <Text color="emerald.500" fontSize="md">
            <Text bold>{user.followers}</Text> followers
          </Text>
          <Text color="emerald.500" fontSize="md">
            <Text bold>{user.following}</Text> following
          </Text>
        </HStack>
      </Center>
    </>
  );
};

export default UserProfile;

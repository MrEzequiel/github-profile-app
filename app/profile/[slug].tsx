import {
  Box,
  Center,
  Container,
  Icon,
  IconButton,
  NativeBaseProvider,
  Text,
  Toast,
  Spinner,
} from "native-base";
import { useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import api from "../../src/services/api";
import { User } from "../../src/interface/User";
import UserProfile from "../../src/components/UserProfile";
import UserInfo from "../../src/components/UserInfo";

const Profile = () => {
  const params = useLocalSearchParams();
  const slug = params.slug as string;

  const [profile, setProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState(null);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const getProfile = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await api.get(`/users/${slug}`);
      setProfile(data);
    } catch (error) {
      Toast.show({
        description: "Usuário não encontrado",
      });
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <NativeBaseProvider>
      <Box p={2} pt={8} borderBottomWidth={1} borderBottomColor="gray.200">
        <IconButton
          width={10}
          icon={<Icon as={Entypo} name="back" />}
          borderRadius="full"
          _icon={{
            color: "emerald.900",
            size: "md",
          }}
          onPress={handleBack}
        />
      </Box>

      {isLoading && (
        <Center
          width="100%"
          height="1/2"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner color="emerald.500" size={"lg"} />
        </Center>
      )}

      {!isLoading && profile && (
        <>
          <UserProfile user={profile} />
          <UserInfo user={profile} />
        </>
      )}
    </NativeBaseProvider>
  );
};

export default Profile;

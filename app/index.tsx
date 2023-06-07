import { useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Center,
  Heading,
  Text,
  Input,
  Button,
  Toast,
} from "native-base";
import api from "../src/services/api";
import { useRouter } from "expo-router";

const App = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = async () => {
    setIsSearch(true);

    try {
      const { data } = await api.get(`/users/${search}`);
      router.push(`/profile/${search}`);
    } catch (error) {
      Toast.show({
        description: "Usuário não encontrado",
      });
    } finally {
      setIsSearch(false);
    }
  };

  return (
    <NativeBaseProvider>
      <Center height="100%">
        <Heading>
          Github
          <Text color="primary.700"> Profile</Text>
        </Heading>
        <Text mt="3" fontWeight="medium" maxW="1/2" textAlign="center">
          Digite seu usuário para buscar seu perfil no Github
        </Text>

        <Box maxW="2/3" alignItems="center" mt="4">
          <Input
            placeholder="username"
            w="100%"
            value={search}
            onChangeText={setSearch}
          />
          <Button
            mt="2"
            w="100%"
            onPress={handleSearch}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={!search}
            isLoading={isSearch}
          >
            Buscar
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default App;

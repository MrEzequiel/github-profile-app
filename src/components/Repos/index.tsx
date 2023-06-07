import {
  Box,
  Center,
  Flex,
  ScrollView,
  Spinner,
  Text,
  View,
} from "native-base";
import { FC, useCallback, useEffect, useState } from "react";
import { Repo, User } from "../../interface/User";
import api from "../../services/api";

interface ReposProps {
  user: User;
}

const Repos: FC<ReposProps> = ({ user }) => {
  const [repos, setRepos] = useState<Repo[]>();
  const [isLoading, setIsLoading] = useState(null);

  const getProfile = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await api.get(`/users/${user.login}/repos`);
      setRepos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <View>
      <Text bold fontSize="lg" mb={1}>
        Repositórios
      </Text>

      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}

      {repos && !isLoading && repos.length > 0 && (
        <Flex direction="column" mt={4}>
          {repos.map(repo => (
            <Box borderRadius="md" key={repo.id} p={2} mb={4}>
              <Text key={repo.id} fontSize="md" color="emerald.600">
                {repo.name}
              </Text>
              <Text color="gray.500">{repo.description}</Text>
              <Flex mt={1.5} direction="row">
                {!!repo.language && <Text mr={2}>{repo.language}</Text>}
                <Text mr={2}>{repo.stargazers_count} stars</Text>
                <Text>{repo.forks_count} forks</Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      )}

      {repos && !isLoading && repos.length === 0 && (
        <Center mt={2}>
          <Text>Nenhum repositório encontrado</Text>
        </Center>
      )}
    </View>
  );
};

export default Repos;

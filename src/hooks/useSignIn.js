import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    if (data?.authenticate) {
      const { accessToken } = data.authenticate;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
    }
    return data;
  };

  return [signIn, result];
};

export default useSignIn;

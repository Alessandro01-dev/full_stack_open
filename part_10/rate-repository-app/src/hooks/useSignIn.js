import { useApolloClient, useMutation } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    if (response.data && response.data.authenticate) {
      const token = response.data.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      await apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;

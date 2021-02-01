import { setContext } from '@apollo/client/link/context';
import { authManager } from '@utils/auth';

const authLink = setContext((_, { headers }) => {
  const token = authManager.accessToken.get();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export default authLink;

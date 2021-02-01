import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { apiUrl } from '@config/environment';
import { setContext } from '@apollo/client/link/context';
import { authManager } from '@utils/auth';

const createClient = () => {
  const authLink = setContext((_, { headers }) => {
    const token = authManager.accessToken.get();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = createHttpLink({
    uri: apiUrl,
  });

  const link = ApolloLink.from([authLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });

  return client;
};

export default createClient;

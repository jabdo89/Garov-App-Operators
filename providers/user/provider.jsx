import React, { createContext, useMemo } from 'react';
import decode from 'jwt-decode';
import { useQuery } from '@apollo/client';
import { useSession } from '@providers/session';
import PropTypes from 'prop-types';
import { GET_USER } from './requests';

const userContext = createContext({});

const UserProvider = ({ children }) => {
  const { token } = useSession();

  const { overallRole, username } = useMemo(() => (token ? decode(token) : {}), [token]);

  const { data, loading } = useQuery(GET_USER, { skip: !token });

  return (
    <userContext.Provider
      value={{
        user: data?.userByToken ? { ...data.userByToken } : { username },
        loadingUser: loading,
        overallRole: {
          admin: overallRole === 'ADMIN',
          user: overallRole === 'USER',
        },
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { userContext };
export default UserProvider;

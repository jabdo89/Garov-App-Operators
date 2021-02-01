import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { authManager, client } from '@utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useInterval from '@hooks/use-interval';

const sessionContext = createContext({});

const SessionProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const sessionData = JSON.parse(await AsyncStorage.getItem('session'));

      authManager.session.set(sessionData?.session);
      authManager.refreshToken.set(sessionData?.refreshToken);
      setIsLogged(!!sessionData?.session);
      setLoadingSession(false);
    };

    loadSession();
  }, []);

  const logout = async () => {
    setToken();
    setIsLogged(false);
    await client.post('/logout');
    authManager.reset();
  };

  const login = async (emailUsername, password) => {
    const { refreshToken, session } = await client.post('/login', {
      emailUsername,
      password,
      expires: false, // Not expires on mobile
    });

    await AsyncStorage.setItem('session', JSON.stringify({ refreshToken, session }));
    authManager.session.set(session);
    authManager.refreshToken.set(refreshToken);

    setIsLogged(true);
  };

  const getAccessToken = async () => {
    try {
      if (isLogged) {
        const { data } = await client.get('/access');

        authManager.accessToken.set(data.accessToken);
        setToken(data.accessToken);
      }
    } catch (err) {
      logout();
    }
  };

  useInterval(
    getAccessToken,
    1000 * 60 * 10, // 10 Minutes (5 mins less than access expiration)
    {
      skip: !isLogged,
      leading: true,
    }
  );

  return (
    <sessionContext.Provider
      value={{
        loadingSession,
        isLogged,
        setIsLogged,
        token,
        login,
        logout,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { sessionContext };
export default SessionProvider;

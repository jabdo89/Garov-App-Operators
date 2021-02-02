import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import theme from '@config/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { UserProvider } from '@providers/user';
import { SessionProvider, useSession } from '@providers/session';
import { ApolloProvider } from '@apollo/client';
import client from '@graphql';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Splash from '@components/splash';
import Screens from '@screens';

const App = () => {
  const { loadingSession } = useSession();

  let content;

  if (loadingSession) content = <Splash />;
  else content = <Screens />;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <SafeAreaProvider>
          <ThemeProvider theme={{ ...eva.light, ...theme.light }}>
            <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme.light }}>
              <ApolloProvider client={client}>
                <SessionProvider>
                  <UserProvider>{content}</UserProvider>
                </SessionProvider>
              </ApolloProvider>
            </ApplicationProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default App;

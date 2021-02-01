import React, { useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { UserProvider, useUser } from '@providers/user';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionProvider, useSession } from '@providers/session';
import { ApolloProvider } from '@apollo/client';
import createClient from '@graphql';
import { ApplicationProvider, IconRegistry, Layout, Text, Button } from '@ui-kitten/components';
import Splash from '@screens/splash';
import Login from '@screens/login';

const { Navigator: AuthNavigator, Screen: AuthScreen } = createStackNavigator();

const Inner = () => {
  const { user } = useUser();
  const { logout } = useSession();

  return (
    <>
      <StatusBar style="auto" />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category="h1">{user.firstName}</Text>
        <Button onPress={logout}>Logout</Button>
      </Layout>
    </>
  );
};

const Main = () => {
  const { loadingSession, isLogged } = useSession();

  const client = useMemo(() => {
    if (!loadingSession && isLogged) return createClient();

    return null;
  }, [loadingSession, isLogged]);

  if (loadingSession) return <Splash />;

  if (!isLogged)
    return (
      <AuthNavigator headerMode="none">
        <AuthScreen name="Login" component={Login} />
      </AuthNavigator>
    );

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Inner />
      </UserProvider>
    </ApolloProvider>
  );
};

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <SafeAreaProvider>
          <ThemeProvider theme={eva.light}>
            <ApplicationProvider {...eva} theme={eva.light}>
              <SessionProvider>
                <Main />
              </SessionProvider>
            </ApplicationProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default App;

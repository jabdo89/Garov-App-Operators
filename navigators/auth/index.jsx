import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@screens/login';

const { Navigator: AuthNavigator, Screen: AuthScreen } = createStackNavigator();

const Auth = () => {
  return (
    <AuthNavigator headerMode="none">
      <AuthScreen name="Login" component={Login} />
    </AuthNavigator>
  );
};

export default Auth;

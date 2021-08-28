import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@screens/login';
import Signup from '@screens/signup';
import RecoverPassword from '@screens/recover-password';

const { Navigator: AuthNavigator, Screen: AuthScreen } = createStackNavigator();

const Auth = () => {
  return (
    <AuthNavigator headerMode="none">
      <AuthScreen name="Login" component={Login} />
      <AuthScreen name="Signup" component={Signup} />
      <AuthScreen name="RecoverPassword" component={RecoverPassword} />
    </AuthNavigator>
  );
};

export default Auth;

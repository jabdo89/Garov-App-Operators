import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import Auth from '@screens/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { useSession } from '@providers/session';
import Isotype from '@assets/brand/isotype-primary.png';
import { Icon, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Main from './main';
import { Logo } from './elements';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

const TopBar = ({ navigation, previous, title }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Layout
      style={{
        paddingTop: top,
      }}
    >
      <TopNavigation
        alignment="center"
        title={title}
        accessoryLeft={
          previous
            ? () => (
                <TopNavigationAction
                  onPress={navigation.goBack}
                  icon={(props) => <Icon {...props} name="arrow-back" />}
                />
              )
            : undefined
        }
      />
    </Layout>
  );
};

const Screens = () => {
  const { isLogged } = useSession();

  if (!isLogged) return <Auth />;

  return (
    <>
      <StatusBar style="dark" />
      <StackNavigator headerMode="screen">
        <StackScreen
          name="Main"
          options={{ header: (props) => <TopBar title={<Logo source={Isotype} />} {...props} /> }}
          component={Main}
        />
      </StackNavigator>
    </>
  );
};

TopBar.defaultProps = {
  previous: undefined,
};

TopBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  previous: PropTypes.object,
  title: PropTypes.node.isRequired,
};

export default Screens;

import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Developments from './developments';
import Settings from './settings';

const { Navigator: BottomNavigator, Screen: BottomScreen } = createBottomTabNavigator();

const BottomBar = ({ navigation, state }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{
        paddingBottom: bottom,
        paddingTop: 20,
      }}
    >
      <BottomNavigationTab icon={(props) => <Icon {...props} name="home-outline" />} />
      <BottomNavigationTab icon={(props) => <Icon {...props} name="settings-outline" />} />
    </BottomNavigation>
  );
};

const Main = () => {
  return (
    <BottomNavigator tabBar={(props) => <BottomBar {...props} />}>
      <BottomScreen name="Developments" component={Developments} />
      <BottomScreen name="Settings" component={Settings} />
    </BottomNavigator>
  );
};

BottomBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

export default Main;

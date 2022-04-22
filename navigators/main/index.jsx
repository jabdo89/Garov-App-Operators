import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Home from '@screens/home';
import Profile from '@screens/profile';
import Corrida from '@screens/route-detaile';

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
        backgroundColor: '#FFFFFF',
      }}
    >
      <BottomNavigationTab title="Home" icon={(props) => <Icon {...props} name="home" />} />
      <BottomNavigationTab title="Perfil" icon={(props) => <Icon {...props} name="home" />} />
    </BottomNavigation>
  );
};

const Main = () => {
  return (
    <BottomNavigator tabBar={(props) => <BottomBar {...props} />}>
      <BottomScreen name="Home" component={Home} />
      <BottomScreen name="Perfil" component={Profile} />
      <BottomScreen name="Corrida" component={Corrida} />
    </BottomNavigator>
  );
};

BottomBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

export default Main;

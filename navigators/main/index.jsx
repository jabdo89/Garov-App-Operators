import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Send from '@screens/send';
import Deliver from '@screens/deliver';
import Profile from '@screens/profile';

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
      <BottomNavigationTab
        title="Enviar"
        icon={(props) => <Icon {...props} name="arrowhead-up-outline" />}
      />
      <BottomNavigationTab
        title="Entregar"
        icon={(props) => <Icon {...props} name="car-outline" />}
      />
      <BottomNavigationTab
        title="Perfil"
        icon={(props) => <Icon {...props} name="person-outline" />}
      />
    </BottomNavigation>
  );
};

const Main = () => {
  return (
    <BottomNavigator tabBar={(props) => <BottomBar {...props} />}>
      <BottomScreen name="Send" component={Send} />
      <BottomScreen name="Deliver" component={Deliver} />
      <BottomScreen name="Profile" component={Profile} />
    </BottomNavigator>
  );
};

BottomBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

export default Main;

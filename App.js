import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

import MapScreen from './src/components/map';
import CardScreen from './src/components/Cards';
import DriverScreen from './src/components/Driver';
import RegistrationScreen from './src/components/registration';
import {PermissionsAndroid} from 'react-native';


let AppNavigator = createStackNavigator(
  {
    Map: MapScreen,
    Card: CardScreen,
    Driver: DriverScreen,
    Registration: RegistrationScreen
  },
  {
    initialRouteName: 'Registration',
  }
);

let AppNavigation = createAppContainer(AppNavigator);

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

// export default createAppContainer(AppNavigator);
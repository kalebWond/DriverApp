import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MapScreen from './src/components/map';
import CardScreen from './src/components/Cards';
import DriverScreen from './src/components/Driver';
import RegistrationScreen from './src/components/registration';


const AppNavigator = createStackNavigator(
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

export default createAppContainer(AppNavigator);
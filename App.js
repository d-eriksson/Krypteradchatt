import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import HomeScreen from './Screens/HomeScreen';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import { TabNavigator } from 'react-navigation';
import * as SHA from 'js-sha256';
export default TabNavigator(
  {
    Profile: { screen: Profile },
    Home: { screen: HomeScreen },
    Scanner: { screen: QRScanner },
    Chat: { screen: Chat },
  },
  {
    initialRouteName: 'Home',
    swipeEnabled: true,
    tabBarPosition: 'bottom',
  }
);

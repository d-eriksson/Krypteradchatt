import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import HomeScreen from './Screens/HomeScreen';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import { TabNavigator } from 'react-navigation';

export default TabNavigator(
  {
    Profile: { screen: Profile },
    Home: { screen: HomeScreen },
    Scanner: { screen: QRScanner },
    Chat: { screen: Chat },
  },
  {
    initialRouteName: 'Chat',
    swipeEnabled: true,
    tabBarPosition: 'bottom',
  }
);

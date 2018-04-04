import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import HomeScreen from './Screens/HomeScreen';
import { StackNavigator, TabNavigator } from 'react-navigation';

const TabNav = TabNavigator(
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

export default StackNavigator(
  {
    Home: {
      screen: TabNav,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        title: 'Chat name',
      }),
    },
  },
  {
    initialRouteName: 'Home',
  }
);

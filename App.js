import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import HomeScreen from './Screens/HomeScreen';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import { StackNavigator } from 'react-navigation';

export default class App extends Component {
  render() {
    return <NavigationApp/>;
  }
}

const NavigationApp = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Scanner: { screen: QRScanner },
    Profile: { screen: Profile },
    Chat: { screen: Chat },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

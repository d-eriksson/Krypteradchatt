import React, { Component } from 'react';
import QRScanner from './Components/QRScanner';
import HomeScreen from './Components/HomeScreen';
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
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none', //excludes the navigation bar
  }
);

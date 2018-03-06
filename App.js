import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import QRScanner from './Components/QRScanner';
import HomeScreen from './Components/HomeScreen';
import { StackNavigator } from 'react-navigation';

export default class App extends Component {
  render() {
    return <RootStack/>;
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Scanner: {
      screen: QRScanner,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

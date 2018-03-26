import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import HomeScreen from './Screens/HomeScreen';
import Profile from './Screens/Profile';
import { TabNavigator } from 'react-navigation';

<<<<<<< HEAD

export default class App extends Component {
  render() {
    return (
		<NavigationApp/>
	);
  }
}

const NavigationApp = StackNavigator(
=======
export default TabNavigator(
>>>>>>> task009
  {
    Profile: { screen: Profile },
    Home: { screen: HomeScreen },
    Scanner: { screen: QRScanner },
  },
  {
    initialRouteName: 'Home',
    swipeEnabled: true,
    tabBarPosition: 'bottom',
  }
);

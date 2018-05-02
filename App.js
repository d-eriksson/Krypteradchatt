import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import HomeScreen from './Screens/HomeScreen';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import {
  AsyncStorage,
  } from 'react-native';

  import { Item, Button, Icon, Image} from 'native-base';




const TabNav = TabNavigator(
    {
      Profile: { screen: Profile },
      Home: { screen: HomeScreen },
      Scanner: { screen: QRScanner },
    },
    {
      initialRouteName: 'Home',
      swipeEnabled: true,
      tabBarPosition: 'bottom',
      tabBarOptions : {
        activeTintColor: 'lightseagreen',
        style: {
          backgroundColor: 'black',
          height: 60,
        },
        indicatorStyle: {
          borderBottomColor: 'lightseagreen',
          borderBottomWidth: 2,
        }
    }
    }
  );

  const StackNav = StackNavigator(
    {
      HomeView: {
        screen: TabNav,
        navigationOptions: ({ navigation }) => ({
          header: null,
        }),
      },
      Chat: {
        screen: Chat,
        navigationOptions: ({ navigation }) => ({
          title: `${navigation.state.params.name}`,
          headerStyle: {
            backgroundColor: 'lightseagreen',
          },
        }),
      },
    },
    {
      initialRouteName: 'HomeView',
    }
  );

  export default StackNav;

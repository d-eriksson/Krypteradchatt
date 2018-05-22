import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import HomeScreen from './Screens/HomeScreen';
import {buildTerms,__translate} from './Components/lang';

import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import {
  AsyncStorage,
  } from 'react-native';

buildTerms();
var P_Label = __translate("Profile");
const TabNav = TabNavigator(
    {
      Profil: { 
        screen: Profile,
        label: P_Label,
      },
      Hem: { screen: HomeScreen },
      Skanner: { screen: QRScanner },
    },
    {
      initialRouteName: 'Hem',
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
          header: null,
        }),
      },
    },
    {
      initialRouteName: 'HomeView',
    }
  );

  export default StackNav;

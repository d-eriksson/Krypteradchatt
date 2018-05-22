import React, { Component } from 'react';
import QRScanner from './Screens/QRScanner';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import HomeScreen from './Screens/HomeScreen';
import {buildTerms,__translate} from './Components/lang';
import { Ionicons } from '@expo/vector-icons';

import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import {
  AsyncStorage,
  } from 'react-native';

buildTerms();
const TabNav = TabNavigator(
    {
      Profil: { 
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
          title: __translate("Profile"),
          tabBarIcon: ({ tintColor }) => <Ionicons name="md-person" size={28} color={tintColor}/>
        })
       },
      Hem: { 
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          title: __translate("Home"),
          tabBarIcon: ({ tintColor }) => <Ionicons name="md-home" size={28} color={tintColor}/>
        })
      },
      Skanner: { 
        screen: QRScanner,
         navigationOptions: ({ navigation }) => ({
          title: __translate("Scanner"),
          tabBarIcon: ({ tintColor }) => <Ionicons name="md-qr-scanner" size={28} color={tintColor}/>
        })
      },
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
        },
        showLabel: true,
        showIcon: true,
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

import React, { Component } from 'react';
import ChatList from '../Components/ChatList'
import {
  StyleSheet,
  Text,
  View,
  Button,
  } from 'react-native';

export default class HomeScreen extends Component {

  render() {
    return (
      <View>
        <ChatList/>
      </View>
    );
  };

}

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
<<<<<<< HEAD
  Button,
  TouchableNativeFeedback,
  Image,
  } from 'react-native';
=======
  Image } from 'react-native';
>>>>>>> task009

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Image
            source={require('../Icons/scan_icon.png')}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102027',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

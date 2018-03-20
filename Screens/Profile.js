import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image } from 'react-native';

export default class Profile extends Component {
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

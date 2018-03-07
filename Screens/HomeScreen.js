import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  Image } from 'react-native';
import GenerateQR from '../Components/generateQR';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<Button
          onPress={() => this.props.navigation.navigate('Scanner')}
          title="Open Scanner"
          color="#00bfa5"
        >
        </Button>*/}
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Image
            source={require('../Icons/scan_icon.png')}
          />
        </TouchableNativeFeedback>

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

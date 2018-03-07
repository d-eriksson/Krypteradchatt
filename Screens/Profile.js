import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  Image } from 'react-native';

export default class Profile extends Component {
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
          onPress={() => this.props.navigation.navigate('Scanner')}
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

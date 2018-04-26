import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform} from 'react-native';

class StatusBarComponent extends Component{

  render(){
    return(
      <View style={[styles.status, this.props.style || {}]}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
        height: 20,
      },
      android: {
        backgroundColor: 'blue',
        height: 25,
      }
  }),
  }

});

module.exports= StatusBarComponent

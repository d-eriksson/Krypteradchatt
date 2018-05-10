import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Dimensions } from 'react-native';

export default class TintedImage extends Component {


  render() {
    return (
      <View style={{width:this.props.size, height:this.props.size,borderRadius:this.props.size,backgroundColor: this.props.backgroundColor }}>
        <View style = {styles.backgroundContainer}>
          <Image
            source={require('../Icons/cham1-gray.png')}
            style={{width:this.props.size, height:this.props.size }}
          />
        </View>
        <View style = {styles.overlay}>
          <Image
            source={require('../Icons/cham1-overlay.png')}
            tintColor= {this.props.color}
             style={{width:this.props.size, height:this.props.size}}
          />
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,


  },
  overlay: {
    opacity: 0.25,
    backgroundColor: '#00000000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  Image_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});

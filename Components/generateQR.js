import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';

export default class GenerateQR extends Component {

  render() {
    return (
          <QRCode content={this.props.value} codeStyle='dot' linearGradient={['rgb(255,0,0)','rgb(0,255,255)']} gradientDirection={[0,170,0,0]} backgroundColor='#102027'/>
    );
  }
}
module.exports = GenerateQR;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
});

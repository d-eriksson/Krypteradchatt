import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';

{/*Create QR component by using <GenerateQE value="[link goes here] />"*/}
export default class GenerateQR extends Component {


  render() {
    return (
          <QRCode content={this.props.value} codeStyle='dot' linearGradient={['rgb(0,150,136)','rgb(82, 199, 184)']} gradientDirection={[0,170,0,0]} backgroundColor='rgba(0,0,0,0)'/>
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

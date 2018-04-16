import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Dimensions } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';

{/*Create QR component by using <GenerateQE value="[link goes here] />"*/}
export default class GenerateQR extends Component {


  render() {
    return (
          <QRCode content={this.props.value} codeStyle='square' size={Dimensions.get('window').width-80} linearGradient={['rgb(0,0,0)','rgb(0, 0, 0)']} gradientDirection={[0,170,0,0]} backgroundColor='rgba(255,255,255,1)'/>
    );
  }
}

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

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  } from 'react-native';
import {QRCode} from 'react-native-custom-qr-codes';
import * as SHA from 'js-sha256';
export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
                <View>
                       <Image />
                       <View>
                            <Text>Namn</Text>
                            <Text>Senaste Chattmeddelandet</Text>
                            <Text style={styles.welcome}>
                            {this.state = SHA.sha256("foobar")}
                            </Text>
                            <QRCode content={this.state}/>
                       </View>
                </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  wrapper: {
    flex: 2
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'skyblue'
  }
});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  Image } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Mina kontakter'
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.wrapper}>
                <View>
                       <Image />
                                 <View>
                                         <Text>Namn</Text>
                                         <Text>Senaste Chattmeddelandet</Text>
                                 </View>
                </View>
          </View>
          <Button title="Skapa Chatt" />
          <Button title="Min Profil" />
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

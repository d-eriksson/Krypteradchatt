import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  } from 'react-native';

import GenerateQR from '../Components/generateQR';
import * as SHA from 'js-sha256';
export default class HomeScreen extends Component {

	constructor (props){
		super(props);
		this.state = {
			roomID: {},
      hasch: '',
      sign: '___',
      chatname: 'Cool Chatt',
      fullstring: ''
		};


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
				<Button
					title='Create Chatt'
					onPress={() => {

					fetch('http://83.227.100.223:8080/create')
					.then((res) => res.json())
					.then((data) => {
					this.setState({
            roomID: data,
            hasch: SHA.sha256("Hasch"),
            fullString: data.toString() + this.state.sign + this.state.chatname + this.state.sign + this.state.hasch
          });
					console.log(this.state.fullString);
          <GenerateQR value={this.state.fullString}/>})
					.catch((err) => alert(err))
					}}
				/>



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

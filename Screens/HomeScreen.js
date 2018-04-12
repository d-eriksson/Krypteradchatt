import React, { Component } from 'react';
import ChatList from '../Components/ChatList'
import {
  StyleSheet,
  Text,
  View,
  Button,
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
<<<<<<< HEAD
      <View>
          <View>
    					<ChatList/>
    			</View>
          <View>
      				<Button
      					title='Hej'
      					onPress={() => {

      					fetch('http://83.227.100.223:8080/create')
      					.then((res) => res.json())
      					.then((data) => {
      					this.setState({things: data})
      					alert(this.state.things)	})
      					.catch((err) => alert(err))
      					}}
      				/>
=======
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
>>>>>>> Task016
          </View>
      </View>
    );
  };
};

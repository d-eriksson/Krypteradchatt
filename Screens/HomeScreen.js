import React, { Component } from 'react';
import ChatList from '../Components/ChatList'
import {
  StyleSheet,
  Text,
  View,
  Button,
  } from 'react-native';

export default class HomeScreen extends Component {

	constructor (props){
		super(props);
		this.state = {
			things:{}
		};
	}
  render() {
    return (
      <View>
        <View>
  					<ChatList/>
  			</View>
        <View>
  				<Button
  					title='Hej'
  					value='Okej'
  					sign='___'
  					key='Key'
  					name='Cool Chatt'
  					onPress={() => {

  					fetch('http://83.227.100.223:8080/create')
  					.then((res) => res.json())
  					.then((data) => {
  					this.setState({things: data})
  					alert(this.state.things)	})
  					.catch((err) => alert(err))
  					}}
  				/>

        </View>
      </View>
    );
  };

}

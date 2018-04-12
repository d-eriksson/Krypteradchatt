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
import StackNav from '../App'

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

  createChat = () => {

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
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <ChatList/>
        <Button
          style={styles.container}
          title='Create Chatt'
          onPress={() => {
              this.createChat();
              navigate('Chat')
            }
          }
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

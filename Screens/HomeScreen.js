import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  FlatList,
  } from 'react-native';
import * as SHA from 'js-sha256';
import StackNav from '../App';
import { List, ListItem, Body, Text, Left, Thumbnail } from 'native-base';

export default class HomeScreen extends Component {

	constructor (props){
		super(props);
		this.state = {
			roomID: {},
      hash: '',
      sign: '___',
      chatname: 'Cool Chatt',
      fullstring: '',
      dataSource: []
		};
	}

  async componentDidMount() {
    const data = [];
    let keys = await AsyncStorage.getAllKeys();
    for (let inKey of keys) {
        let obj = await AsyncStorage.getItem(inKey);
        obj = JSON.parse(obj);
        if(inKey != "profile"){
          data.push(obj);
        }
    }
    this.setState({ dataSource : data });
  }

  createChat = () => {
    const {navigate} = this.props.navigation;
    fetch('http://83.227.100.223:8080/create')
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        roomID: data,
        hash: SHA.sha256("Hasch"),
        fullString: data.toString() + this.state.sign + this.state.chatname + this.state.sign + SHA.sha256("Hasch")
      });
      console.log(this.state.fullString);
      navigate('Chat', {title: data, hash: SHA.sha256("Hasch")})})
      .catch((err) => alert(err))

  }

  render() {
    return (
      <View>
        <List>
          <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                const {navigate} = this.props.navigation;
                navigate('Chat', {title: item.roomID, hash: item.hash})
              }}
              avatar
            >
              <Left>
                <Thumbnail style={{width: 40, height: 40, borderRadius: 40/2}} source={require('../aang.jpg')}></Thumbnail>
              </Left>
              <Body>
                <Text>{ item.roomID }</Text>
                <Text note>{ 'det senaste meddelandet' }</Text>
              </Body>
            </ListItem>
          )}
          keyExtractor={(item, index) => index}
          />
        </List>
        <Button
          title='Create Chatt'
          onPress={() => {
              this.createChat();
            }
          }
        />
      </View>
    )
  }
};

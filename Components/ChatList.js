import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  AsyncStorage
  } from 'react-native';
import { List, ListItem, Body, Text, Left, Thumbnail } from 'native-base';


export default class ChatList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
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

  render() {
    return (
      <List>
        <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => (
          <ListItem avatar>
            <Left>
              <Thumbnail style={{width: 40, height: 40, borderRadius: 40/2}} source={require('../aang.jpg')}></Thumbnail>
            </Left>
            <Body>
              <Text>{ item.roomID }</Text>
              {/*<Text note>{ item.message }</Text>*/}
            </Body>
          </ListItem>
        )}
        keyExtractor={(item, index) => index}
        />
      </List>
    );
  }

}

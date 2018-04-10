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

  componentDidMount() {

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          if(key != "profile"){
            this.setState({
              dataSource: [...this.state.dataSource, value]
            });
          }
        });
      });
    });
    console.log(this.state.dataSource)
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
              <Text>{ item }</Text>
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

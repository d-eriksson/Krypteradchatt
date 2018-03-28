import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
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
    const url = 'http://83.227.100.223:8080/messages/1'

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <List>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <ListItem>
              <Body>
                <Text>{ item.roomID }</Text>
                <Text note>{ item.message }</Text>
              </Body>
            </ListItem>
          )}
          keyExtractor={(item, index) => index}
        />
      </List>
    );
  };
}

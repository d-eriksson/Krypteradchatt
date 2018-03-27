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
    const url = 'http://api.open-notify.org/astros.json'

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.people
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
            <ListItem avatar>
              <Body>
                <Text>{ item.name }</Text>
                <Text note>{ item.craft }</Text>
              </Body>
            </ListItem>
          )}
          keyExtractor={(item, index) => index}
        />
      </List>
    );
  };
}

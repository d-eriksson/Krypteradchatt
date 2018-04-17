import React, { Component } from 'react';
import {
  View,
  Button,
  AsyncStorage,
  FlatList,
  Dimensions,
  } from 'react-native';
import * as SHA from 'js-sha256';
import { List, ListItem, Body, Text, Left, Thumbnail } from 'native-base';

export default class HomeScreen extends Component {

	constructor (props){
		super(props);
		this.state = {
			roomID: {},
      hash: 'hej',
      sign: '___',
      chatname: 'Cool Chatt',
      fullstring: '',
      user: '1',
      dataSource: [],
      dataSave: [],
      refreshing: false,
		};
    this.createChat = this.createChat.bind(this);
	}

  onRefresh = async () => {
    this.setState({
      refreshing: true
    })

    const data = [];
    let keys = await AsyncStorage.getAllKeys();
    for (let inKey of keys) {
        let obj = await AsyncStorage.getItem(inKey);
        obj = JSON.parse(obj);
        if(inKey != "profile"){
          data.push(obj);
        }
    }
    this.setState({
      dataSource : data,
      refreshing: false
    });

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
              fullString: data.toString() + this.state.sign + this.state.chatname + this.state.sign + SHA.sha256("Hasch"),
          })
          let room = {
            roomID: this.state.roomID.toString(),
            hash: this.state.hash,
            chatname: this.state.chatname,
            user: this.state.user
          };

          AsyncStorage.setItem(this.state.roomID.toString(), JSON.stringify(room), () => {
             AsyncStorage.getItem(this.state.roomID.toString(), (err, result) => {
                 if(err)
                 {
                   this.setState({
                     dataSave: "Error!"
                   })
                 }
                 this.setState({
                   dataSave: result
                 });
              });
          });
          navigate('Chat', {title: this.state.roomID, hash: this.state.fullString})
    })
  }

  renderFooter = () => {
      return (
        <Button
        title='Create Chatt'
        onPress={() => {
            this.createChat();
          }
        }
      />
    )
  }

  render() {

    return (
      <View style={{height: Dimensions.get('window').height-60}}>
        <List>
          <FlatList
            data={this.state.dataSource}
            ListFooterComponent={this.renderFooter}
            onRefresh= { this.onRefresh }
            refreshing= {this.state.refreshing}
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
      </View>
    )
  }
}

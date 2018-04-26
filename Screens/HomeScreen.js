import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  FlatList,
  Dimensions,
<<<<<<< HEAD
  Image,
  Platform,
  StatusBar
=======
  TouchableOpacity,
  ScrollView,
>>>>>>> 631396daeceddccf26b364c3ed2523f5198f6353
  } from 'react-native';
import * as SHA from 'js-sha256';
import { List, ListItem, Body, Text, Left, Thumbnail, Header, Input, Item, Container, Button, Icon, Root } from 'native-base';
import {Font, AppLoading} from 'expo';
import {ionicons} from '@expo/vector-icons';

class HomeScreen extends Component {



  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

	constructor (props){
		super(props);
		this.state = {
      sign: '___',
      chatname: 'Cool Chatt',
      user: '1',
      dataSource: [],
      refreshing: false,
      loading: true
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
        if(inKey != "profile"){
          data.push(JSON.parse(obj));
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
        if(inKey != "profile"){
          data.push(JSON.parse(obj));
        }
    }
    this.setState({ dataSource : data });

  }

  createChat = () => {
    const {navigate} = this.props.navigation;
    fetch('http://83.227.100.223:8080/create')
    .then((res) => res.json())
    .then((data) => {

          let room = {
            roomID: data.toString(),
            hash: SHA.sha256("Hasch"),
            chatname: this.state.chatname,
            user: this.state.user
          };
          let fullString = room.roomID + this.state.sign + room.chatname + this.state.sign + room.hash;

          AsyncStorage.setItem(room.roomID, JSON.stringify(room), () => {});
          navigate('Chat', {title: room.roomID, hash: fullString, name: 'New Chat'})
    })
  }

  renderFooter = () => {
      return (
        <View style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'space-around',
        }}>
          <TouchableOpacity

            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:60,
                height:60,
                borderRadius:60,
                backgroundColor: 'skyblue',
              }}
              onPress={() => {
                  this.createChat();
                }
              }
              >
              <Text>+</Text>
              </TouchableOpacity>
            </View>
    )
  }

renderHeader = () => {
  return (
<Header searchBar rounded>
    <Item>
      <Icon name="search" />
          <Input
          placeholder="Sök..."
          />
      <Icon name="ios-people" />
    </Item>

    <Button transparent>
      <Text>Sök...</Text>
    </Button>
</Header>

)
};

  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }
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
          keyExtractor={(item,index) => item.roomID}
          ListHeaderComponent={this.renderHeader}
          />
        </List>
      </View>

    )
  }
}

export default HomeScreen;

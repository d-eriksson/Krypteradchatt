import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  FlatList,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  } from 'react-native';
import * as SHA from 'js-sha256';
import { List, ListItem, Body, Text, Left, Thumbnail, Header, Input, Item, Container, Button, Icon, Root } from 'native-base';
import {Font, AppLoading} from 'expo';
import {ionicons} from '@expo/vector-icons';
import StatusBarComponent from '../Components/StatusBarComponent';

export default class HomeScreen extends Component {

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
      chatname: 'Unnamed Chameleon',
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

    const profile = await AsyncStorage.getItem('profile');
    let d = JSON.parse(profile);
    this.setState({ dataSource : data, chatname: d.name });
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
            user: this.state.user,
            activated: false
          };
          let fullString = room.roomID + this.state.sign + room.chatname + this.state.sign + room.hash;
          console.log(fullString);
          AsyncStorage.setItem(room.roomID, JSON.stringify(room), () => {});
          navigate('Chat', {roomID: room.roomID, hash: room.hash, fullString: fullString, name: 'New Chat', activated: room.activated})
    })
  }

  renderButton(){
      return (
          <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'center',
                position: 'absolute',
                bottom: 30,
                right: 30,
                width:60,
                height:60,
                borderRadius:60,
                backgroundColor: 'lightseagreen',
                flex: 1,
              }}
              onPress={() => {
                  this.createChat();
                }
              }
              >
              <Text style={{color: 'white', fontSize: 40, height: 60, width: 60, textAlign: 'center'}}>+</Text>
          </TouchableOpacity>
    )
  }

renderHeader = () => {
  return (
<Header
  searchBar
  rounded
  style={{backgroundColor: 'lightseagreen'}}
  >
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

      <View>
          <StatusBarComponent style={{backgroundColor:'#132b30'}}/>

      <View style={{height: Dimensions.get('window').height-80}}>
        <List>
          <FlatList
            data={this.state.dataSource}
            onRefresh= { this.onRefresh }
            refreshing= {this.state.refreshing}
            renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                console.log(item);
                let fullString = item.roomID + this.state.sign + item.name + this.state.sign + item.hash;
                const {navigate} = this.props.navigation;
                navigate('Chat', {roomID: item.roomID, hash: item.hash,fullString:fullString, name: item.chatname, activated: item.activated})
              }}
              avatar
            >
              <Left>
                <Thumbnail style={{width: 40, height: 40, borderRadius: 40/2}} source={require('../aang.jpg')}></Thumbnail>
              </Left>
              <Body>
                <Text>{ item.chatname }</Text>
                <Text note>{ 'det senaste meddelandet' }</Text>
              </Body>
            </ListItem>
          )}
          keyExtractor={(item,index) => item.roomID}
          ListHeaderComponent={this.renderHeader}
          />
        </List>
        {this.renderButton()}
      </View>
    </View>
    )
  }
}

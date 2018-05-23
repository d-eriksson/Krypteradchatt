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
import {Font, AppLoading, Audio} from 'expo';
import {ionicons} from '@expo/vector-icons';
import StatusBarComponent from '../Components/StatusBarComponent';
import WelcomeModal from '../Components/WelcomeModal';
import TintedImage from '../Components/TintedImage';
import SocketIOClient from 'socket.io-client';
import {buildTerms,__translate} from '../Components/lang';

window.navigator.userAgent = 'react-native';


export default class HomeScreen extends Component {

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.sub = this.props.navigation.addListener('willFocus', () => this.onRefresh());
    this.setState({ loading: false });
  }

	constructor (props){
		super(props);
		this.state = {
      sign: '___',
      chatname: 'Unnamed Chameleon',
      dataSource: [],
      refreshing: false,
      loading: true,
		};
    this.socket = SocketIOClient('http://83.227.100.223:8080');
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
    AsyncStorage.getItem('profile', (err, result) => {
        let d = JSON.parse(result);

        const {navigate} = this.props.navigation;
        fetch('http://83.227.100.223:8080/create')
        .then((res) => res.json())
        .then((data) => {

            let room = {
                roomID: data.toString(),
                hash: SHA.sha256(Math.random().toString(2)),
                chatname: d.name,
                user: '1',
                activated: false,
                chamcolor: d.ChamColor,
                chamimg: d.ChamImg
            };
            let fullString = room.roomID + this.state.sign + room.chatname + this.state.sign + room.hash + this.state.sign + room.chamcolor + this.state.sign + room.chamimg;
            //AsyncStorage.setItem(room.roomID, JSON.stringify(room), () => {});
            navigate('Chat', {roomID: room.roomID, hash: room.hash, fullString: fullString, name: __translate("New chat"), activated: room.activated, user: room.user})
        })
    });
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
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowOpacity: 0.9,
                elevation: 6,
                shadowRadius: 12 ,
                shadowOffset : { width: 1, height: 13},
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
          placeholder={__translate("Search...")}
          />
      <Icon name="ios-people" />
    </Item>

    <Button transparent>
      <Text>{__translate("Search...")}</Text>
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
          <WelcomeModal title={"Välkommen!"}/>
          <StatusBarComponent style={{backgroundColor:'#132b30'}}/>

      <View style={{height: Dimensions.get('window').height-80, backgroundColor:'#102027'}}>
        <List>
          <FlatList
            data={this.state.dataSource}
            onRefresh= { this.onRefresh }
            refreshing= {this.state.refreshing}
            renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                //console.log(item);
                let fullString = item.roomID + this.state.sign + item.name + this.state.sign + item.hash;
                const {navigate} = this.props.navigation;
                navigate('Chat', {roomID: item.roomID, hash: item.hash,fullString:fullString, name: item.chatname, activated: item.activated, user: item.user})
              }}
              avatar
            >
              <Left>
                  <TintedImage size={45} color={item.friendColor} version={Number(item.friendImg)} backgroundColor='#ffffff' />
              </Left>
              <Body style={{borderBottomColor: '#132b30'}}>
                <Text style={{color: 'lightseagreen'}}>{ item.chatname }</Text>
                <Text note style={{color: 'white'}}>{ item.lastmsg }</Text>
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

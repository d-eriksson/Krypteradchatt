
import React, { Component } from 'react';
import {
StyleSheet,
View,
FlatList,
Image,
TextInput,
StatusBar,
ScrollView,
Platform,
Dimensions,
KeyboardAvoidingView,
TouchableOpacity,
AsyncStorage } from 'react-native';
import { Container, Header, Button, List, ListItem, Body, Text, Left,Right, Icon, Title, Thumbnail } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Expo from 'expo';
import CryptoJS from 'crypto-js';
import QRCode from 'react-native-qrcode';
import SocketIOClient from 'socket.io-client';
import KeyboardSpacer from 'react-native-keyboard-spacer';

window.navigator.userAgent = 'react-native';

export default class Chat extends Component {

constructor(props) {
  super(props)
  this.socket = SocketIOClient('http://83.227.100.223:8080');
  this.state = {
    isReady: false,
    typing: "",
    messages: [],
    user: 1,
    roomID: props.navigation.state.params.roomID,
    otherUser: props.navigation.state.params.name,
    hash: '',
    title: '',
    activated: props.navigation.state.params.activated,
  }

  this.socket.emit('start', this.state.roomID);

  this.socket.on(this.state.roomID,function(data){
    var datarev = data.reverse();
    this.setState({
      messages: datarev
    })
  }.bind(this))

  this.socket.on('connect_'+this.state.roomID, function(data){
    if(this.state.title == 'New Chat'){
      let room = {
        roomID: this.state.roomID,
        hash: this.state.hash,
        chatname: data,
        user: this.state.user,
        activated: true
      };
      this.props.navigation.setParams({name: data})
      AsyncStorage.setItem(this.state.roomID, JSON.stringify(room), () => {});
      this.setState({activated: true})
    }
  }.bind(this))



  this.socket.on('newMessage_'+this.state.roomID,function(data){
  this.setState({messages: this.state.messages.concat(data)});
}.bind(this))

}

async componentWillMount() {
  await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
  });
  this.setState({isReady:true})
}

componentDidMount() {


  const {navigate} = this.props.navigation;
  const {params} = this.props.navigation.state;
  this.setState({
    title: this.props.navigation.state.params.name,
    roomID: this.props.navigation.state.params.roomID,
    hash: this.props.navigation.state.params.hash,
    fullString: this.props.navigation.state.params.fullString,
    activated: this.props.navigation.state.params.activated
  })
}

selectAvatar = (sender) => {

  const userIcon = require('../chameleon.png');
  const otherUserIcon = require('../chameleon2.jpg');

       if (sender == this.state.user) {
           return userIcon;
       } else {
           return otherUserIcon;
       }
   }


renderFlatlist(item){

    if(item.sentby == this.state.user){
        return (
                      <ListItem avatar style={styles.row}>
                        <Left>
                          <Text note style={styles.timestamp}>{this.changeTimeFormat(item.send_time)}</Text>
                        </Left>
                        <Body style={styles.text}>
                          <Text note  style={styles.message2}>{this.decryptMessage(item.message) }</Text>
                        </Body>
                        <Right style = {styles.timecontainer}>
                          <Thumbnail style= {styles.avatar} source={this.selectAvatar(item.sentby)} />
                        </Right>
                      </ListItem>
                    )
    }
    else{
      return (
                    <ListItem avatar style={styles.row}>
                      <Left>
                        <Thumbnail style= {styles.avatar} source={this.selectAvatar(item.sentby)} />
                      </Left>
                      <Body style={styles.text}>
                        <Text note  style={styles.message1}>{this.decryptMessage(item.message) }</Text>
                      </Body>
                      <Right style = {styles.timecontainer}>

                        <Text note style={styles.timestamp}>{this.changeTimeFormat(item.send_time)}</Text>
                      </Right>
                    </ListItem>
      )
    }
}

decryptMessage = (m) =>{
  try {
    var decrypted  = CryptoJS.AES.decrypt( m , this.state.hash);
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (e) {
    return "Couldn't decrypt msg :(";
  }

}

async sendMessage() {

  if (this.state.typing.length > 0) {
    let sender = this.state.user;
    var msg = CryptoJS.AES.encrypt(this.state.typing, this.state.hash);
    let room = this.state.roomID;
    var data = {
      sender : sender,
      msg: msg.toString(),
      room: room
    }
    this.socket.emit('chat message', data);

    this.setState({
         typing: ''
    });
  }
}

changeTimeFormat(str)
{
  var time = str.split("T");
  var str2 = time[1].split(".");
  var time2 = str2[0];
  var timefinal = time2.split(":");
  var finalstring = timefinal[0]+':'+timefinal[1];
  return finalstring;
}

renderQR(){
   if(this.state.activated == false){
     return(   <View style={styles.qr}>
               <QRCode value={this.state.fullString} size={Dimensions.get('window').width-80}/>
               </View>
             )
   }
   else return null;
}

reverseData(data){
  return data.reverse();
}

renderTextBox(){
  if(this.state.activated){
    return(
    <TextInput
      inverted
      value={this.state.typing}
      onChangeText={text => this.setState({typing: text})}
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="Type something secret.."
    />
  )
} else {
  return(
  <Text style={styles.input}>Let friend scan QR to activate chat</Text>
  )
}
}

render() {
  if (!this.state.isReady) {
      return <Expo.AppLoading />;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={80} >
      {this.renderQR()}{/*code works w/o this line, will work later when QR dissapears when chat connects*/}
      <FlatList
        data={this.reverseData(this.state.messages)}
          renderItem={({ item }) => (
            this.renderFlatlist(item)
          )}
        keyExtractor={(item, index) => index}
        inverted
      />
        <View style={styles.footer}>
          {this.renderTextBox()}
          <TouchableOpacity
            onPress={this.sendMessage.bind(this)}
            style={{justifyContent: 'center', paddingRight: 10}}
          >
            <Icon
              reverse
              name='send'
              color='#517fa4'
            />
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
)
}
}

const styles = StyleSheet.create({
container: {
backgroundColor: 'white',
flexDirection : 'column',
flex : 1

},
row: {
margin: 7,
borderBottomColor:'white',
backgroundColor: 'white',
},
text:{
  borderBottomColor: 'white',
},
message1: {
color: 'black',
  backgroundColor: '#efefef',
  borderBottomColor: 'white',
  padding:10,
  borderRadius: 10,
  overflow: 'hidden',
},
message2: {
color: 'white',
  backgroundColor: '#132b30',
  borderBottomColor: 'white',
  padding:10,
  borderRadius: 10,
  overflow: 'hidden',
},
avatar: {
  width: 50,
  height: 50,
  borderRadius: 50/2
},
footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    height: 50,

  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  timestamp: {
    color: 'lightseagreen',
    borderBottomWidth: 0,
    borderBottomColor: 'white',
  },
  timecontainer: {
    borderBottomColor: 'white',
  },
  qr: {
    alignItems: 'center',
    marginTop: 20,
  }

});

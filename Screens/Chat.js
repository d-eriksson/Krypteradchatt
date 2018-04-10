
import React, { Component } from 'react';
import {
StyleSheet,
View,
FlatList,
Image,
TextInput,
KeyboardAvoidingView,
TouchableOpacity } from 'react-native';
import { List, ListItem, Body, Text, Left, Thumbnail } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Chat extends Component {

constructor() {
super()
this.state = {
    typing: "",
    messageData: [],
    user: 1,
    roomID: 1,
  }
}

componentDidMount() {
  const url = 'http://83.227.100.223:8080/messages/1/'

  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    this.setState({
      messageData: responseJson
    })
  })
  .catch((error) => {
    console.log(error)
  })

}

async sendMessage() {

  let sender = this.state.user;
  let msg = this.state.typing;
  let room = this.state.roomID;

  const url = 'http://83.227.100.223:8080/submit/'+room+'/'+msg+'/'+sender+'/'

    fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error)
      })

    this.setState({
      typing: '',
    });
}

render() {
return (
  <View style={styles.container}>

    <View style={styles.header}>
            <Text style={styles.title}>Bob</Text>
    </View>

    <View style={styles.contentContainer}>

        <List>
          <FlatList
            data={this.state.messageData}
            renderItem={({ item }) => (
              <ListItem style={styles.row}>
                <Left>
                  <Thumbnail style= {styles.avatar} source={{uri: 'http://dreamicus.com/data/chameleon/chameleon-02.jpg'}} />
                </Left>
                <Body style={styles.text}>
                  <Text style={styles.name}>{ item.sentby }</Text>
                  <Text note style={styles.message}>{ item.message }</Text>
                </Body>
              </ListItem>
            )}
            keyExtractor={(item, index) => index}
          />
        </List>

  </View>

  <KeyboardAvoidingView behaviour="padding">

      <View style={styles.footer}>

          <TextInput
            value={this.state.typing}
            onChangeText={text => this.setState({typing: text})}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
          />

          <TouchableOpacity onPress={this.sendMessage.bind(this)}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>

      </View>

  </KeyboardAvoidingView>


  </View>

);
};
}

const styles = StyleSheet.create({
container: {
backgroundColor: '#102027',
flexDirection : 'column',
flex : 1
},
header: {
    height: 80,
    backgroundColor: 'lightseagreen',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
row: {
margin: 10,
borderBottomColor:'#102027',
backgroundColor: '#102027',
},
name: {
  color: '#20b2aa',
},
message: {
color: 'white',
},
avatar: {
width: 50,
height: 50,
},
text:  {
  padding: 5,
  width: 100,
  backgroundColor: '#275760',
},
footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',

  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },

});

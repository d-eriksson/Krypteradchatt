import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity} from 'react-native';

import {send, subscribe} from 'react-native-training-chat-server';

const NAME = 'Alice';
const CHANNEL = 'TestChannel';
const AVATAR = 'https://i.pinimg.com/236x/e2/52/cd/e252cde7328c092aa19ea8a6dd50a14b--macro-photography-macros.jpg';

export default class Chat extends Component {

   state = {
     typing: "",
     messages: [],
   };


 componentDidMount() {
       subscribe(CHANNEL, messages => {
         this.setState({messages});
       });
  }


  async sendMessage() {
    await send({
      channel: CHANNEL,
      sender: NAME,
      avatar: AVATAR,
      message: this.state.typing
    });

    this.setState({
      typing: '',
    });
  }




  renderItem({item}) {
     return (
       <View style={styles.row}>

        <Image style={styles.avatar} source={{uri: item.avatar}} />

        <View style={styles.rowText}>
           <Text style={styles.sender}>{item.sender}</Text>
           <Text style={styles.message}>{item.message}</Text>
         </View>

       </View>
     );
   }

  render() {
    return (
      <View style={styles.container}>


      <View style={styles.header}>
             <Text style={styles.title}>
               Bob {this.props.title}
             </Text>
           </View>


        <FlatList
          data={this.state.messages}
          renderItem={this.renderItem}
          inverted
        />

      <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>

          <TextInput
            value={this.state.typing}
            onChangeText={text => this.setState({typing: text})}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type a secret"
            />

            <TouchableOpacity onPress={this.sendMessage.bind(this)}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>

          </View>

      </KeyboardAvoidingView>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102027',
    justifyContent: 'center'
  },
  row: {
    width: 300,
     padding: 10,
     backgroundColor: '#275760',
     marginBottom: 6,
   },
   message: {
     fontSize: 18,
     color: 'white',
   },
   avatar: {
     borderRadius: 20,
     width: 40,
     height: 40,
     marginRight: 10,
   },
   rowText: {
     flex: 1,
   },

   sender: {
     fontWeight: 'bold',
     color: 'lightseagreen',
     paddingRight: 10,
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
 send: {
   alignSelf: 'center',
   color: 'lightseagreen',
   fontSize: 16,
   fontWeight: 'bold',
   padding: 20,
 },
 header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'lightseagreen',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,

  },
});

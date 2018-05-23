import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Alert,
  Modal
  } from 'react-native';

import StatusBarComponent from '../Components/StatusBarComponent';
import { Item, Input, Header, Button, List, ListItem, Body, Text, Left,Right, Icon, Title, Thumbnail } from 'native-base';
import Toast from 'react-native-simple-toast';
import TintedImage from '../Components/TintedImage';
import { ColorPicker, toHsv } from 'react-native-color-picker';
import SocketIOClient from 'socket.io-client';
import {__translate} from '../Components/lang';

window.navigator.userAgent = 'react-native';


export default class Profile extends Component {

  constructor(props){
  	super(props)
    this.socket = SocketIOClient('http://83.227.100.223:8080');
	  this.state={
	  	  name:'',
	  	  ChamColor:'',
        tempName:'',
        NameInStorage:'',
        NameWasChanged: false,
	  	  layout: true,
	  	  color: toHsv('green'),
        ChamImg: 1,
        modalVisible: false,
	  }
  }
  async componentDidMount() {
    let profile = await AsyncStorage.getItem('profile');
    let d = JSON.parse(profile);
    if(!(d.ChamImg)){
      d.ChamImg = 1;
    }
    this.setState({
      ChamColor : d.ChamColor,
      name : d.name,
      ChamImg: d.ChamImg,
      tempName: d.name,
    })
  }

  ComponentWillMount() {
    this.sub = this.props.navigation.Addlistener('willFocus',() => this.Setstate({tempName: '', NameWasChanged: false}))
  }

  ComponentWillUnmount() {
    this.sub.forEach(sub => sub.remove());
  }

  saveData = async() => {
    Toast.show('Saved changes!');
    const {name,ChamColor,tempName,NameInStorage,ChamImg} = this.state;

    AsyncStorage.getItem('profile', (err,result) => {
      let d = JSON.parse(result);
      this.setState({NameInStorage: d.name});
    });

    let NameToStore = tempName;

    {this.state.NameWasChanged == false
      ? NameToStore = NameInStorage
      : this.state.tempName == ''
        ? NameToStore = name
        : NameToStore = NameToStore
    }
    let profile={
       name: NameToStore,
       ChamColor: ChamColor,
       ChamImg: ChamImg
     }

     this.setState({name: NameToStore})
     AsyncStorage.setItem('profile',
     JSON.stringify(profile));

   }

  changeLayout = () => {
    this.setState({
      layout: !(this.state.layout)
    });
  }

  switchImage = () => {
    var ChamImage = Number(this.state.ChamImg);
    console.log(ChamImage);
    ChamImage = ChamImage + 1;
    if(ChamImage > 3){
      ChamImage = 1;
    }
    else if(ChamImage < 1){
      ChamImage = 3;
    }
    this.setState({
      ChamImg: ChamImage,
    });
  }

  setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }

  render() {
  	if(this.state.layout){
        /* Profile startpage */
      return (


      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
            <View style={styles.containter}>
                <Header style={styles.header}>
                        <Left style={{flex:1}}>
                          <Button transparent   onPress={() => {
                              this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Icon name='arrow-back' />
                          </Button>
                        </Left>
                        <Body style={{flex:1, alignItems:'center'}}>
                          <Title>Om</Title>
                        </Body>
                        <Right style={{flex: 1}}>
                        </Right>
                </Header>

                  <View style={styles.infoPage}>
                  <View style={{paddingTop: 30,alignItems:'center'}}>

                      <Image source={require('../Icons/mumblr_font.png')} style={styles.mumblricon} />

                    <Text style={{color:'lightseagreen', fontSize: 20, color: "lightseagreen", textAlign: 'center'}}>Den krypteradade chatten</Text>
                        <Text style={{paddingTop:15,fontSize: 15, width:300}}>
                          I Mumblr kan du endast börja chatta med personer du träffat i verkligheten. Med hjälp av
                          QR-koden som är unik för varje chatt kan Mumblr kryptera dina meddelanden
                          så att du kan vara säker på att ingen annan än du och din kompis kan läsa vad ni skrivit.</Text>
                        <Text style={{paddingTop:10,fontSize: 15, width:300}}>
                          Den här appen är ett kandidatprojekt utvecklat av fem studenter vid Linköpings Universitet.
                          Tveka inte att höra av er till oss!</Text>

                        <View style={{paddingTop: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Button rounded light style={{backgroundColor: 'lightseagreen'}}>
                            <Text>GitHub</Text>
                            <Icon name='logo-github' style={{color: 'white'}} />
                          </Button>
                          <Button rounded light style={{marginLeft: 10, backgroundColor: 'lightseagreen'}}>
                          <Text>Mail</Text>
                          <Icon name='mail' style={{color: 'white'}} />
                        </Button>
                  </View>

              </View>
              </View>
            </View>
        </Modal>

            <StatusBarComponent style={{backgroundColor:'#102027'}}/>
          <Header style={styles.header}>
                    <Left style={{flex:1}}>
                    </Left>
                    <Body style={{flex:1, alignItems:'center'}}>
                      <Title>Profil</Title>
                    </Body>
                    <Right style={{flex: 1}}>
                    </Right>
              </Header>

            <Button transparent onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Icon name='ios-information-circle' style={{color: '#fff'}}/>
            </Button>

  			<View style={styles.profileMenu}>
          <TintedImage size={170} color={this.state.ChamColor} backgroundColor='#ffffff' version ={this.state.ChamImg}/>
          <Button rounded style={{backgroundColor: 'lightseagreen', alignSelf: "center"}} onPress={this.changeLayout}>
          <Text style={styles.buttontext}> {__translate("Edit avatar")} </Text>
          </Button>
          <Item style={styles.inputHolder}>
                <Icon active name='ios-person' style={{color: '#fff'}}/>
                  {this.state.name == ''
                  ? <Input style={styles.inputText}
                      placeholder={__translate("Username")}
                      onChangeText={tempName =>
                        this.setState({
                        tempName: tempName,
                        NameWasChanged: true,
                      })}
                    />
                  : <Input style={styles.inputText}
                      placeholder = {this.state.name}
                      onChangeText={tempName => this.setState({
                        tempName: tempName,
                        NameWasChanged: true,
                      })}
                    />
                  }
            </Item>
  				  <View style={styles.ButtonHolder}>
                         <Button rounded style={{backgroundColor: 'lightseagreen', alignSelf: "center"}} onPress={this.saveData}>
                         <Text style={styles.buttontext}> {__translate("Save")} </Text>
                         </Button>
  				  </View>
  			</View>
      </View>

      )
    	}
  	else{
      /* Change your avatar */

  		return(
			<View style={styles.container}>
            <StatusBarComponent style={{backgroundColor:'#102027'}}/>
        <Header style={styles.header}>
                <Left style={{flex:1}}>
                  <Button transparent onPress={this.changeLayout}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body style={{flex:1, alignItems:'center'}}>
                  <Title>Profil</Title>
                </Body>
                <Right style={{flex: 1}}>
                </Right>
          </Header>
      <View style={styles.profileMenu}>
    <TintedImage color={this.state.ChamColor} backgroundColor='#ffffff' size={170} version={this.state.ChamImg} />
            <View style={{flexDirection: 'row'}}>
                <Button rounded style={{backgroundColor: 'lightseagreen', alignSelf: "center"}} small onPress={this.switchImage}>
                <Text style={styles.buttontext}> {__translate("Change emote")} </Text>
                </Button>
              </View>
          <View style={{padding: 0,height:200,bottom:0,width:420}}>
              <ColorPicker
                ChamColor={ChamColor => this.setState({ ChamColor })}
                onColorChange={ChamColor => this.setState({ ChamColor })}
                onColorSelected={ChamColor => this.setState({ ChamColor })}
                style={{flex:1, height:200}}
                hideSliders={true}
              />
          </View>
        </View>
      </View>
  		)
  	}
  }


}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#102027',
		flexDirection : 'column',
		flex : 1,

	},
	containerColor: {
		backgroundColor: '#102027',
		flexDirection : 'column',
		flex : 1,
		alignItems: 'center',

	},
	scannerButtonHolder: {
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	profileMenu:  {
		backgroundColor: '#102027',
		justifyContent: 'space-around',
		flex: 1,
    alignItems: 'center',
	},
  infoPage: {
    justifyContent: 'space-around',
    flexDirection : 'column',
    flex: 1,
    alignItems: 'center',
  },
  mumblricon: {
   resizeMode: 'contain',
   width: 300,
   height: 72,
   paddingVertical: 50,
  },

	inputHolder: {
		justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1.5,
	},
  inputText:{
    color: 'lightseagreen',
  },


	ButtonHolder: {
		flexDirection: 'row',
		justifyContent: 'space-around'

	},
  Button: {
		backgroundColor: 'lightseagreen',
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: 80,
    borderRadius: 10,
	},
  LayoutButton:{
    	backgroundColor: 'lightseagreen',
      justifyContent: 'center',
  		alignItems: 'center',
  		paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
  },
  buttontext:{
    color: 'white'
  },
  avatar:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    backgroundColor: 'lightseagreen',
  }


});

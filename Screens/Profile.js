import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Alert
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

  render() {
  	if(this.state.layout){
      return (
      <View style={styles.container}>
        <StatusBarComponent style={{backgroundColor:'#102027'}}/>
  			<View style={styles.profileMenu}>
          <TintedImage size={200} color={this.state.ChamColor} backgroundColor='#ffffff' version ={this.state.ChamImg}/>
          <TouchableOpacity style={styles.LayoutButton} onPress={this.changeLayout}>
            <Text style={styles.buttontext}> {__translate("Edit avatar")} </Text>
          </TouchableOpacity>
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
  							         <TouchableOpacity style={styles.Button} onPress={this.saveData}>
  								               <Text style={styles.buttontext}> {__translate("Save")} </Text>
  							         </TouchableOpacity>
  				  </View>
  			</View>
      </View>

      )
    	}
  	else{
  		return(

			<View style={styles.container}>
        <View style={styles.profileMenu}>

          <TintedImage color={this.state.ChamColor} backgroundColor='#ffffff' size={200} version={this.state.ChamImg} />
          <TouchableOpacity style={styles.LayoutButton} onPress={this.switchImage}>
                <Text style={styles.buttontext}> {__translate("Change emote")} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.LayoutButton} onPress={this.changeLayout}>
              <Text style={styles.buttontext}> {__translate("Back to profile")} </Text>
          </TouchableOpacity>
          <View style={{padding: 0, backgroundColor: '#00000000',height:245,bottom:0,width:420}}>
              <ColorPicker
                ChamColor={ChamColor => this.setState({ ChamColor })}
                onColorChange={ChamColor => this.setState({ ChamColor })}
                onColorSelected={ChamColor => this.setState({ ChamColor })}
                style={{flex:1, height:300}}
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
		backgroundColor: '#cecece',
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
  }


});

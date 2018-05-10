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
import { ColorPicker, toHsv } from 'react-native-color-picker'


export default class Profile extends Component {

  constructor(props){
  	  super(props)
	  this.state={
	  	  name:'',
	  	  favColor:'#00ff00',
	  	  layout: true,
	  	  color: toHsv('green')
	  }
  }

  saveData =()=> {
    Toast.show('Saved changes!');
	const {name,favColor} = this.state;

	let profile={
		name: name,
		favColor: favColor
	}
	AsyncStorage.setItem('profile',
	JSON.stringify(profile));
  }
  changeLayout = () => {
  	this.setState({
  		layout: !(this.state.layout)
  	})
  }

  displayData = async() => {
	try{
  	  let profile = await AsyncStorage.getItem('profile');
	  let d = JSON.parse(profile);
	  Alert.alert('Personal information', 'Name: ' + d.name + '\n' + 'Favourite Color: ' + d.favColor);
	 }
	 catch(error){
	 	 Alert.alert('Error','There was an error while loading the data');
	 }
  }



  render() {
  	if(this.state.layout){
    return (
				<View style={styles.profileMenu}>
          <Item style={styles.inputHolder}>
              <Icon active name='ios-person' style={{color: '#fff'}}/>
              <Input style={styles.inputText}
                placeholder='Användarnamn'
                onChangeText={name => this.setState({name})}
              />
          </Item>

          <Item style={styles.inputHolder}>
                <Icon active name='ios-color-palette' style={{color: '#fff'}} />
                <Input style={styles.inputText}
                  placeholder='Favoritfärg'
                  onChangeText={favColor => this.setState({favColor})}
                />
          </Item>





					<View style={styles.ButtonHolder}>
						<View>
							<TouchableOpacity style={styles.Button} onPress={this.saveData}>
								<Text style={styles.buttontext}> Spara </Text>
							</TouchableOpacity>
						</View>

						<View>
							<TouchableOpacity style={styles.Button} onPress={this.displayData}>
								<Text style={styles.buttontext}> Visa </Text>
							</TouchableOpacity>
						</View>
					</View>

				</View>

    );
  	}
  	else{
  		return(
			<View style={styles.containerColor}>
					<TintedImage color={this.state.color} backgroundColor='#ffffff' size={256} />
					<TouchableOpacity style={styles.Button} onPress={this.changeLayout}>
							<Text> Edit Chameleon </Text>
					</TouchableOpacity>
					<View style={{padding: 15, backgroundColor: '#ffffff',height:300,bottom:0, position: 'absolute', width:420}}>
					    <ColorPicker
					      color={this.state.color}
					      onColorChange={color => this.setState({ color })}
					      onColorSelected={color => this.setState({ color })}
					      style={{flex:1, height:300}}
					      hideSliders={false}
					    />
					</View>
			</View>
  		);
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
		backgroundColor: '#cecece',
		flexDirection : 'column',
		flex : 1,
		alignItems: 'center'
	},
	scannerButtonHolder: {
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	profileMenu:  {
		backgroundColor: '#102027',
		justifyContent: 'space-around',
		alignItems: 'stretch',
		flex: 4

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
  buttontext:{
    color: 'white'
  }


});

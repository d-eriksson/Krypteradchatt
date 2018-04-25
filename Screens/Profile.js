import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput
  } from 'react-native';
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
	  alert('Chameleon Name: ' + d.name + ' ' + 'Favourite Color: ' + d.favColor);
	 }
	 catch(error){
	 	 Alert.alert('Error','There was an error while loading the data');
	 }
  }

  render() {
  	if(this.state.layout){
    return (
			<View style={styles.container}>
				<View style={styles.profileMenu}>
					<TintedImage color={this.state.color} backgroundColor='#ffffff' size={120} />
					<TouchableOpacity style={styles.Button} onPress={this.changeLayout}>
							<Text> Edit Chameleon </Text>
					</TouchableOpacity>
					<View style={styles.inputHolder}>
						<TextInput
						style={styles.input}
						placeholder="Chameleon Name"
						placeholderTextColor="rgba(255,255,255,0.7)"
						onChangeText={name => this.setState({name})}
						/>
					</View>


					<View style={styles.inputHolder}>
						<TextInput
						style={styles.input}
						placeholder="Favourite Color"
						placeholderTextColor="rgba(255,255,255,0.7)"
						onChangeText={favColor => this.setState({favColor})}
						/>
					</View>

					<View style={styles.ButtonHolder}>
						<View>
							<TouchableOpacity style={styles.Button} onPress={this.saveData}>
								<Text> Save </Text>
							</TouchableOpacity>
						</View>

						<View>
							<TouchableOpacity style={styles.Button} onPress={this.displayData}>
								<Text> Display </Text>
							</TouchableOpacity>
						</View>
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
		backgroundColor: '#F17F42',
		justifyContent: 'space-around',
		alignItems: 'stretch',
		flex: 4

	},
	scanButton: {
		width: 100,
		height: 100
	},
	inputHolder: {
		alignItems: 'stretch',
		justifyContent: 'center'
	},
	Button: {
		backgroundColor: '#34495e',
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: 100
	},
	ButtonHolder: {
		flexDirection: 'row',
		justifyContent: 'space-around'

	},
	input: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		padding: 20
	}


});

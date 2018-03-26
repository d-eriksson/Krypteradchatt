import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput
  } from 'react-native';

export default class Profile extends Component {

  constructor(props){
  	  super(props)
	  this.state={
	  	  name:'', favColor:''
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
    return (


			<View style={styles.container}>
				<View style={styles.profileMenu}>

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


}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#cecece',
		flexDirection : 'column',
		flex : 1
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

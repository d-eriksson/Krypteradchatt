import React, { Component, TextInput } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  Image,
  TouchableOpacity
  } from 'react-native';

export default class Profile extends Component {
  render() {
    return (


			<View style={styles.container}>
				<View style={styles.profileMenu}>
					
					<View style={styles.smeknamnHolder}> 
						<Text> Smeknamn </Text>
					</View>					
					
					<View style={styles.smeknamnDisplayer}>
					</View>
					
					<View style={styles.saveButtonHolder}>
						<TouchableOpacity style={styles.saveButton} onPress={this.saveData}>
						</TouchableOpacity>
					</View>

				</View>
				<View style={styles.scannerButtonHolder}>
					{/*<Button
					onPress={() => this.props.navigation.navigate('Scanner')}
					title="Open Scanner"
					color="#00bfa5"
					>
					</Button>*/}
					<TouchableNativeFeedback
					onPress={() => this.props.navigation.navigate('Scanner')}
					>
					<Image
					style={styles.scanButton}
					source={require('../Icons/scan_icon.png')}
					/>
					</TouchableNativeFeedback>
				</View>

			</View>

    );
  }

  saveData() {
	alert('testing');

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
		alignItems: 'center',
		flex: 4

	},
	scanButton: {
		width: 100,
		height: 100
	},
	smeknamnHolder: {
		backgroundColor: '#2ecc71',
		width: 100,
		height: 100
	},
	smeknamnDisplayer: {
		backgroundColor: '#9b59b6',
		width: 100,
		height: 100
	},
	saveButton: {
		backgroundColor: '#34495e',
		width: 100,
		height: 100
	}

});

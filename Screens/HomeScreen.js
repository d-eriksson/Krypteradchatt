import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  } from 'react-native';

export default class HomeScreen extends Component {

	constructor (props){
		super(props);
		this.state = {
			things:{}
		};
	}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
			<View>
			<Image />
				<View>
					<Text>Namn</Text>
					<Text>Senaste Chattmeddelandet</Text>
				</View>
				<Button 
					title='Hej'
					value='Okej'
					sign='___'
					key='Key'
					name='Cool Chatt'
					onPress={() => {
				
					fetch('http://83.227.100.223:8080/create')
					.then((res) => res.json())
					.then((data) => {
					this.setState({things: data})
					alert(this.state.things)	})
					.catch((err) => alert(err))
					}}
				/>

			</View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  wrapper: {
    flex: 2
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'skyblue'
  }
});

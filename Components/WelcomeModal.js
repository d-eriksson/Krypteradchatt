import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";

export default class WelcomeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: ''
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('profile', (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          this.setModalVisible(true);
        }
      }
    });
    AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
            });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  saveData =()=> {
  	const name = this.state.name;
    if(name.length > 0){
      let profile={
    		name: name,
    	}
    	AsyncStorage.setItem('profile',
    	JSON.stringify(profile));
      this.setModalVisible(!this.state.modalVisible);
    }
  }
  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          style={styles.ftreContainer}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.ftreContainer}>
            <View style={styles.ftreTitleContainer}>
              <Text style={styles.ftreTitle}>{this.props.title}</Text>
            </View>
            <View style={styles.ftreDescriptionContainer}>
              <TextInput
  						style={styles.input}
  						placeholder="Namn"
  						placeholderTextColor="gray"
  						onChangeText={name => this.setState({name})}
  						/>
            </View>

            <View style={styles.ftreExitContainer}>
              <TouchableHighlight
                onPress={this.saveData}
              >
                <View style={styles.ftreExitButtonContainer}>
                  <Text style={styles.ftreExitButtonText}>Save</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
ftreContainer:{
		backgroundColor:'white',
		flex:1,
		marginTop:0,
		marginBottom:0,
		marginLeft:0,
		marginRight:0,
	},
	ftreTitle:{
		color:'black',
    fontWeight:'bold',
		fontSize:20,
		textAlign:'center',
		margin:10,
	},
	ftreDescription:{
		color:'black',
    fontSize:15,
		marginRight:20,
		marginLeft:20
	},
	ftreCloseIcon:{
		alignSelf:'flex-end',
		flex:0.5,
		marginRight:10
	},
	ftreTitleContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	ftreDescriptionContainer:{
		flex:6.5
	},
	ftreExitContainer:{
		flex:2,
		justifyContent:'flex-start',
		alignItems:'center',
	},
	ftreExitButtonContainer:{
		width:200,
		height:40,
		backgroundColor:'lightseagreen',
		borderRadius:10,
		justifyContent:'center',
	},
	ftreExitButtonText:{
		color:'white',
		fontSize:20,
		fontWeight:'bold',
		textAlign:'center'
	},
  input:{
    padding: 20,
    textAlign:'center'
  }
});

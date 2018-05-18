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
import FadeInView from "../Components/FadeInView";
import StatusBarComponent from '../Components/StatusBarComponent';
import TintedImage from '../Components/TintedImage';
import { ColorPicker, toHsv } from 'react-native-color-picker';

export default class WelcomeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: '',
      page: 1,
      ChamColor: '#ffffff',
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
    this.setState({
        modalVisible: false,
        name: '',
        page: 1,
        ChamColor: '#ffffff',
    })
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
  nextScreen = () => {
    var p = Number(this.state.page);
    if(p < 5){
      var p = p + 1;
      this.setState({page: p});
    }
    console.log(p);
  }
  prevScreen = () =>{
    var p = Number(this.state.page);
    if(p > 0){
      var p = p - 1;
      this.setState({page: p});
    }
    console.log(p);
  }
  RegisterUser(styles){
    return(
      <View style={styles.ftreContainer}>
          <View style={styles.ftreTitleContainer}>
            <Text style={styles.ftreTitle}>Register your account</Text>
          </View>
            <View style={styles.ftreDescriptionContainer}>
              <TextInput
              style={styles.input}
              placeholder="Namn"
              placeholderTextColor="gray"
              onChangeText={name => this.setState({name})}
              />
            </View>
              <TouchableHighlight onPress={this.saveData} style={styles.ftreExitContainer}>
                <View style={styles.ftreExitButtonContainer}>
                  <Text style={styles.ftreExitButtonText}> Save </Text>
                </View>
              </TouchableHighlight>
          </View>
        );
  }
SetAvatar(styles){
    return(
    <View style={styles.ftreContainer}>
        <TintedImage style={styles.tintedImage} color={this.state.ChamColor} backgroundColor='#ffffff' size={200} />
        <View style={styles.colorWheel}>
            <ColorPicker
              ChamColor={this.state.ChamColor}
              onColorChange={ChamColor => this.setState({ ChamColor })}
              onColorSelected={ChamColor => this.setState({ ChamColor })}
              style={{flex:1, height:300}}
              hideSliders={true}
            />
        </View>
    </View>
    );
  }
  page(styles){
    console.log(this.state.page);
    if(Number(this.state.page) == 1){
      return this.RegisterUser(styles);
    }
    else if (Number(this.state.page) == 2){
      return this.SetAvatar(styles);
    }
  }


  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >

          <View style={styles.ftreContainer}>
                  {this.page(styles)}
          
            <View style={styles.navButtonContainer}>
                <TouchableHighlight onPress={this.prevScreen} style={styles.navButton}>
                  <View style={styles.navButtonView}>
                    <Text style={styles.navButtonText}>Prev</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.nextScreen} style={styles.navButton}>
                  <View style={styles.navButtonView}>
                    <Text style={styles.navButtonText}>Next</Text>
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
		flex:5,
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
		marginTop:30,
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
		alignItems:'center',
    backgroundColor: '#ffffff'
	},
	ftreDescriptionContainer:{
		flex:5
	},
	ftreExitContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
    backgroundColor:'#ffffff',
	},
	ftreExitButtonContainer:{
		backgroundColor:'lightseagreen',
		borderRadius:10,
    padding:20,
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
  },

  navButtonContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    bottom: 0,
    backgroundColor: '#ffffff',
    height:100

  },
  navButton:{
    flex: 2,
    flexDirection: 'column',
    backgroundColor:'lightseagreen',
    borderRadius:10,
    justifyContent:'center',
  },
  navButtonView:{
    backgroundColor:'lightseagreen',
    borderRadius:10,
    justifyContent:'center',
    paddingRight: 40,
    paddingLeft:40,
  },
  navButtonText:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

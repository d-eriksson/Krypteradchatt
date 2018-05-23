import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import FadeInView from "../Components/FadeInView";
import StatusBarComponent from '../Components/StatusBarComponent';
import TintedImage from '../Components/TintedImage';
import { ColorPicker, toHsv } from 'react-native-color-picker';
import {__translate} from '../Components/lang';
import {Button} from 'native-base';


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
        const c = this.state.ChamColor;
        if(name.length > 0){
            let profile={
        		name: name,
                ChamColor: c,
                ChamImg: 1,
        	}
            AsyncStorage.setItem('profile', JSON.stringify(profile));
            this.setModalVisible(!this.state.modalVisible);
        }
    }
    nextScreen = () => {
        var p = Number(this.state.page);
        if(p < 5){
            var p = p + 1;
            this.setState({page: p});
        }
    }
    prevScreen = () =>{
        var p = Number(this.state.page);
        if(p > 1){
            var p = p - 1;
            this.setState({page: p});
        }
    }
    RegisterUser(){
        return(
            <View style={styles.ftreContainer}>
                <View style={styles.ftreTitleContainer}>
                    <Text style={styles.bigText}>{__translate("Lastly, add a name")}</Text>
                      <TextInput
                          style={styles.input}
                          placeholder={__translate("Name")}
                          placeholderTextColor="white"
                          onChangeText={name => this.setState({name})}
                      />
                    <Button rounded onPress={this.saveData} style={styles.saveButton}>
                              <Text style={styles.ftreExitButtonText}> {__translate("Save")} </Text>
                      </Button>
                </View>
            </View>
        );
    }
    SetAvatar(){
        return(
            <View style={styles.ftreContainer}>
                <View style={styles.avatarContainer}>
                <Text style={styles.bigText}> {__translate("Pick an avatar!")} </Text>
                <View style={styles.tintedImage}>
                    <TintedImage color={this.state.ChamColor} backgroundColor='#ffffff' size={170} version={1}/>
                </View>
                <View style={styles.colorWheel}>
                    <ColorPicker
                      ChamColor={this.state.ChamColor}
                      onColorChange={ChamColor => this.setState({ ChamColor })}
                      onColorSelected={ChamColor => this.setState({ ChamColor })}
                      style={{flex:1, height:200}}
                      hideSliders={true}
                    />
                </View>
              </View>
            </View>
        );
    }
    startPage(){
        return(
            <View style={styles.ftreContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.bigText}> {__translate("Welcome to")}</Text>
                    <Image source={require('../Icons/mumblr_font_white.png')} style={styles.mumblricon} />
                    <Text style={styles.medText}> {__translate("The chat app where everybody is your friend!")}</Text>
                </View>
            </View>
        );
    }
    HowToCreateChat(){
        return(
            <View style={styles.ftreContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.bigText}> {__translate("Click a button like this one!")}</Text>
                    <View style={styles.clickImg}>
                        <Image source={require('../Icons/click.png')} style={styles.images}/>
                    </View>
                    <Text style={styles.medText}> {__translate("To create a chat with your friend!")}</Text>
                </View>
            </View>
        );
    }
    HowToScan(){
        return(
            <View style={styles.ftreContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.bigText}>{__translate("Have a friend scan your QR-code")}</Text>
                    <View style={styles.clickImg}>
                        <Image source={require('../Icons/qrKod.png')} style={styles.images}/>
                    </View>
                    <Text style={styles.medText}> {__translate("And bob's your uncle!")}</Text>
                </View>
            </View>
        );
    }
    footer(){
        var leftButtonStyle = styles.navButton;
        var rightButtonStyle = styles.navButton;
        if(Number(this.state.page) < 2){
            leftButtonStyle = styles.navButtonInactive;
        }
        else if(Number(this.state.page) > 4){
            rightButtonStyle = styles.navButtonInactive;
        }

        return(
            <View style={styles.navButtonContainer}>
                <Button rounded onPress={this.prevScreen} style={leftButtonStyle}>
                        <Text style={styles.navButtonText}>{__translate("Back")}</Text>
                </Button>
                <Button rounded onPress={this.nextScreen} style={rightButtonStyle}>
                        <Text style={styles.navButtonText}>{__translate("Next")}</Text>
                </Button>
            </View>
        );
    }
    page(){
        if(Number(this.state.page) == 1){
            return this.startPage();
        }
        else if (Number(this.state.page) == 2){
            return this.HowToCreateChat();
        }
        else if (Number(this.state.page) == 3){
            return this.HowToScan();
        }
        else if (Number(this.state.page) == 4){
            return this.SetAvatar();
        }
        else if (Number(this.state.page) == 5){
            return this.RegisterUser();
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
                        {this.page()}
                        {this.footer()}
                    </View>
                </Modal>
            </View>
        );
  }
}
const styles = StyleSheet.create({
    ftreContainer:{
		backgroundColor:'#102027',
		flex:6,
		marginTop:0,
		marginBottom:0,
		marginLeft:0,
		marginRight:0,
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
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
    backgroundColor: '#102027',
    marginTop:70,
	},
	ftreDescriptionContainer:{
		flex:5
	},
	saveButton:{
    backgroundColor:'lightseagreen',
		justifyContent:'center',
    alignSelf: 'center',
    marginBottom: 60,
    marginTop: 20,
    width: 150,
	},
	ftreExitButtonText:{
		color:'white',
		fontSize:20,
		textAlign:'center'
	},
    input:{
        padding: 20,
        textAlign:'center',
        color:'white',
        width:300,
        marginBottom: 20,
    },

    navButtonContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        bottom: 0,
        backgroundColor: '#102027',
        height:100,
        justifyContent: 'space-around',
    },
    navButton:{
        backgroundColor:'lightseagreen',
        justifyContent:'center',
        alignItems: 'center',
        width: 120,
    },
    navButtonView:{
        backgroundColor:'lightseagreen',
        borderRadius:10,
        justifyContent:'center',
        paddingRight: 20,
        paddingLeft:20,
        marginLeft: 10,
        marginRight: 10,
    },
    navButtonInactive:{
        backgroundColor:'#0f0f0f',
        borderRadius:10,
        justifyContent:'center',
        paddingRight: 20,
        paddingLeft:20,
        height: 0,
    },
    navButtonText:{
        color: 'white',
        fontSize: 17,
        textAlign: 'center'
    },
    colorWheel:{
        flex: 4,
        flexDirection: 'row',
        alignItems:'center',
        width: 200,
    },
    tintedImage:{
        flex: 2,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around',
        marginTop: 10,

    },
    bigText:{
        color:'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        fontFamily: 'Roboto',
        width: 250,
    },
    medText:{
        color:'white',
        fontSize: 23,
        textAlign: 'center',
        flex:2,
        alignItems:'center',
        justifyContent: 'center',
        fontFamily: 'Roboto',
        width: 250,
    },
    clickImg:{
      flex:2,
      alignItems:'center',
      justifyContent: 'center',
      marginTop: 60
    },
    welcomeContainer:{
        marginTop: 70,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer:{
        marginTop: 40,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    images:{
      resizeMode: 'contain',
      width: 200,
      height: 200,
      marginBottom: 60,
    },
    mumblricon: {
     resizeMode: 'contain',
     width: 300,
     height: 72,
     marginTop:50,
    }
});

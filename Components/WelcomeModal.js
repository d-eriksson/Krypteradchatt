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
import {__translate} from '../Components/lang'


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
                    <Text style={styles.bigText}>{__translate("Lastly add a name")}</Text>
                </View>
                <View style={styles.ftreDescriptionContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={__translate("Name")}
                        placeholderTextColor="white"
                        onChangeText={name => this.setState({name})}
                    />
                </View>
                <TouchableHighlight onPress={this.saveData} style={styles.ftreExitContainer}>
                    <View style={styles.ftreExitButtonContainer}>
                        <Text style={styles.ftreExitButtonText}> {__translate("Save")} </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
    SetAvatar(){
        return(
            <View style={styles.ftreContainer}>
                <Text style={styles.bigText}> {__translate("Pick an avatar!")} </Text>
                <View style={styles.tintedImage}>
                    <TintedImage color={this.state.ChamColor} backgroundColor='#ffffff' size={200} version={1}/>
                </View>
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
    startPage(){
        return(
            <View style={styles.ftreContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.bigText}> {__translate("Welcome to mumblr")}</Text>
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
        var leftButtonStyle = styles.navButtonView;
        var rightButtonStyle = styles.navButtonView;
        if(Number(this.state.page) < 2){
            leftButtonStyle = styles.navButtonViewInactive;
        }
        else if(Number(this.state.page) > 4){
            rightButtonStyle = styles.navButtonViewInactive;
        }

        return(
            <View style={styles.navButtonContainer}>
                <TouchableHighlight onPress={this.prevScreen} style={styles.navButton}>
                    <View style={leftButtonStyle}>
                        <Text style={styles.navButtonText}>{__translate("Back")}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.nextScreen} style={styles.navButton}>
                    <View style={rightButtonStyle}>
                        <Text style={styles.navButtonText}>{__translate("Next")}</Text>
                    </View>
                </TouchableHighlight>
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
		backgroundColor:'#2C4A48',
		flex:6,
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
        backgroundColor: '#2C4A48'
	},
	ftreDescriptionContainer:{
		flex:5
	},
	ftreExitContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
        backgroundColor:'#2C4A48',
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
        textAlign:'center',
        color:'white'
    },

    navButtonContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        bottom: 0,
        backgroundColor: '#2C4A48',
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
    navButtonViewInactive:{
        backgroundColor:'#0f0f0f',
        borderRadius:10,
        justifyContent:'center',
        paddingRight: 40,
        paddingLeft:40,
        height: 0,
    },
    navButtonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    colorWheel:{
        flex: 4,
        flexDirection: 'row',
        alignItems:'center',
    },
    tintedImage:{
        flex: 2,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around',
    },
    bigText:{
        color:'white',
        fontSize: 46,
        fontWeight: 'bold',
        textAlign: 'center',
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    medText:{
        color:'white',
        fontSize: 32,
        textAlign: 'center',
        flex:2,
        alignItems:'center',
        justifyContent: 'center',
    },
    clickImg:{
        flex:2,
        alignItems:'center',
        justifyContent: 'center',
    },
    welcomeContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    images:{
        width: 200,
        height: 200,
    }
});

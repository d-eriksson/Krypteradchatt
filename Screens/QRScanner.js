import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class QRScanner extends Component {
  constructor (props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      scannedString: null,
      isRead: false
    };
  }

  componentWillMount() {
    this.sub = this.props.navigation.addListener('willFocus', () => this.setState({isRead: false}));
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  componentWillUnmount() {
    this.sub.forEach(sub => sub.remove());
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
            ? <Text style={{ color: '#fff' }}>
                Camera permission is not granted
              </Text>
            : <BarCodeScanner
                onBarCodeRead={result => {
                  if(this.state.isRead === false){
                    this.setState({
                      isRead: true
                    });
                    this._maybeRenderString(result.data)
                  }
                }}
                style={{
                  height: Dimensions.get('window').height,
                  width: Dimensions.get('window').width,
                }}
              />
          }

      </View>
    );
  }


 _maybeRenderString = (res) => {

    var IsThisOurTypeOfQr = true; // ska bytas ut till något som kollar ifall det är våra qr koder.
    if(IsThisOurTypeOfQr){
      var dividedString = res.split('___');
      let room = {
        roomID: dividedString[0],
        hash: dividedString[2],
        chatname: dividedString[1],
        user: "2",
      };

      AsyncStorage.setItem(room.roomID, JSON.stringify(room), () => {});
      const {navigate} = this.props.navigation;
      navigate('Chat', {title: room.roomID, hash: res})
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

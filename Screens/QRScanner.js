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
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import ConnectChat from '../Components/ConnectChat';

export default class QRScanner extends Component {
  state = {
    hasCameraPermission: null,
    scannedString: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.scannedString) {
      this.setState({ scannedString: result.data });
    }
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
                onBarCodeRead={this._handleBarCodeRead}
                style={{
                  height: Dimensions.get('window').height,
                  width: Dimensions.get('window').width,
                }}
              />}

        {this._maybeRenderString()}

        <StatusBar hidden />
      </View>
    );
  }

  _maybeRenderString = () => {
    if (!this.state.scannedString) {
      return;
    }

    var IsThisOurTypeOfQr = true; // ska bytas ut till något som kollar ifall det är våra qr koder.
    if(IsThisOurTypeOfQr){
      var dividedString = this.state.scannedString.split('___');
      var roomID = dividedString[0];
      var chatname = dividedString[1];
      var hash = dividedString[2];
      var user ="2";
      console.log( " Room: " + roomID + " Name: " + chatname + " Hash: "+ hash + " User: " + user);
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.text}>
            <ConnectChat roomID = {roomID} hash= {hash} chatname= {chatname} user = {user}/>
          </Text>
        </TouchableOpacity>
      </View>
    );
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

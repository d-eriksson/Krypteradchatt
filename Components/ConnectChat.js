import React, { Component } from 'react';
import { AsyncStorage, Text } from 'react-native';

export default class ConnectChat extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {

    const url = 'http://83.227.100.223:8080/connect/' + this.props.roomID;
    fetch(url)
    .then((response) => response.text())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        dataSource: responseJson
      })
    })
    .catch((error) => {
      console.log(error)
    })

    let room = {
      roomID: this.props.roomID,
      hash: this.props.hash,
    };
    AsyncStorage.setItem(this.props.roomID, JSON.stringify(room), () => {
       AsyncStorage.getItem(this.props.roomID, (err, result) => {
           if(err)
           {
             this.setState({
               dataSource: "Error!"
             })
           }
           this.setState({
             dataSource: result
           });

        });
    });
  }

  render() {
        return <Text>{JSON.stringify(this.state.dataSource)}</Text>;
  }
}

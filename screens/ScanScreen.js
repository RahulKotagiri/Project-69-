import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

getCameraPermissions=async()=>{
    const status = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted"
    })
  }

  handleBarcodeScanned=(type, data)=>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal"
    })
  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const Scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === "clicked" && hasCameraPermissions){
      return(
        <View>

        
        <BarCodeScanner onBarCodeScanned = {scanned? undefined: this.handleBarcodeScanned}
        ></BarCodeScanner>
        <TouchableOpacity 
            style = {styles.button} 
            onPress = {this.getCameraPermissions} 
            title = "Bar Code Scanner">
              <Text style = {styles.buttonText}>
                  Scan QR Code
              </Text>
          </TouchableOpacity>
          </View>        
      );
    }
    else if (buttonState === "normal"){
      return (
        <View style={styles.container}>
          <Text>
            {hasCameraPermissions === true?this.state.scanedData: "Request Camera Permission"}
          </Text>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
      flex: 1,
      color: "blue",
      fontSize: 17,
      fontWeight: "bold",
      justifyContent: "center",
      textAlign: "center"
  },
  button: {
    flex:1,
    backgroundColor: "red",
    marginBottom: 830,
    width: 150,
    height: 25,
  }
  
});
import React, { Component, useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Alert } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { homepageStyle } from './styleHome.js'
import { Ionicons } from '@expo/vector-icons'


function Homepage (){
  const [hasPermission, setHasPermission] = useState(null);
  const [hasLibPermission, setHasLibPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      const { statusRoll } = await MediaLibrary.requestPermissionsAsync();
      setHasLibPermission(statusRoll === 'granted')
    })();
  }, []);

  const permissionAlert = () =>
  Alert.alert(
    "Permissions not Granted",
    "In Device Setting allow app storage permissions ",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

  const takePictureAndSave = async () => {
      let photo = await camera.takePictureAsync()
      console.log('uri', photo)
      const asset = await MediaLibrary.saveToLibraryAsync(photo.uri)
  };

  if (hasPermission === null ) {
    return <Text>Bungus</Text>
  }
  if (hasPermission === false ) {
    return <Text>Required access not granted</Text>;
  }

  return (
  <View style={homepageStyle.container}>
    <Camera style={homepageStyle.camera} type={type}  ref={(r) => {camera = r}}/>
      <View style={homepageStyle.navBar}>

      <TouchableOpacity
          style={homepageStyle.button}
          onPress={() => takePictureAndSave()}>
          <Ionicons name="caret-back-circle" size={32} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={homepageStyle.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Ionicons name="sync-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
  </View>
  );
};
  
  export default Homepage;
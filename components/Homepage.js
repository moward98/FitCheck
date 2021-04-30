import React, { Component, useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { homepageStyle } from './styleHome.js'
import { Ionicons } from '@expo/vector-icons'


function Homepage (){
  const [hasPermission, setHasPermission] = useState(null);
  const [hasLibPermission, setHasLibPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState("");

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
      console.log(photo.uri)
      const asset = await MediaLibrary.saveToLibraryAsync(photo.uri)
      setPhotoUri(photo.uri)
  };

  const RetakePicture = () => {
    setPhotoUri("")
  }

  if (hasPermission === null ) {
    return <Text>Bungus</Text>
  }
  if (hasPermission === false ) {
    return <Text>Required access not granted</Text>;
  }

  return (
  <View style={homepageStyle.container}>
    {
      photoUri === ""
      ? <Camera style={homepageStyle.camera} type={type}  ref={(r) => {camera = r}}/>
      : <Image source={{uri: photoUri}} style={homepageStyle.camera} />
    }
    <View style={homepageStyle.navBar}>
      <TouchableOpacity
        style={homepageStyle.button}
        onPress={() => RetakePicture()}>
        <Ionicons name="ios-home-sharp" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={homepageStyle.button}
        onPress={() => takePictureAndSave()}>
        <Image source={require('../assets/getImageIcon.png')} style={{height: 60, width: 60, alignSelf: 'center'}} />
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
        <Ionicons name="sync-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  </View>
  );
};
  
  export default Homepage;
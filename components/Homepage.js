import React, { Component, useState, useEffect} from 'react'
import {View, Text, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { homepageStyle } from './styleHome.js'
// import * as Permissions from 'expo-permissions'

function Homepage (){
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
  <View style={homepageStyle.container}>
    <Camera style={homepageStyle.camera} type={type}>
      <View style={homepageStyle.buttonContainer}>
        <TouchableOpacity
          style={homepageStyle.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Text style={homepageStyle.text}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  </View>
  );
};
  
  export default Homepage;
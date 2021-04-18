import React, { Component, useState, useEffect} from 'react'
import {View, Text, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { homepageStyle } from './styleHome.js'
import { Ionicons } from '@expo/vector-icons';
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
    <Camera style={homepageStyle.camera} type={type}/>
      <View style={homepageStyle.navBar}>
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
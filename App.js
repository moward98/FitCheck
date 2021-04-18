import React from 'react';
import {SafeAreaView, View, StyleSheet } from 'react-native';
import Homepage from './components/Homepage.js';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Homepage/> */}
      <View style={styles.navBar}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingRight: 25,
    paddingBottom: 0,
    paddingLeft: 25,
  },
  navBar: {
    flex: 0.5,
    flexDirection: 'row',
    color: 'blue',
  }
});


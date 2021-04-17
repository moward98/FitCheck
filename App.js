import React from 'react';
import {SafeAreaView, View, StyleSheet } from 'react-native';
import Homepage from './components/Homepage.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Homepage/>
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
});


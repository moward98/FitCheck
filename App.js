import React from 'react';
import {SafeAreaView, View, StyleSheet } from 'react-native';
import Homepage from './components/Homepage.js';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Homepage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "black",
  },
});


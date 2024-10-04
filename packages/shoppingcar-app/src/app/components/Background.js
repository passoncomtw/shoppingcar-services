import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

export default function Background({ containerStyle = {}, children }) {
  return (
    <KeyboardAvoidingView style={[styles.container, containerStyle]} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
});

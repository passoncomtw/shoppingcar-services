import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Background from '../../components/Background';

export default function SettingScreen() {  
  return (
    <Background>
      <View style={styles.row}>
        <Text>Setting Screen</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
});

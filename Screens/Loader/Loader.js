import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Lottie
        style={{marginTop: 20, width: 420, height: 480, alignSelf: 'center'}}
        source={require('../../assets/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});

import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';
import logo from '../assets/AgriVision.png';
const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Home');
    }, 1500);
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header_splash}>
        <Image source={logo} style={styles.logo_splash} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_splash: {
    height: vh(20),
    width: vw(80),
    resizeMode: 'contain',
  },
  header_splash: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Splash;

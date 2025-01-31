import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Detection = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Select a Category</Text>
      <View style={styles.gridContainer}>
        {/* Tile for Fruits and Vegetables */}
        <TouchableOpacity
          style={styles.tile}
          onPress={() => {
            navigation.navigate('IdentifyPlant');
          }}>
          <Image
            style={styles.tileImage}
            source={require('../../assets/fruitsandvegies.jpg')}
          />
          <Text style={styles.tileText}>Identify {'\n'}Fruits/Vegetables</Text>
        </TouchableOpacity>

        {/* Tile for Plants */}
        <TouchableOpacity
          style={styles.tile}
          onPress={() => {
            navigation.navigate('DetectDisease');
          }}>
          <Image
            style={styles.tileImage}
            source={require('../../assets/PestedLeave.jpg')}
          />
          <Text style={styles.tileText}>Detect Disease</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  gridContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(90),
  },
  tile: {
    backgroundColor: '#ffffff',
    width: '48%',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  tileImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  tileText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default Detection;

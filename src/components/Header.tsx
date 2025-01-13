import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Header = (props: any) => {

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{flex: 1}}>
        <View
          style={{
            alignContent: 'center',
            flexDirection: 'row',
          }}>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F0F0F2',
    justifyContent: 'space-between',
  },
  optionsBar: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 10,
    top: 50,
    borderRadius: 5,
  },

  txt: {
    alignSelf: 'center',
    color: '#2256F2',
    fontWeight: '700',
    marginLeft: 10,
  },
});
export default Header;

import React from 'react';
import {
  //   Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import backBtn from '../assets/return-button.svg';

const Header = (props: any) => {
  //   const [visibility, setVisibility] = useState<boolean>(false);
  //   const [display, setDisplay] = useState<boolean>(false);
  //   const fadeAnim = useRef(new Animated.Value(0)).current;

  //   const closeMenu = () => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start();
  //     setTimeout(() => {
  //       setVisibility(false);
  //       setDisplay(false);
  //     }, 300);
  //   };

  //   const openMenu = () => {
  //     setDisplay(true);
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start();
  //     setTimeout(() => {
  //       setVisibility(true);
  //     }, 300);
  //   };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        // onPress={() => props.navigation.navigate('StudentProfile')}
        style={{flex: 1}}>
        <View
          style={{
            alignContent: 'center',
            flexDirection: 'row',
          }}>
          {/* <Image src={backBtn} /> */}
          <Text>kdsmsdk</Text>
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
    // fontSize: vw(6),
    color: '#2256F2',
    fontWeight: '700',
    marginLeft: 10,
  },
});
export default Header;

import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {enableScreens} from 'react-native-screens';

import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Detection from './src/screens/Detection/Detection';
import IdentifyPlant from './src/screens/Detection/IdentifyPlant';
import DetectDisease from './src/screens/Detection/DetectDisease';

enableScreens();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type RootTabParamList = {
  Home: undefined;
  Detection: undefined;
  IdentifyPlant: undefined;
  DetectDisease: undefined;
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: true,
          headerStyle: {backgroundColor: '#14532d'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '400',
            fontFamily: 'Raleway-Light',
          },
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detection"
          component={Detection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IdentifyPlant"
          component={IdentifyPlant}
          options={({navigation}) => ({
            title: 'Identify Produce',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="DetectDisease"
          component={DetectDisease}
          options={({navigation}) => ({
            title: 'Detect Disease',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#14532d',
        tabBarActiveBackgroundColor: '#14532d',
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? '#ffffff' : '#14532d'}
              />
            );
          } else if (route.name === 'Detect') {
            iconName = focused ? 'picture' : 'picture';
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? '#ffffff' : '#14532d'}
              />
            );
          }
          return (
            <AntDesign
              name="questioncircleo"
              size={24}
              color={focused ? '#ffffff' : '#14532d'}
            />
          );
        },
        tabBarStyle: {
          height: 60,
          position: 'relative',
          flex: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Raleway',
          fontWeight: '300',
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Detect" component={Detection} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;

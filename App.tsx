import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
enableScreens();

import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Detection from './src/screens/Detection/Detection';
import Header from './src/components/Header';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
type RootTabParamList = {
  Home: undefined;
  Detection: undefined;
};
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: true,
          headerStyle: {backgroundColor: '#2878BD'},
          headerTintColor: '#fff',
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTab() {
  const icons: {[key in keyof RootTabParamList]: string} = {
    Home: 'home',
    Detection: 'options-sharp',
  };
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
            iconName = focused ? 'home' : 'home'; // You can choose different icons for active/inactive states
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? '#ffffff' : '#14532d'}
              />
            );
          } else if (route.name === 'Detect') {
            iconName = focused ? 'picture' : 'picture'; // Change this to another icon from FontAwesome or any other icon set
            return (
              <AntDesign
                name={iconName}
                size={24}
                color={focused ? '#ffffff' : '#14532d'}
              />
            );
          }

          // Return default icon if no condition is met
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

export default App;

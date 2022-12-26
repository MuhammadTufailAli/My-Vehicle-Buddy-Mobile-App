import React from 'react';
import {Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import port from '../Port/Port';
import Home from './MechanicHome';
import MechanicNotification from './MechanicNotification';
import Profile from './MechanicProfile';

const Tab = createBottomTabNavigator();

function MechanicInterface({navigation, route}) {
  const user = route.params?.user;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          size = 36;
          if (route.name === 'Home') {
            return <Entypo name={'home'} size={size} color={color} />;
          } else if (route.name === 'Notifications') {
            return (
              <View
                style={{
                  // height: 50,
                  // width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',

                  // borderColor: 'white',

                  borderRadius: 30,
                  top: -25,
                  // elevation: 5,
                }}>
                <Ionicons
                  name={'notifications'}
                  size={45}
                  color={color}
                  style={{height: 45, width: 45}}
                />
              </View>
            );
          } else if (route.name === 'Profile') {
            return <FontAwesome name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#8739F9',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Notifications"
        component={MechanicNotification}
        options={{unmountOnBlur: true}}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
}

export default MechanicInterface;

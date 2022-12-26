import React from 'react';
import {Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {auth, provider, db} from '../../firebase/firebase';
import port from '../Port/Port';
import Home from './CustomerHome';
import Mechanic from './CustomerMechanic';
import Prediction from './CustomerPrediction';

import CustomerBuy from './CustomerBuy';
import CustomerProfile from './CustomerProfile';
const Tab = createBottomTabNavigator();

function CustomerInterface({navigation, route}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          size = 32;
          if (route.name === 'Home') {
            return <Entypo name={'home'} size={size} color={color} />;
          } else if (route.name === 'Mechanic') {
            return (
              <MaterialCommunityIcons
                name={'account-wrench'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Prediction') {
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
                <MaterialCommunityIcons
                  name="google-analytics"
                  size={45}
                  color={color}
                  style={{height: 45, width: 45}}
                />
              </View>
            );
          } else if (route.name === 'Buy') {
            return (
              <FontAwesome5 name="hand-holding-usd" size={size} color={color} />
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
        name="Mechanic"
        component={Mechanic}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Prediction"
        component={Prediction}
        options={{unmountOnBlur: true}}
      />

      <Tab.Screen
        name="Buy"
        component={CustomerBuy}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Profile"
        component={CustomerProfile}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
}

export default CustomerInterface;

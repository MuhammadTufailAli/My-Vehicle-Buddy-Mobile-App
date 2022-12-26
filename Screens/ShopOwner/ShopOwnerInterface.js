import React from 'react';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './ShopOwnerHome';
import Sell from './ShopOwnerSell';
import Profile from './ShopOwnerProfile';
import port from '../Port/Port';

const Tab = createBottomTabNavigator();

function ShopOwnerInterface({navigation, route}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({focused, color, size}) => {
          size = 36;
          if (route.name === 'Home') {
            return <Entypo name={'home'} size={size} color={color} />;
          } else if (route.name === 'SELL') {
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
                  elevation: 5,
                }}>
                <FontAwesome
                  name="plus-circle"
                  size={50}
                  color={color}
                  style={{height: 50, width: 50}}
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
        name="SELL"
        component={Sell}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{unmountOnBlur: true}}
      />

      {/* <Tab.Screen
        name="Home"
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}>
        {props => <Home {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="SELL"
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}>
        {props => <Sell {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{unmountOnBlur: true}}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}>
        {props => <Profile {...props} />}
      </Tab.Screen> */}
    </Tab.Navigator>
  );
}

export default ShopOwnerInterface;

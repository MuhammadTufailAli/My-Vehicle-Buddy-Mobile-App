import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Pressable,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import Setting from './Setting';
import Welcome from '../WelcomeScreen/WelcomeScreen';
import ShopOwnerProfileFinal from './ShopOwnerProfileFinal';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import CartProvider from '../ContextApi/contextApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import port from '../Port/Port';
import {Font} from '../font/Font';

const Drawer = createDrawerNavigator();

const ShopOwnerProfile = ({navigation}) => {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  if (userdetails?.shop == 'No Shop') {
    return (
      <View>
        <View style={{alignItems: 'center', margin: 10}}>
          <Text style={{fontSize: 26, color: Font.TextColor}}>
            <Text style={{color: '#8739F9'}}>Welcome </Text>
            {userdetails?.firstname} {userdetails?.lastname}
          </Text>
        </View>
        <Text style={{fontSize: 16, marginLeft: 10, color: Font.TextColor}}>
          We are glad to see you here.
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            marginBottom: 20,
            color: Font.TextColor,
          }}>
          You can not post an Ad untill you create a shop.
        </Text>
        <Lottie
          style={{
            width: 370,
            height: 430,
            alignSelf: 'center',
            marginTop: -14,
          }}
          source={require('../../assets/ShopClosed.json')}
          autoPlay
          loop
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShopOwner EnterShop');
          }}
          style={{
            padding: 10,
            backgroundColor: '#8739F9',
            width: '90%',
            alignItems: 'center',
            alignSelf: 'center',

            marginTop: -40,
          }}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
            Create Shop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              await AsyncStorage.setItem('@token', 'empty');
              navigation.navigate('Welcome');
            } catch (e) {
              console.log(e);
            }
          }}
          style={{
            width: '90%',
            borderWidth: 1,
            padding: 10,
            marginLeft: '5%',
            backgroundColor: '#8739F9',
            marginRight: '5%',
            marginTop: 10,
            alignItems: 'center',
            borderColor: 'white',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <Drawer.Navigator
        initialRouteName="Profile"
        screenOptions={{
          drawerPosition: 'right',
        }}>
        <Drawer.Screen
          name="ProfileFinal"
          component={ShopOwnerProfileFinal}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            headerLeft: false,
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="settings" size={30} color="black" />
              </TouchableOpacity>
            ),
          }}
        />

        <Drawer.Screen
          name="Setting"
          component={Setting}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            headerLeft: false,
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <FontAwesome name="user" size={30} color={'black'} />
              </TouchableOpacity>
            ),
          }}
        />

        {/* <Drawer.Screen
          name="Logout"
          component={Welcome}
          options={{
            headerShown: false,
            unmountOnBlur: true,
            headerLeft: false,
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  navigation.navigate('Welcome');
                }}>
                <FontAwesome name="user" size={30} color={'black'} />
              </TouchableOpacity>
            ),
          }}
        /> */}
      </Drawer.Navigator>
    );
  }
};

export default ShopOwnerProfile;

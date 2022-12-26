import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {StyleSheet} from 'react-native';

import axios from 'axios';
import CartProvider from '../ContextApi/contextApi';
import {Font} from '../font/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import port from '../Port/Port';

function ShopOwnerViewShop({navigation}) {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  return (
    <View style={{flex: 1}}>
      {/* Top Bar */}
      <View
        style={{
          flex: 0.8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: Font.ButtonColor,
          height: 60,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            style={{textAlign: 'left', marginLeft: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign name={'left'} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Shop Details</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{marginRight: 8, color: 'white'}}> </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: -25, flex: 7}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            marginTop: 40,
            color: Font.TextColor,
          }}>
          MY VEHICLE BUDDY
        </Text>
        <View style={styles.textView}>
          <Text style={styles.inputText}>Shop Name</Text>
          <Text style={styles.inputText}>{userdetails.shopname}</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.inputText}>Phone Number</Text>
          <Text style={styles.inputText}>{userdetails.phonenumber}</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.inputText}>Telephone Number</Text>
          <Text style={styles.inputText}>{userdetails.telephonenumber}</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.inputText}>Shop Address</Text>
          <Text style={styles.inputText}>{userdetails.shopaddress}</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.inputText}>Permanent Address</Text>
          <Text style={styles.inputText}>{userdetails.permanentaddress}</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.inputText}>Cnic</Text>
          <Text style={styles.inputText}>{userdetails.cnic}</Text>
        </View>
      </View>

      <View style={{alignItems: 'center', flex: 2}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            padding: 10,
            backgroundColor: '#8739F9',
            width: '90%',
            alignItems: 'center',
            // borderRadius: '50%',
            marginTop: 10,
          }}>
          <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ShopOwnerViewShop;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    flexDirection: 'row',
    padding: 15,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 7,
    fontSize: 18,
    fontWeight: '700',
    color: Font.TextColor,
  },
  text: {
    color: 'white',

    fontSize: 18,
  },
});

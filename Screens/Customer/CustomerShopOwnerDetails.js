import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import port from '../Port/Port';
import axios from 'axios';
import CartProvider from '../ContextApi/contextApi';
import {Font} from '../font/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';

function CustomerShopOwnerDetails({navigation, route}) {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  return (
    <View>
      <View
        style={{
          backgroundColor: Font.ButtonColor,
          marginBottom: 5,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'left'} size={20} color={'white'} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            color: 'white',
            fontWeight: '700',
            marginLeft: 132,
          }}>
          Shop Details
        </Text>
      </View>

      <View style={{alignItems: 'center', marginTop: -25}}>
        <Text style={{fontSize: 20, fontWeight: '700', marginTop: 40}}>
          MY VEHICLE BUDDY
        </Text>
      </View>

      <Text style={styles.inputText}>
        <Text>Shop Name</Text> <Text>{'               '}</Text>{' '}
        <Text>{route.params.user.shopname}</Text>{' '}
      </Text>

      <Text style={styles.inputText}>
        <Text>Phone Number</Text> <Text>{'         '}</Text>{' '}
        <Text>{route.params.user.phonenumber}</Text>{' '}
      </Text>
      <Text style={styles.inputText}>
        <Text>Telephone Number</Text> <Text>{'  '}</Text>{' '}
        <Text>{route.params.user.telephonenumber}</Text>{' '}
      </Text>
      <Text style={styles.inputText}>
        <Text>Shop Address</Text> <Text>{'            '}</Text>{' '}
        <Text>{route.params.user.shopaddress}</Text>{' '}
      </Text>

      <View style={{alignItems: 'center'}}>
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

export default CustomerShopOwnerDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputText: {
    padding: 15,
    borderBottomWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 7,
    fontSize: 18,
    fontWeight: '700',
  },
});

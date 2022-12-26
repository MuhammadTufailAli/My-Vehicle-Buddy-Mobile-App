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
import port from '../Port/Port';

function ShopOwnerEditShop({navigation}) {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  const [shopname, setshopname] = React.useState(userdetails?.shopname);
  const [phonenumber, setphonenumber] = React.useState(
    userdetails?.phonenumber.toString(),
  );
  const [telephonenumber, settelephonenumber] = React.useState(
    userdetails?.telephonenumber.toString(),
  );
  const [shopaddress, setshopaddress] = React.useState(
    userdetails?.shopaddress,
  );
  const [permanentaddress, setpermanentaddress] = React.useState(
    userdetails?.permanentaddress,
  );
  const [cnic, setcnic] = React.useState(userdetails?.cnic.toString());

  const EnterShop = async () => {
    const shopData = {
      shopname: shopname,
      phonenumber: parseInt(phonenumber),
      telephonenumber: parseInt(telephonenumber),
      shopaddress: shopaddress,
      permanentaddress: permanentaddress,
      cnic: parseInt(cnic),
      shop: 'shop',
    };

    console.log(shopData);

    try {
      const result = await axios.patch(
        `${port.herokuPort}/users/updateUser/${userdetails?._id}`,
        shopData,
      );

      setuserdetails(result.data.data);

      alert('Successfull');
      navigation.navigate('ShopOwnerInterface');
    } catch (err) {
      console.log(err);
      alert('Error');
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={{fontSize: 20, fontWeight: '700', marginTop: 40}}>
            Edit Shop
          </Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder={'Shop Name :' + userdetails.shopname}
          onChangeText={value => setshopname(value)}
        />

        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          maxLength={13}
          placeholder={'Phone Number : ' + userdetails.phonenumber.toString()}
          onChangeText={value => setphonenumber(value)}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          maxLength={10}
          placeholder={
            'Telephone Number : ' + userdetails.telephonenumber.toString()
          }
          onChangeText={value => settelephonenumber(value)}
        />

        <TextInput
          style={styles.inputText}
          placeholder={'Shop Address : ' + userdetails.shopaddress}
          onChangeText={value => setshopaddress(value)}
        />

        <TextInput
          style={styles.inputText}
          placeholder={'Permanent Address : ' + userdetails.permanentaddress}
          onChangeText={value => setpermanentaddress(value)}
        />

        <TextInput
          keyboardType="numeric"
          maxLength={13}
          style={styles.inputText}
          placeholder={'Cnic : ' + userdetails.cnic.toString()}
          onChangeText={value => setcnic(value)}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              EnterShop();
            }}
            style={{
              padding: 10,
              backgroundColor: '#8739F9',
              width: '90%',
              alignItems: 'center',
              // borderRadius: '50%',
              marginTop: 10,
            }}>
            <Text style={{color: 'white', fontWeight: '500'}}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default ShopOwnerEditShop;
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
  },
});

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
import {Font} from '../font/Font';

function ShopOwnerEnterShop({navigation}) {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  const [shopname, setshopname] = React.useState('');
  const [phonenumber, setphonenumber] = React.useState(0);
  const [telephonenumber, settelephonenumber] = React.useState(0);
  const [shopaddress, setshopaddress] = React.useState('');
  const [permanentaddress, setpermanentaddress] = React.useState('');
  const [cnic, setcnic] = React.useState(0);

  const EnterShop = async () => {
    const shopData = {
      shopname: shopname,
      phonenumber: phonenumber,
      telephonenumber: telephonenumber,
      shopaddress: shopaddress,
      permanentaddress: permanentaddress,
      cnic: cnic,
      shop: 'Shop',
    };

    try {
      const result = await axios.patch(
        `${port.herokuPort}/users/updateUser/${userdetails?._id}`,
        shopData,
      );
      setuserdetails(result.data.data);

      alert('Successfull');
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      alert('Error');
    }

    // await db
    //   .collection('ShopOwner')
    //   .doc(route.params.data.email)
    //   .set({
    //     firstname: route.params.data.firstname,
    //     lastname: route.params.data.lastname,
    //     email: route.params.data.email,
    //     password: route.params.data.password,
    //     shop: 'shop',
    //     shopname: shopname,
    //     phonenumber: phonenumber,
    //     telephonenumber: telephonenumber,
    //     shopaddress: shopaddress,
    //     permanentaddress: permanentaddress,
    //     cnic: cnic,
    //     photoUrl: '',
    //   })
    //   .then(() => navigation.navigate('Login', {user: 'ShopOwner'}))
    //   .catch(error => {
    //     console.error('Error writing document: ', error);
    //   });
  };

  return (
    <View>
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              marginTop: 40,
              color: Font.TextColor,
            }}>
            Create Shop
          </Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Shop Name"
          placeholderTextColor={Font.LightColor}
          onChangeText={value => setshopname(value)}
        />

        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          maxLength={13}
          placeholderTextColor={Font.LightColor}
          placeholder="Phone Number"
          onChangeText={value => setphonenumber(value)}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          placeholderTextColor={Font.LightColor}
          maxLength={10}
          placeholder="Telephone Number"
          onChangeText={value => settelephonenumber(value)}
        />

        <TextInput
          style={styles.inputText}
          placeholder="Shop Address"
          placeholderTextColor={Font.LightColor}
          onChangeText={value => setshopaddress(value)}
        />

        <TextInput
          style={styles.inputText}
          placeholder="Permanent Address"
          placeholderTextColor={Font.LightColor}
          onChangeText={value => setpermanentaddress(value)}
        />

        <TextInput
          keyboardType="numeric"
          maxLength={13}
          style={styles.inputText}
          placeholder="CNIC"
          placeholderTextColor={Font.LightColor}
          onChangeText={value => setcnic(value)}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              if (
                shopname != '' &&
                phonenumber != '' &&
                shopaddress != '' &&
                permanentaddress != '' &&
                cnic != ''
              ) {
                EnterShop();
              } else {
                alert('Enter all Fields');
              }
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

export default ShopOwnerEnterShop;
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
    color: Font.TextColor,
  },
});

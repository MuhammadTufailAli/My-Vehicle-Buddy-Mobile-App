import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import port from '../Port/Port';
import CartProvider from '../ContextApi/contextApi';
import {Font} from '../font/Font';

const DeleteShop = ({navigation}) => {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  const [email, setemail] = React.useState();
  const [password, setpassword] = React.useState();

  const Delete = async () => {
    const userCredentials = {
      email: email,
      password: password,
    };
    console.log('Hello');
    try {
      const result = await axios.post(
        `${port.herokuPort}/users/signin`,
        userCredentials,
      );

      //Ta k jo user login ha vo apna id pass dala or kisi or ka dala to alert aa jay
      if (result.data.data.user._id === userdetails._id) {
        navigation.navigate('ShopOwner EditShop');
      } else {
        alert('Wrong email and password');
      }
    } catch (err) {
      console.log(err.response.data.message);
      alert('Wrong email and password');
      // setCredentialValidation(err.response.data.message);
    }
  };

  return (
    <View>
      <View style={{alignItems: 'center', marginTop: 50}}>
        {/* <Icon
          style={{margin: 10, justifyContent: 'center', color: '#1DA1F2'}}
          name="car"
          size={25}
        /> */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            marginTop: 40,
            color: Font.TextColor,
          }}>
          Edit Shop
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email"
          placeholderTextColor={Font.placeholder}
          value={email}
          onChangeText={value => setemail(value)}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.inputText}
          placeholder="Enter Password"
          placeholderTextColor={Font.placeholder}
          value={password}
          onChangeText={value => setpassword(value)}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            Delete();
          }}
          style={{
            padding: 10,
            backgroundColor: '#8739F9',
            width: '90%',
            alignItems: 'center',
            // borderRadius: '50%',
            margin: 10,
          }}>
          <Text style={{color: 'white', fontWeight: '500'}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert('Under Development');
          }}></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputText: {
    padding: 15,
    borderBottomWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    color: Font.TextColor,
  },
});

export default DeleteShop;

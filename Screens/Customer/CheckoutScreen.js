import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  SectionList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CartProvider from '../ContextApi/contextApi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Font, Commonstyles} from '../font/Font';
import axios from 'axios';
import port from '../Port/Port';

const CheckoutScreen = ({navigation, route}) => {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  const [mobileNumber, setMobileNumber] = useState(userdetails?.phonenumber);
  const [city, setlocation] = useState(userdetails?.shopaddress);
  const [address, setAddress] = useState(userdetails?.permanentaddress);

  const updateUser = async () => {
    const userData = {
      phonenumber: mobileNumber,
      shopaddress: city,
      permanentaddress: address,
    };

    try {
      const result = await axios.patch(
        `${port.herokuPort}/users/updateUser/${userdetails?._id}`,
        userData,
      );

      console.log(result.data.data);
      setuserdetails(result.data.data);

      navigation.navigate('SelectPaymentScreen', {
        product: route.params?.product,
        quantity: route.params?.quantity,
      });
    } catch (err) {
      console.log(err);
      alert('Error');
    }
  };
  return (
    <View style={{height: '100%', justifyContent: 'space-between'}}>
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
              marginLeft: 83,
              fontFamily: 'Lexend-Regular',
            }}>
            Order Confirmation
          </Text>
        </View>
        <View
          style={{marginTop: 15, backgroundColor: 'white', paddingBottom: 10}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              color: Font.TextColor,
              fontFamily: 'Lexend-Regular',
            }}>
            Contact Information
          </Text>

          <Text
            style={{
              marginLeft: '5.5%',
              fontSize: 15,

              marginTop: 5,
              marginBottom: -8,
              color: Font.LightColor,
              fontFamily: 'Lexend-Regular',
              fontWeight: '400',
            }}>
            Name
          </Text>
          {/* 
        <TextInput
          style={styles.inputText}
          //   placeholder="User Name"
          value={userdetails.firstname + ' ' + userdetails.lastname}

          //   onChangeText={val => setprice(val)}
        /> */}
          <Text style={styles.inputText1}>
            {userdetails.firstname + ' ' + userdetails.lastname}
          </Text>

          <Text
            style={{
              marginLeft: '5.5%',
              fontSize: 15,
              color: Font.LightColor,
              marginTop: 5,
              marginBottom: -8,
              fontFamily: 'Lexend-Regular',
              fontWeight: '400',
            }}>
            Mobile Number
          </Text>

          <TextInput
            placeholderTextColor={Font.placeholder}
            style={styles.inputText}
            maxLength={13}
            placeholder={
              userdetails?.phonenumber
                ? `${userdetails?.phonenumber}`
                : 'Enter Mobile Number'
            }
            keyboardType="numeric"
            onChangeText={val => setMobileNumber(val)}
          />

          <Text
            style={{
              marginLeft: '5.5%',
              fontSize: 15,

              marginTop: 5,
              marginBottom: -8,
              fontFamily: 'Lexend-Regular',
              fontWeight: '400',
            }}>
            Email Address
          </Text>

          <Text style={styles.inputText1}>{userdetails.email}</Text>
        </View>

        <View
          style={{marginTop: 15, backgroundColor: 'white', paddingBottom: 10}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 5,
              color: Font.TextColor,
            }}>
            Shipping Information
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectCityForAd', {
                city: setlocation,
              });
            }}>
            <View pointerEvents="none">
              <Text
                style={{
                  marginLeft: '5.5%',
                  fontSize: 15,
                  color: Font.LightColor,
                  marginTop: 5,
                  marginBottom: -8,
                  fontFamily: 'Lexend-Regular',
                  fontWeight: '400',
                }}>
                City
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  placeholderTextColor={Font.placeholder}
                  placeholder={
                    userdetails?.shopaddress
                      ? `${userdetails?.shopaddress}`
                      : 'Select City'
                  }
                  style={{
                    borderBottomWidth: 0.5,
                    borderColor: 'grey',
                    width: '90%',
                    marginLeft: '5%',
                    marginRight: '5%',
                    fontSize: 16,
                    color: Font.placeholder,
                  }}
                  value={city}
                />
                <AntDesign
                  name={'right'}
                  size={18}
                  color={Font.TextColor}
                  style={{
                    alignSelf: 'center',
                    marginLeft: -25,
                    marginBottom: -10,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              marginLeft: '5.5%',
              fontSize: 15,
              color: Font.LightColor,

              marginTop: 5,
              marginBottom: -8,
              fontFamily: 'Lexend-Regular',
              fontWeight: '400',
            }}>
            Address
          </Text>

          <TextInput
            style={styles.inputText}
            placeholderTextColor={Font.placeholder}
            placeholder={
              userdetails?.permanentaddress
                ? `${userdetails?.permanentaddress}`
                : 'Enter Shipping Address'
            }
            onChangeText={val => setAddress(val)}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity
          onPress={() => {
            updateUser();
          }}
          style={{
            padding: 14,
            backgroundColor: Font.ButtonColor,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: '700',
              fontFamily: 'Lexend-Regular',
            }}>
            Proceed to pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputText: {
    padding: 10,
    borderBottomWidth: 0.3,
    marginLeft: 20,
    marginRight: 20,
    color: Font.placeholder,
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
    // marginTop: 7,
    // marginBottom: 10,
  },
  inputText1: {
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.3,
    marginLeft: 20,
    marginRight: 20,
    color: Font.placeholder,
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
    // marginTop: 7,
    // marginBottom: 10,
  },
});

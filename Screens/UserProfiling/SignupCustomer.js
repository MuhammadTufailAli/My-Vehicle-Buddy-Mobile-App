import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import port from '../Port/Port';
import {Font} from '../font/Font';
import axios from 'axios';
import CartProvider from '../ContextApi/contextApi';
import {Formik} from 'formik';
import * as Yup from 'yup';

function SignUpCustomer({navigation, route}) {
  const user = route.params?.user;
  const {userdetails, setuserdetails} = useContext(CartProvider);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  // Checking Validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email Address is Required')
      .email('Please enter valid email'),
    password: Yup.string()
      .required('Password is Required')
      .min(6, 'Password Should be greater than 6 letters'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
    firstname: Yup.string().required('First Name is Required'),

    lastname: Yup.string().required('Last Name is Required'),
    PhoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'too short')
      .max(11, 'too long'),
  });

  const handleSignUp = async (
    email,
    password,
    firstname,
    lastname,
    confirmpassword,
    PhoneNumber,
  ) => {
    var userData = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      confirmPassword: confirmpassword,
      role: route.params?.user,
      active: 'active',
      phonenumber: PhoneNumber,
      shopaddress: null,
      permanentaddress: null,
      cnic: null,
      telephonenumber: null,
    };

    try {
      const result = await axios.post(
        `${port.herokuPort}/users/signup`,
        userData,
      );
      console.log(result.data.data.user);

      setuserdetails(result.data.data.user);
      navigation.navigate('CustomerInterface');
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <ScrollView>
      <View style={{alignItems: 'center', marginTop: 50}}>
        {/* <Icon
          style={{margin: 10, justifyContent: 'center', color: '#1DA1F2'}}
          name="car"
          size={25}
        /> */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            marginTop: 40,
            color: Font.TextColor,
          }}>
          {user} <Text style={{color: '#8739F9'}}>SignUp</Text>
        </Text>
      </View>

      <Formik
        validationSchema={validationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          handleSignUp(
            values.email,
            values.password,
            values.firstname,
            values.lastname,
            values.confirmPassword,
            values.PhoneNumber,
          );
          console.log(values);
        }}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          <>
            <TextInput
              name="firstname"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="First Name"
              onChangeText={handleChange('firstname')}
            />

            {errors.firstname && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.firstname}
              </Text>
            )}

            <TextInput
              name="lastname"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="Last Name"
              onChangeText={handleChange('lastname')}
            />
            {errors.lastname && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.lastname}
              </Text>
            )}

            <TextInput
              name="email"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="Email E.g name@account.com"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
            />

            {errors.email && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.email}
              </Text>
            )}

            <TextInput
              name="password"
              style={styles.inputText}
              secureTextEntry={true}
              placeholderTextColor={Font.placeholder}
              placeholder="Password must be greater than 6 letters"
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {errors.password && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.password}
              </Text>
            )}

            <TextInput
              name="confirmPassword"
              style={styles.inputText}
              secureTextEntry={true}
              placeholderTextColor={Font.placeholder}
              placeholder="Confirmed Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />
            {errors.confirmPassword && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.confirmPassword}
              </Text>
            )}

            <TextInput
              name="PhoneNumber"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="Phone Number"
              onChangeText={handleChange('PhoneNumber')}
            />

            {errors.PhoneNumber && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.PhoneNumber}
              </Text>
            )}

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                disabled={!isValid}
                title="Submit"
                style={{
                  padding: 10,
                  backgroundColor: isValid ? '#8739F9' : 'grey',
                  width: '90%',
                  alignItems: 'center',
                  // borderRadius: '50%',
                  marginTop: 10,
                }}
                onPress={handleSubmit}>
                <Text style={{color: 'white', fontWeight: '500'}}>SignUp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginBottom: 30}}
                onPress={() => {
                  navigation.navigate('Login', {user: user});
                }}>
                <Text style={{color: Font.TextBackground}}>
                  {'\n'} Already have an account?
                  <Text style={{color: '#8739F9'}}> Login</Text>{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      {/* <TextInput
        style={styles.inputText}
        placeholder="First Name"
        placeholderTextColor={Font.placeholder}
        onChangeText={value => setfirstname(value)}
      />

      <TextInput
        style={styles.inputText}
        placeholder="Last Name"
        placeholderTextColor={Font.placeholder}
        onChangeText={value => setlastname(value)}
      />

      <TextInput
        style={styles.inputText}
        placeholder="Email E.g name@account.com"
        placeholderTextColor={Font.placeholder}
        onChangeText={value => setemail(value)}
      />

      <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="Password must be greater than 6 letters"
        placeholderTextColor={Font.placeholder}
        onChangeText={value => setpassword(value)}
      />

      <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholder="Confirmed Password"
        placeholderTextColor={Font.placeholder}
        onChangeText={value => setconfirmpassword(value)}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#8739F9',
            width: '90%',
            alignItems: 'center',
            // borderRadius: '50%',
            marginTop: 10,
          }}
          onPress={() => {
            if (
              firstname != '' &&
              lastname != '' &&
              email != '' &&
              password != '' &&
              confirmpassword != ''
            ) {
              if (password.length > 6) {
                if (password == confirmpassword) {
                  handleSignUp();
                } else {
                  alert('Confirm password does not match');
                }
              } else {
                alert('Password must be greater than 6');
              }
            } else {
              alert('Enter all Fields');
            }
          }}>
          <Text style={{color: 'white', fontWeight: '500'}}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login', {user: user});
          }}>
          <Text style={{color: Font.TextBackground}}>
            {'\n'} Already have an account?
            <Text style={{color: '#8739F9'}}> Login</Text>{' '}
          </Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}

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
    color: 'black',
  },
});

export default SignUpCustomer;

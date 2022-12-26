import React, {useContext, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CartProvider from '../ContextApi/contextApi';
import port from '../Port/Port';
import Lottie from 'lottie-react-native';
import {io} from 'socket.io-client';
import {Font} from '../font/Font';
import {Formik} from 'formik';
import * as Yup from 'yup';

//It take user name from Welcome screen So that whether it is shopowner or Client and check their Account from database using If and else if statement
//SignIn have alert if user input wrong ID/Pass
//It send id,user,firstname,lastname to next dashboard. Id of the person which logged in

const SignIn = ({navigation, route}) => {
  const user = route.params?.user;
  const socket = useRef();

  const {userdetails, setuserdetails, setToken, setsocket} =
    useContext(CartProvider);
  // const [email, setemail] = React.useState();
  // const [password, setpassword] = React.useState();
  const [error, setError] = React.useState(false);

  // Checking Validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email Address is Required')
      .email('Please enter valid email'),
    password: Yup.string()
      .required('Password is Required')
      .min(6, 'Password Should be greater than 6 letters'),
  });

  const handleLogin = async (email, password) => {
    const userCredentials = {
      email: email,
      password: password,
    };

    console.log(port.herokuPort);
    try {
      const result = await axios.post(
        `${port.herokuPort}/users/signin`,
        userCredentials,
      );

      console.log(result.data.token);
      if (result.data.data.user.active === 'active') {
        if (result.data.data.user.role === 'ShopOwner') {
          if (user === 'ShopOwner') {
            try {
              const obj = {token: result.data.token, user: user};
              const jsonValue = JSON.stringify(obj);
              await AsyncStorage.setItem('@token', jsonValue);
            } catch (e) {
              console.log(e.response.data.message);
            }

            //Connecting user to Socket Server
            socket.current = io(`${port.socketPort}`);
            console.log('I am in shop owner');
            const obj = {current: socket.current};
            setsocket(obj);

            setuserdetails(result.data.data.user);
            setToken(result.data.token);
            navigation.navigate('ShopOwnerInterface');
          } else {
            setError(true);
          }
        } else if (result.data.data.user.role === 'Customer') {
          if (user === 'Customer') {
            try {
              const obj = {token: result.data.token, user: user};
              const jsonValue = JSON.stringify(obj);
              await AsyncStorage.setItem('@token', jsonValue);
            } catch (e) {
              console.log(e.response.data.message);
            }

            //Connecting user to Socket Server
            socket.current = io(`${port.socketPort}`);

            const obj = {current: socket.current};
            setsocket(obj);
            setuserdetails(result.data.data.user);
            console.log('The token' + result.data.token);
            setToken(result.data.token);
            navigation.navigate('CustomerInterface');
          } else {
            setError(true);
          }
        } else if (result.data.data.user.role === 'Mechanic') {
          if (user === 'Mechanic') {
            try {
              const obj = {token: result.data.token, user: user};
              const jsonValue = JSON.stringify(obj);
              setToken(result.data.token);
              await AsyncStorage.setItem('@token', jsonValue);
            } catch (e) {
              console.log(e.response.data.message);
            }

            //Connecting user to Socket Server
            socket.current = io(`${port.socketPort}`);

            const obj = {current: socket.current};
            setsocket(obj);
            setuserdetails(result.data.data.user);
            navigation.navigate('MechanicInterface');
          } else {
            setError(true);
          }
        }
      } else {
        alert('Your request is in ' + result.data.data.user.active + ' state');
      }
    } catch (err) {
      // alert(err.response.data.message);
      console.log(err.response.data.message);
      setError(true);
      // setCredentialValidation(err.response.data.message);
    }
  };
  const ShowError = () => {
    setTimeout(() => {
      setError(false);
    }, 1100);
    return (
      <View>
        <Lottie
          style={{
            width: 120,
            height: 180,
            marginTop: -110,
          }}
          source={require('../../assets/cross 2.json')}
          autoPlay
          loop
        />
        <Text style={{marginTop: -107, color: 'red'}}>
          Incorrect Email or Password
        </Text>
      </View>
    );
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
          {user} <Text style={{color: '#8739F9'}}>Login</Text>
        </Text>
      </View>

      <Formik
        validationSchema={validationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          handleLogin(values.email, values.password);

          console.log(values);
        }}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          <>
            <View style={{marginTop: 10}}>
              <TextInput
                name="email"
                style={styles.inputText}
                placeholder="Enter Email"
                placeholderTextColor={Font.placeholder}
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
                secureTextEntry={true}
                style={styles.inputText}
                placeholder="Enter Password"
                placeholderTextColor={Font.placeholder}
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
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity
                disabled={!isValid}
                title="Submit"
                style={{
                  padding: 10,
                  backgroundColor: isValid ? '#8739F9' : 'grey',
                  width: '90%',
                  alignItems: 'center',
                  // borderRadius: '50%',
                  margin: 10,
                }}
                onPress={handleSubmit}>
                <Text style={{color: 'white', fontWeight: '500'}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  alert('Under Development');
                }}>
                <Text style={{color: '#8739F9'}}>Forgetten Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log(user);
                  if (user === 'Customer') {
                    navigation.navigate('SignUpCustomer', {user: user});
                  } else {
                    navigation.navigate('SignUp', {user: user});
                  }
                }}>
                <Text style={{color: Font.TextBackground}}>
                  {'\n'} Don't have an account?
                  <Text style={{color: '#8739F9'}}> SignUp</Text>{' '}
                </Text>
              </TouchableOpacity>

              {error ? ShowError() : null}
            </View>
          </>
        )}
      </Formik>
      {/* <TextInput
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
        /> */}

      {/* <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#8739F9',
            width: '90%',
            alignItems: 'center',
            // borderRadius: '50%',
            margin: 10,
          }}
          onPress={() => {
            handleLogin();
          }}>
          <Text style={{color: 'white', fontWeight: '500'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert('Under Development');
          }}>
          <Text style={{color: '#8739F9'}}>Forgetten Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log(user);
            if (user === 'Customer') {
              navigation.navigate('SignUpCustomer', {user: user});
            } else {
              navigation.navigate('SignUp', {user: user});
            }
          }}>
          <Text style={{color: Font.TextBackground}}>
            {'\n'} Don't have an account?
            <Text style={{color: '#8739F9'}}> SignUp</Text>{' '}
          </Text>
        </TouchableOpacity>

        {error ? ShowError() : null}
      </View> */}
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
    color: 'black',
  },
});

export default SignIn;

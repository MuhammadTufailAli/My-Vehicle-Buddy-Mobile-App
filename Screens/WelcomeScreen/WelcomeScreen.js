import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import Loader from '../Loader/Loader';
import {Font} from '../font/Font';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartProvider from '../ContextApi/contextApi';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Lottie from 'lottie-react-native';
import port from '../Port/Port';

import {io} from 'socket.io-client';

//Have background image with 3 buttons to go to 3 users of App
const WelcomeScreen = ({navigation}) => {
  const {
    userdetails,
    setuserdetails,
    setToken,
    userSecret,
    setUserSecret,
    setsocket,
  } = useContext(CartProvider);
  const isFocused = useIsFocused();
  const socket = useRef();

  const [getcondition, setcondition] = useState(true);

  const CheckIfUserIsAuthentic = async () => {
    //Connecting user to Socket Server
    socket.current = io(`${port.socketPort}`);

    const obj = {current: socket.current};
    setsocket(obj);
    try {
      var jsonValue = await AsyncStorage.getItem('@token');

      if (jsonValue === null) {
        setUserSecret({});
      } else {
        //Getting Data of user from backend
        var value = JSON.parse(jsonValue);
        const token = value.token;

        setToken(token);
        var decoded = jwt_decode(token);

        try {
          const result = await axios.get(
            `${port.herokuPort}/users/singleUser/${decoded.id}`,
          );

          setuserdetails(result.data.data.doc);
          //setUserSecret k andar token ha or user ha jo batata ha k user shopOwer ha ya koi or
          setUserSecret(value);
        } catch (err) {
          console.log('I am in error');
          console.log(err);
        }
      }

      setcondition(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isFocused && CheckIfUserIsAuthentic();
  }, [isFocused]);

  //To connect to server using socket io
  // useEffect(() => {

  // },[])

  if (getcondition) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Loader />
        <Text
          style={{
            marginTop: -130,
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 10,
            color: Font.LabelColor,
          }}>
          Fetching Data for You
        </Text>
      </View>
    );
  } else {
    if (Object.keys(userSecret).length !== 0) {
      if (userSecret.user === 'ShopOwner') {
        return <View>{navigation.navigate('ShopOwnerInterface')}</View>;
      } else if (userSecret.user === 'Customer') {
        return <View>{navigation.navigate('CustomerInterface')}</View>;
      } else {
        return <View>{navigation.navigate('MechanicInterface')}</View>;
      }
    } else {
      return (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 1}}>
                <Lottie
                  style={styles.Loader}
                  source={require('../../assets/Shop Owner.json')}
                  autoPlay
                  loop
                />
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#8739F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Login', {user: 'ShopOwner'});
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#f0f0f0',
                    }}>
                    Enter As Shop Owner{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#8739F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Login', {user: 'Customer'});
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#f0f0f0',
                    }}>
                    Enter As Customer
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <Lottie
                  style={{
                    width: 190,
                    height: 230,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/User 2.json')}
                  autoPlay
                  loop
                />
              </View>
            </View>
          </View>

          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 1}}>
                <Lottie
                  style={{
                    width: 170,
                    height: 210,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/Mechanic.json')}
                  autoPlay
                  loop
                />
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#8739F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Login', {user: 'Mechanic'});
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#f0f0f0',
                    }}>
                    Enter As Mechanic
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  Loader: {
    width: 200,
    height: 240,
    marginLeft: -10,
  },
  button: {
    padding: 10,

    backgroundColor: Font.LabelColor,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    elevation: 8,
    // alignItems: 'center',
    // borderRadius: '50%',

    // width: '55%',
    // marginTop: -190,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default WelcomeScreen;

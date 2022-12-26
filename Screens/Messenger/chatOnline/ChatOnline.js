import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import port from '../../Port/Port';
import {Font} from '../../font/Font';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import CartProvider from '../../ContextApi/contextApi';

const ChatOnline = ({onlineUsers, navigation}) => {
  console.log(onlineUsers);
  const {userdetails, setuserdetails, token, socket} = useContext(CartProvider);
  const [allUsers, setAllusers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [cond, setCond] = useState(true);

  const getData = () => {
    axios
      .get(`${port.herokuPort}/users/allUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setAllusers(res.data.data.doc);
        // console.log(res.data.data.doc);
        setCond(false);
      })
      .catch(err => {
        // setauthCondition(false);
        console.log(err);
      });
  };

  const handleClick = async user => {
    try {
      const result = await axios.get(
        `${port.herokuPort}/conversation/find/${userdetails._id}/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result.data.data) {
        navigation.navigate('ChatScreen', {currentChat: result.data.data});
      } else {
        const userDetails = {
          senderId: userdetails._id,
          receiverId: user._id,
        };
        try {
          const result = await axios.post(
            `${port.herokuPort}/conversation`,
            userDetails,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          navigation.navigate('ChatScreen', {currentChat: result.data});
        } catch (err) {
          console.log(err);
          alert('Error');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Get all Users
  useEffect(() => {
    getData();
  }, [userdetails._id]);

  //Find Online Users

  useEffect(() => {
    var tempOnlineUser = [];
    var count = 0;

    allUsers.map(f => {
      onlineUsers.map(o => {
        if (o.userId === f._id) {
          tempOnlineUser[count] = f;
          count++;
        }
      });
    });

    setOnlineFriends(tempOnlineUser);
  }, [allUsers, onlineUsers]);

  if (cond) {
    return (
      <View>
        <Text>Please wait</Text>
      </View>
    );
  } else {
    if (Object.keys(onlineFriends).length === 1) {
      return (
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
          <Lottie
            style={{
              width: 50,
              height: 50,
            }}
            source={require('../../../assets/offline.json')}
            autoPlay
            loop
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: 'red',
              fontFamily: 'Lexend-Regular',
              fontWeight: '400',
            }}>
            No one is online
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <Lottie
            style={{
              width: 50,
              height: 50,
              marginTop: -10,
            }}
            source={require('../../../assets/Online.json')}
            autoPlay
            loop
          />
          {onlineFriends.map(o => {
            if (o._id !== userdetails._id) {
              return (
                <View style={{marginLeft: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      handleClick(o);
                    }}>
                    <Image
                      source={{
                        uri: o.photoUrl,
                      }}
                      style={{
                        width: 50,
                        height: 50,

                        borderRadius: 90 / 2,
                      }}
                    />
                    <Text
                      style={{
                        backgroundColor: 'white',
                        width: 12,
                        height: 12,
                        borderRadius: 50,
                        marginTop: -10,
                        marginLeft: 35,
                        fontFamily: 'Lexend-Regular',
                        fontWeight: '400',
                      }}></Text>
                    <Text
                      style={{
                        backgroundColor: '#31a24c',
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        marginTop: -11,
                        marginLeft: 36,
                        fontFamily: 'Lexend-Regular',
                        fontWeight: '400',
                      }}></Text>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: Font.TextColor,
                        fontFamily: 'Lexend-Regular',
                        fontWeight: '400',
                      }}>
                      {o?.firstname}
                    </Text>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: -4,
                        color: Font.TextColor,
                        fontFamily: 'Lexend-Regular',
                        fontWeight: '400',
                      }}>
                      {o?.lastname}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
        </View>
      );
    }
  }
};

export default ChatOnline;

import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
  Linking,
  Platform,
  BackHandler,
} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from '@react-native-community/geolocation';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import port from '../Port/Port';
import CartProvider from '../ContextApi/contextApi';
import {Font} from '../font/Font';
import MapView, {Marker} from 'react-native-maps';
import {getDistance} from 'geolib';

const MechanicComingToCustomerScreen = ({navigation, route}) => {
  console.log(route.params);
  const {userdetails, socket, token} = useContext(CartProvider);
  const [Mechanicposition, setMechanicPosition] = useState(
    route.params?.mechanicPosition,
  );
  const [customerId, setCustomerId] = useState(route.params?.receiverId);
  const [Customerposition, setCustomerPosition] = useState(
    route.params?.customerposition,
  );
  const [address, setAddress] = useState(route.params?.Location);
  const [price, setPrice] = useState(route.params?.price);
  const [description, setdescription] = useState(route.params?.description);
  const [modalVisible, setModalVisible] = useState(false);

  //When click back button delete notification
  function handleBackButtonClick() {
    console.log('Back button is pressed');
    navigation.navigate('Welcome');

    return true;
  }

  //When click back button delete notification
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  //Make call on mobile

  const makeCall = () => {
    let phoneNumber = '';
    console.log('Customer Number is');
    console.log(route.params?.CustomerNumber);

    if (Platform.OS === 'android') {
      const number = 'tel:0' + route.params?.CustomerNumber;
      phoneNumber = number;
    } else {
      const number = 'telprompt:0' + route.params?.CustomerNumber;
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  //Finding if chat already exists
  const findConversation = () => {
    axios
      .get(
        `${port.herokuPort}/conversation/find/${userdetails._id}/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        if (res.data.data) {
          console.log('Conversation found');
          navigation.navigate('ChatScreen', {currentChat: res.data.data});
        } else {
          console.log('Not Conversation found');
          const userDetails = {
            senderId: userdetails._id,
            receiverId: customerId,
          };
          axios
            .post(`${port.herokuPort}/conversation`, userDetails, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(res => {
              navigation.navigate('MechanicChatScreen', {
                currentChat: res.data,
              });
            })
            .catch(err => {
              // setauthCondition(false);
              console.log(err);
            });
        }
      })
      .catch(err => {
        // setauthCondition(false);
        console.log(err.response.data);
      });
  };

  const getLiveLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setMechanicPosition({
          latitude: parseFloat(JSON.stringify(pos.coords.latitude)),
          longitude: parseFloat(JSON.stringify(pos.coords.longitude)),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });

        socket.current.emit('sendMechanicLiveLocation', {
          senderId: route.params.senderId,
          receiverId: route.params.receiverId,
          mechanicLocation: Mechanicposition,
        });
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  //har 4 second bad useEffect call ho ga or huma current location mila gi mechanic ki
  useEffect(() => {
    var distance = getDistance(
      {
        latitude: Mechanicposition?.latitude,
        longitude: Mechanicposition?.longitude,
      },
      {
        latitude: Customerposition?.latitude,
        longitude: Customerposition?.longitude,
      },
    );
    console.log('The distance is ');
    console.log(distance);
    if (distance > 400) {
      const interval = setInterval(() => {
        getLiveLocation();
      }, 4000);
      return () => clearInterval(interval);
    } else {
      setModalVisible(true);

      socket.current.emit('sendIamReached', {
        senderId: route.params.senderId,
        receiverId: route.params.receiverId,
      });
    }
  });

  return (
    <View style={{flex: 1}}>
      {/* Modal For mechanic */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                marginTop: 8,
                alignItems: 'flex-end',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MechanicInterface');
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: Font.ButtonColor,
                    marginRight: 15,
                    fontWeight: '600',
                  }}>
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, flex: 5}}>
              <View style={{flex: 1}}>
                <View style={{alignItems: 'center', flex: 1}}>
                  <Text style={{color: 'white', fontSize: 18}}>
                    You reached Customer Location !!!
                  </Text>
                  <Text style={{color: Font.LabelColor}}>
                    Do you want to chat or call ?{' '}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: '#1c1f24',
                    flexDirection: 'row',
                    borderRadius: 15,
                  }}>
                  {/* Increase or decrease money */}

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Font.ButtonColor,
                        width: '80%',
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        findConversation();
                      }}>
                      <MaterialIcons name={'chat'} size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,

                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'green',
                        width: '80%',
                        height: 50,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        makeCall();
                      }}>
                      <Ionicons name={'call'} size={30} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Top bar */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: Font.ButtonColor,
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
              navigation.navigate('MechanicInterface');
            }}>
            <AntDesign name={'left'} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Going to customer</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MechanicInterface');
            }}>
            <Text style={{marginRight: 8, color: 'white'}}> Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Map With searching */}
      <View style={{flex: 7}}>
        <MapView
          style={{flex: 1}}
          initialRegion={Mechanicposition}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}>
          <Marker
            title="Yor are here"
            //  description='This is a description'
            coordinate={Mechanicposition}>
            <FontAwesome5 name="tools" size={28} color={Font.ButtonColor} />
          </Marker>
          <Marker
            title="Customer is here"
            //  description='This is a description'
            coordinate={Customerposition}
          />
          <MapViewDirections
            origin={Mechanicposition}
            destination={Customerposition}
            apikey={'AIzaSyDNY3hGEJG1sMAJi0SbK-zBR1W_th9D7co'}
            strokeColor={Font.LabelColor}
            strokeWidth={3}
          />
        </MapView>
      </View>
      {/* Bottom Bar */}
      <View
        style={{
          flex: 3,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#323943',
        }}>
        <View style={{flex: 3, margin: 15}}>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
            <FontAwesome5
              name={'tasks'}
              size={22}
              color={Font.ButtonColor}
              style={{flex: 1}}
            />
            <Text
              style={{
                flex: 6,
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {description}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
            <MaterialIcons
              name={'location-on'}
              size={22}
              color={Font.ButtonColor}
              style={{flex: 1}}
            />
            <Text style={{flex: 6, color: 'white', fontSize: 16}}>
              {address}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FontAwesome5
              name={'money-bill-wave'}
              size={20}
              color={Font.ButtonColor}
              style={{flex: 1}}
            />
            <Text style={{flex: 6, color: 'white', fontSize: 16}}>
              PKR{' '}
              <Text style={{color: Font.ButtonColor, fontWeight: 'bold'}}>
                {price}
              </Text>
              , cash
            </Text>
          </View>
        </View>
        {/* Current Affairs */}
        <View
          style={{flex: 2, backgroundColor: '#1c1f24', flexDirection: 'row'}}>
          {/* Increase or decrease money */}

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Font.ButtonColor,
                width: '80%',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                findConversation();
              }}>
              <MaterialIcons name={'chat'} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,

              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                width: '80%',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                makeCall();
              }}>
              <Ionicons name={'call'} size={30} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MechanicComingToCustomerScreen;

const styles = StyleSheet.create({
  text: {
    color: 'white',

    fontSize: 18,
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  modalView: {
    flex: 0.4,

    backgroundColor: '#1c1c1e',
    borderRadius: 15,

    justifyContent: 'center',

    width: '100%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText3: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextColor: {
    color: Font.TextBackground,
  },
});

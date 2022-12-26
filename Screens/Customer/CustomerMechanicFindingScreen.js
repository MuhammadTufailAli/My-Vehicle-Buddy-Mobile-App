import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  FlatList,
  TextInput,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import port from '../Port/Port';
import CartProvider from '../ContextApi/contextApi';
import {Font, Commonstyles} from '../font/Font';
import MapView, {Marker} from 'react-native-maps';
import {Rating, AirbnbRating} from 'react-native-ratings';

const CustomerMechanicFindingScreen = ({navigation, route}) => {
  const {userdetails, socket, setOnlineMechanic, globalCustomerCondition} =
    useContext(CartProvider);
  const [position, setPosition] = useState(route.params?.position);
  const [address, setAddress] = useState(route.params?.address);
  const [price, setPrice] = useState(route.params?.price);
  const [description, setdescription] = useState(route.params?.description);
  const [condition, setCondition] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [getMechanicOfferCondition, setgetMechanicOfferCondition] =
    useState(true);

  //Generate customer mechanic notification after customer accept mechanic req
  const CustomerMechanicNotification = async (
    id,
    latitude,
    longitude,
    mechanicPhoneNumber,
  ) => {
    const requestDetails = {
      price: price,
      latitude: position.latitude,
      longitude: position.longitude,
      Description: route.params?.description,
      refOfCustomer: userdetails?._id,
      refOfMechanic: id,
    };

    try {
      const result = await axios.post(
        `${port.herokuPort}/CustomerMechanicAfterAcceptingNotification/PostNotification`,
        requestDetails,
      );
      const customerNotificationId = result.data.data.doc._id;

      const requestDetails2 = {
        price: price,
        latitude: position.latitude,
        longitude: position.longitude,
        Description: route.params?.description,
        refOfCustomer: userdetails?._id,
        refOfMechanic: id,
        refOfCustomerNotification: result.data.data.doc._id,
      };
      try {
        const result = await axios.post(
          `${port.herokuPort}/MechanicAfterAcceptingNotification/PostNotification`,
          requestDetails2,
        );

        const mechanicNotificationId = result.data.data.doc._id;
        console.log(result.data.data.doc._id);
        deleteNotification2(
          id,
          latitude,
          longitude,
          customerNotificationId,
          result.data.data.doc._id,
          mechanicPhoneNumber,
        );
      } catch (err) {
        alert(err.response.data.message);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  //Update request send to mechanic
  const updateMechanicReq = async () => {
    const requestDetails = {
      price: price,
    };

    try {
      const result = await axios.patch(
        `${port.herokuPort}/MechanicNotificationRoute/updateNotification/${route.params?.mechanicNotificationId}`,
        requestDetails,
      );

      socket.current.emit('sendUpdatedPrice', {
        senderId: userdetails._id,
        price: price,
      });
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  //Delete Notification after accepting request by customer
  const deleteNotification2 = async (
    id,
    latitude,
    longitude,
    notificationID,
    mechanicnotificationID,
    mechanicPhoneNumber,
  ) => {
    socket.current.emit('SendResponseTomechanicOffer', {
      response: 'Accepted',
      receiverId: id,
      senderId: userdetails._id,
    });
    try {
      const result = await axios.delete(
        `${port.herokuPort}/MechanicNotificationRoute/deleteNotification/${route.params?.mechanicNotificationId}`,
      );

      //Ab hum socket ma jo notificatio del karni ha us ki id send kara gaMechanicPosition
      //Or mechanic home ma us id ki madad sa array ma sa vo notification
      //delete kar da ga real time ma
      socket.current.emit('deleteCustomerNotification2', {
        id: id,
      });

      //Notification Accept hona k bad map wali screen pa move kar jao
      const MechanicPosition = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };

      navigation.navigate('CustomerMechanicComingScreen', {
        customerposition: position,
        Location: address,
        price: price,
        mechanicPosition: MechanicPosition,
        description: description,
        notificationId: notificationID,
        mechanicnotificationID: mechanicnotificationID,
        receiverId: id,
        mechanicNumber: mechanicPhoneNumber,
      });
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };
  //Delete Customer Notification of getting mechanic

  const deleteNotification = async () => {
    try {
      const result = await axios.delete(
        `${port.herokuPort}/MechanicNotificationRoute/deleteNotification/${route.params?.mechanicNotificationId}`,
      );

      //Ab hum socket ma jo notificatio del karni ha us ki id send kara ga
      //Or mechanic home ma us id ki madad sa array ma sa vo notification
      //delete kar da ga real time ma
      socket.current.emit('deleteCustomerNotification', {
        id: route.params?.mechanicNotificationId,
      });

      navigation.goBack();
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  //Get request accepted from mechanic
  const getRequestAcceptedByMechanic = async () => {
    try {
      const result = await axios.get(
        `${port.herokuPort}/MechanicNotificationRoute/getNotification/${route.params?.mechanicNotificationId}`,
      );

      console.log(result.data.data);
      setCondition(false);
    } catch (err) {
      console.log(err);
      alert('Error');
    }
  };

  //When click back button delete notification
  function handleBackButtonClick() {
    console.log('Back button is pressed');
    deleteNotification();

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

  // useEffect(() => {
  //   getRequestAcceptedByMechanic();
  // }, [price]);

  //Get mechanic notification using mechanic
  useEffect(() => {
    socket.current.on('getNotification', data => {
      console.log(arrivalMessage.length);
      console.log(getMechanicOfferCondition);
      // if (getMechanicOfferCondition) {
      console.log('I am in side Customer notification');
      console.log(data.price);
      setArrivalMessage(arrivalMessage => [
        ...arrivalMessage,
        {
          sender: data.senderId,
          latitude: data.latitude,
          longitude: data.longitude,
          price: data.price,
          createdAt: Date.now(),
        },
      ]);

      setgetMechanicOfferCondition(false);
      // }
    });
  }, []);
  return (
    <View style={{flex: 1}}>
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
              deleteNotification();
            }}>
            <AntDesign name={'left'} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Finding Mechanics</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              deleteNotification();
            }}>
            <Text
              style={{
                marginRight: 8,
                color: 'white',
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
              {' '}
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Map With searching */}
      <View style={{flex: 7}}>
        <MapView
          style={{flex: 1}}
          initialRegion={position}
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
            coordinate={position}
          />
        </MapView>
        {arrivalMessage.length === 0 ? (
          <View
            style={{
              position: 'absolute',
              top: -50,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Lottie
              style={{
                marginTop: 20,
                width: 320,
                height: 380,
                alignSelf: 'center',
              }}
              source={require('../../assets/searchmechanic.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <ScrollView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            {arrivalMessage.map((req, index) => {
              return (
                <View
                  style={{
                    height: 120,

                    width: '95%',
                    margin: 10,
                    backgroundColor: '#272c32',
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1.8,
                    }}>
                    <View
                      style={{
                        flex: 1.3,

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{
                          uri: req?.sender.photoUrl,
                        }}
                        style={{
                          width: 40,
                          height: 40,

                          borderRadius: 90 / 2,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 3,

                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          fontWeight: '700',
                          fontFamily: 'Lexend-Regular',
                        }}>
                        {req.sender.firstname} {req.sender.lastname}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Lexend-Regular',
                          fontWeight: '400',
                        }}>
                        {req.sender.role}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Rating
                          type="star"
                          ratingCount={5}
                          imageSize={12}
                          readonly
                          tintColor="#272c32"
                          startingValue={req.sender.ratingsAverage}
                        />
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'white',
                            marginLeft: 2,
                            fontFamily: 'Lexend-Regular',
                            fontWeight: '400',
                          }}>
                          {req.sender.ratingsAverage}/5 (
                          {req.sender.ratingQuantity})
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1.5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: Font.ButtonColor,
                          fontSize: 18,
                          fontWeight: 'bold',
                          fontFamily: 'Lexend-Regular',
                        }}>
                        PKR {req.price}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1.3,

                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('Decline is pressedddddddddddddd');
                        const touched = index;
                        const newarr = arrivalMessage.filter((data, index) => {
                          return index !== touched;
                        });

                        setArrivalMessage(newarr);

                        socket.current.emit('SendResponseTomechanicOffer', {
                          response: 'Decline',
                          receiverId: req.sender._id,
                          senderId: userdetails._id,
                        });
                      }}
                      style={{
                        marginTop: 7,
                        width: 100,
                        height: 40,
                        backgroundColor: '#323943',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          fontFamily: 'Lexend-Regular',
                          fontWeight: '400',
                        }}>
                        Decline
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        CustomerMechanicNotification(
                          req.sender._id,
                          req.latitude,
                          req.longitude,
                          req?.sender?.phonenumber,
                        );
                      }}
                      style={{
                        marginTop: 7,
                        width: 100,
                        height: 40,
                        backgroundColor: Font.ButtonColor,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Lexend-Regular',
                          fontWeight: '400',
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
      {/* Bottom Bar */}
      <View
        style={{
          flex: 6,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#323943',
        }}>
        <View style={{flex: 1, margin: 15}}>
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
                fontSize: 16,
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
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
            <Text
              style={{
                flex: 6,
                color: 'white',
                fontSize: 16,
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
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
            <Text
              style={{
                flex: 6,
                color: 'white',
                fontSize: 16,
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
              PKR{' '}
              <Text
                style={{
                  color: Font.ButtonColor,
                  fontWeight: 'bold',
                  fontFamily: 'Lexend-Regular',
                }}>
                {price}
              </Text>
              , cash
            </Text>
          </View>
        </View>
        {/* Current Affairs */}
        <View style={{flex: 2, backgroundColor: '#1c1f24'}}>
          <View
            style={{
              alignItems: 'center',

              flex: 1,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
              Current fare
            </Text>
          </View>
          {/* Increase or decrease money */}
          <View
            style={{
              flex: 1.8,

              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Font.ButtonColor,
                  width: 80,
                  height: 45,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  var NewNumber = parseInt(price);
                  if (NewNumber > 1) {
                    NewNumber = NewNumber - 5;
                    const displayNumber = NewNumber.toString();
                    setPrice(displayNumber);
                  } else {
                    alert('Quantity Must be atleast 1');
                  }
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Lexend-Regular',
                    fontWeight: '400',
                  }}>
                  -5
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Lexend-Regular',
                  fontWeight: '400',
                }}>
                PKR {price}
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: Font.ButtonColor,
                  width: 80,
                  height: 45,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  var NewNumber = parseInt(price);
                  if (NewNumber > 1) {
                    NewNumber = NewNumber + 5;
                    const displayNumber = NewNumber.toString();
                    setPrice(displayNumber);
                  } else {
                    alert('Quantity Must be atleast 1');
                  }
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Lexend-Regular',
                    fontWeight: '400',
                  }}>
                  +5
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              flex: 1.4,

              justifyContent: 'center',
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
                updateMechanicReq();
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Lexend-Regular',
                  fontWeight: '400',
                }}>
                Send Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomerMechanicFindingScreen;

const styles = StyleSheet.create({
  text: {
    color: 'white',

    fontSize: 18,
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
  },
});

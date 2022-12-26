import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  Modal,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Font, Commonstyles} from '../font/Font';
import {Table, Row, Rows} from 'react-native-table-component';
import port from '../Port/Port';
import CartProvider from '../ContextApi/contextApi';
import axios from 'axios';
import {getDistance} from 'geolib';
import Lottie from 'lottie-react-native';

const MechanicHome = ({navigation}) => {
  const isFocused = useIsFocused();
  const {userdetails, socket, setOnlineMechanic, setOnlineUsers} =
    useContext(CartProvider);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState();
  const [cond, setCond] = useState(true);
  const [condition, setCondition] = useState(true);
  const [address, setAddress] = useState('');
  const [dataarray, setdataarray] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [filteredArrayAfterDelete, setfilteredArrayAfterDelete] = useState([]);
  const [positionIsUpdated, setpositionIsUpdated] = useState(true);

  const [conditionTodisplayOneTime, setConditionTodisplayOneTime] =
    useState(true);

  const [position, setPosition] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  //Reject User Request
  const rejectRequest = async () => {
    const newarray = dataarray[index].RejectedByUser;
    const otherArray = [...newarray, userdetails._id];
    console.log(index);

    const updateNotification = {
      RejectedByUser: otherArray,
    };

    try {
      const result = await axios.patch(
        `${port.herokuPort}/MechanicNotificationRoute/updateNotification/${dataarray[index]?._id}`,
        updateNotification,
      );

      setdataarray(dataarray.filter((item, i) => i !== index));

      // console.log(result.data.data);
    } catch (err) {
      console.log(err.response.data);
      alert('Error');
    }
  };

  //Get All request from users
  const getRequestFromCustomer = async () => {
    console.log('I am again getting notification');
    try {
      const result = await axios.get(
        `${port.herokuPort}/MechanicNotificationRoute/getNotification`,
      );

      const FilteredNotification = result.data.data.filter(val => {
        if (!val.RejectedByUser.includes(userdetails._id)) {
          if (val.status === 'Pending') {
            const distance =
              getDistance(
                {
                  latitude: position?.latitude,
                  longitude: position?.longitude,
                },
                {
                  latitude: val?.latitude,
                  longitude: val?.longitude,
                },
              ) / 1000;

            if (distance <= 6) {
              return val;
            }
          }
        }
      });

      console.log('Weee got tttttheeeeee filtered notification');

      setdataarray(FilteredNotification);
      setCondition(false);
    } catch (err) {
      console.log(err);
      alert('Error');
    }
  };

  //Getting mechanic Coordinates
  function getAddressFromCoordinates() {
    Geocoder.init('AIzaSyDNY3hGEJG1sMAJi0SbK-zBR1W_th9D7co');

    Geocoder.from(position.latitude, position.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);

        console.log('We are on last step');

        setCond(false);
      })
      .catch(error => console.warn(error));
  }

  //UseEffect Section

  // Getting Request from Customer
  useEffect(() => {
    socket.current.on('getNotificationFromMechanic', data => {
      if (conditionTodisplayOneTime) {
        console.log('Mechanic Got Notification from customer');
        Geolocation.getCurrentPosition(
          pos => {
            // const Lat = parseFloat(JSON.stringify(pos.coords.latitude));
            // const Long = parseFloat(JSON.stringify(pos.coords.longitude));

            const distance =
              getDistance(pos.coords, {
                latitude: data?.latitude,
                longitude: data?.longitude,
              }) / 1000;

            if (distance <= 6) {
              console.log('Iam inside distance');
              setArrivalMessage({
                _id: data._id,
                refOfCustomer: data.refOfCustomer,
                latitude: data.latitude,
                longitude: data.longitude,
                price: data.price,
                Location: data.Location,
                Description: data.Description,
                AcceptedByUser: data.AcceptedByUser,
                createdAt: Date.now(),
              });
            }
          },
          error =>
            Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
          {enableHighAccuracy: true},
        );

        //Is sa ya ho ga jab customerpost kara ga to cond true ho jay hi
        //True hona ki waja sa ik bar chla gi phr if k andar hum usa false kar da ga
        //Ta k vo 1 sa zayada bar na chl saka
        //Customer jab dubara post kara ga phe cond true ho jay gi
        setConditionTodisplayOneTime(false);
      }
    });
  }, []);

  //Deleting Customer notification in real time

  // useEffect(() => {
  //   socket.current.on('getIdToDeleteNotification', data => {
  //     console.log('Now the deleted notification will be remove from list');
  //     getRequestFromCustomer();
  //   });
  // }, []);

  //If there is change in arrival message then we will update our NOTIFICATIONS
  useEffect(() => {
    //currentChat?.members.includes(arrivalMessage.sender) is ka mtlb k jisa send kiya ha message sirf usa receive ho

    setdataarray(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    getRequestFromCustomer();
  }, [positionIsUpdated]);

  //Setting Current Location
  useEffect(() => {
    console.log('I am in useEffect to get location');
    Geolocation.getCurrentPosition(
      pos => {
        const Lat = parseFloat(JSON.stringify(pos.coords.latitude));
        const Long = parseFloat(JSON.stringify(pos.coords.longitude));
        setPosition({
          latitude: Lat,
          longitude: Long,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });

        //Adding to all users
        socket.current.emit('addUser', userdetails._id);
        socket.current.on('getUsers', users => {
          setOnlineUsers(users);
        });
        //Adding user to socket io and getting user from socket io
        socket.current.emit('addMechanic', {
          userId: userdetails._id,
          latitude: Lat,
          longitude: Long,
        });
        socket.current.on('getMechanic', users => {
          setOnlineMechanic(users);
        });

        //Converting Log and Lat in location
        getAddressFromCoordinates();

        //Getting all the customer requests
        setpositionIsUpdated(!positionIsUpdated);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  }, []);

  if (cond) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Lottie
          style={{
            marginTop: -30,
            width: '90%',
            height: '90%',
            alignSelf: 'center',
          }}
          source={require('../../assets/loader.json')}
          autoPlay
          loop
        />
        <Text
          style={{
            marginTop: -280,
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 10,
            paddingBottom: 80,
            color: Font.LabelColor,
            fontFamily: 'Lexend-Regular',
          }}>
          Fetching Data for You....
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        {/* Modal to delete notification  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={{justifyContent: 'flex-end', margin: 0}}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
            }}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  rejectRequest();
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 5,
                    fontSize: 18,
                    color: 'red',
                    paddingBottom: 8,
                    borderBottomWidth: 0.8,
                    borderColor: 'grey',
                    fontFamily: 'Lexend-Regular',
                    fontWeight: '400',
                  }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{flex: 1}}>
          <MapView
            style={{flex: 1.5}}
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
              coordinate={position}>
              <FontAwesome5 name="tools" size={28} color={Font.ButtonColor} />
            </Marker>
          </MapView>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Font.ButtonColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                fontFamily: 'Lexend-Regular',
              }}>
              Request From User
            </Text>
          </View>
          <View style={{flex: 5}}>
            {condition ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Lottie
                  style={{
                    marginTop: -30,
                    width: '90%',
                    height: '90%',
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/loader.json')}
                  autoPlay
                  loop
                />
                <Text
                  style={{
                    marginTop: -280,
                    fontSize: 16,
                    fontWeight: '700',
                    marginLeft: 10,
                    paddingBottom: 80,
                    color: Font.LabelColor,
                    fontFamily: 'Lexend-Regular',
                  }}>
                  Fetching Data for You....
                </Text>
              </View>
            ) : dataarray.length === 0 ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Lottie
                  style={{
                    // marginTop: -43,
                    width: 160,
                    height: 240,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/noReqFound.json')}
                  autoPlay
                  loop
                />
                <Text
                  style={{
                    // marginTop: -130,
                    fontSize: 16,
                    fontWeight: '700',
                    marginLeft: 10,
                    color: Font.LabelColor,
                    fontFamily: 'Lexend-Regular',
                  }}>
                  No Request Yet :(
                </Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={dataarray}
                  inverted={true}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          height: 140,
                          width: '95%',
                          margin: 10,
                          backgroundColor: '#323943',
                          borderRadius: 8,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            const pos = {
                              latitude: item.latitude,
                              longitude: item.longitude,
                              latitudeDelta: 0.001,
                              longitudeDelta: 0.001,
                            };

                            navigation.navigate('MechanicSelectingCustomer', {
                              Customerposition: pos,
                              MechanicPosition: position,
                              address: item.Location,
                              price: item.price,
                              description: item.Description,
                              mechanicNotificationId: item._id,
                              CustomerId: item.refOfCustomer._id,
                              CustomerNumber: item.refOfCustomer?.phonenumber,
                            });
                          }}
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                          }}>
                          <View
                            style={{
                              flex: 1,

                              alignItems: 'center',
                              marginTop: 5,
                            }}>
                            <Image
                              source={{
                                uri: item?.refOfCustomer?.photoUrl,
                              }}
                              style={{
                                width: 50,
                                height: 50,

                                borderRadius: 90 / 2,
                              }}
                            />
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: '700',
                                fontFamily: 'Lexend-Regular',
                              }}>
                              {item?.refOfCustomer?.firstname}{' '}
                              {item?.refOfCustomer?.lastname}
                            </Text>
                            <Text
                              style={{
                                color: 'grey',
                                fontSize: 12,
                                fontFamily: 'Lexend-Regular',
                                fontWeight: '400',
                              }}>
                              {Math.round(
                                (Date.now() - item?.createdAt) / 60000,
                              )}{' '}
                              Mins ago
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 4,
                              marginTop: 5,
                              marginLeft: 5,
                              justifyContent: 'space-evenly',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '600',
                                fontFamily: 'Lexend-Regular',
                              }}>
                              {item?.Description}
                            </Text>
                            <Text
                              numberOfLines={3}
                              style={{
                                color: 'white',
                                fontSize: 16,
                                fontFamily: 'Lexend-Regular',
                                fontWeight: '400',
                              }}>
                              {item?.Location}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Font.ButtonColor,
                                fontWeight: '500',
                                fontFamily: 'Lexend-Regular',
                              }}>
                              PKR{item?.price}
                              <Text
                                style={{
                                  color: 'grey',
                                  fontFamily: 'Lexend-Regular',
                                  fontWeight: '400',
                                }}>
                                {' '}
                                ~{' '}
                                {item?.latitude
                                  ? Math.round(
                                      (getDistance(
                                        {
                                          latitude: position?.latitude,
                                          longitude: position?.longitude,
                                        },
                                        {
                                          latitude: item?.latitude,
                                          longitude: item?.longitude,
                                        },
                                      ) /
                                        1000) *
                                        10,
                                    ) / 10
                                  : null}{' '}
                                Km
                              </Text>
                            </Text>
                          </View>

                          <View
                            style={{
                              flex: 0.4,
                              backgroundColor: '#4c5e77',
                              borderTopRightRadius: 8,
                              borderBottomRightRadius: 8,
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setModalVisible(true);
                                setIndex(index);
                              }}
                              style={{
                                flex: 1,

                                justifyContent: 'flex-start',
                              }}>
                              <Entypo
                                name="circle-with-cross"
                                size={28}
                                color="red"
                              />
                            </TouchableOpacity>
                            <Entypo
                              style={{alignSelf: 'center'}}
                              name="dots-three-vertical"
                              size={28}
                              color="white"
                            />
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                              }}></View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            )}

            {/* {condition ? (
              <View>
                <Text>Please Wait</Text>
              </View>
            ) : (
              <View>
                <View>
                  <FlatList
                    data={dataarray}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{
                            margin: 10,
                            padding: 10,
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: 'grey',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={{
                                uri: item?.refOfCustomer.photoUrl,
                              }}
                              style={{
                                width: 40,
                                height: 40,

                                borderRadius: 90 / 2,
                              }}
                            />
                            <Text style={{fontWeight: 'bold', fontSize: 14}}>
                              {item?.refOfCustomer.firstname}{' '}
                              {item?.refOfCustomer.lastname}
                            </Text>
                          </View>
                          <View style={{flex: 3}}>
                            <Text>{item.Description}</Text>
                            <Text>{item.Location}</Text>
                            <Text>{item.price}</Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <TouchableOpacity
                                onPress={() => {
                                  acceptRequest(index);
                                }}>
                                <AntDesign
                                  style={{marginTop: 5, marginRight: 5}}
                                  name="checkcircle"
                                  size={22}
                                  color="green"
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  rejectRequest(index);
                                }}>
                                <Entypo
                                  style={{marginTop: 5}}
                                  name="circle-with-cross"
                                  size={22}
                                  color="red"
                                />
                              </TouchableOpacity>
                            </View>
                            <View>
                              <TouchableOpacity>
                                <MaterialCommunityIcons
                                  style={{marginTop: 5}}
                                  name="pencil"
                                  size={22}
                                  color="blue"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            )} */}
          </View>
        </View>
      </View>
    );
  }
};

export default MechanicHome;

const styles = StyleSheet.create({
  inputText: {
    padding: 7,
    borderBottomWidth: 0.3,
    marginLeft: 10,
    marginRight: 20,
    marginTop: 2,
    marginBottom: 2,
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
  },
  row: {height: 40, backgroundColor: '#E7E6E1'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, fontFamily: 'Lexend-Regular', fontWeight: '400'},
  modalView: {
    width: '96%',
    height: '15%',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#efefef',
    overflow: 'hidden',

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
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    color: Font.LabelColor,
  },
});

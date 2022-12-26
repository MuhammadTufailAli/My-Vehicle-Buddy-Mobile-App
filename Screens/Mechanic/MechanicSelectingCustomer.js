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
} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import port from '../Port/Port';
import CartProvider from '../ContextApi/contextApi';
import {Font, Commonstyles} from '../font/Font';
import MapView, {Marker} from 'react-native-maps';

const MechanicSelectingCustomer = ({navigation, route}) => {
  const {userdetails, socket, setOnlineMechanic, globalCustomerCondition} =
    useContext(CartProvider);
  const [Mechanicposition, setMechanicPosition] = useState(
    route.params?.MechanicPosition,
  );
  const [Customerposition, setCustomerPosition] = useState(
    route.params?.Customerposition,
  );
  const [address, setAddress] = useState(route.params?.address);
  const [price, setPrice] = useState(route.params?.price);
  const [description, setdescription] = useState(route.params?.description);
  const [condition, setCondition] = useState(true);
  const [buttonVisibilityCondition, setButtonVisibilityCondition] =
    useState(false);
  const [rejectionMessageCondition, setrejectionMessageCondition] =
    useState(true);

  const [updatedPriceCondition, setupdatedPriceCondition] = useState(true);

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

      alert('Successfull');
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  //Accept User Request
  const acceptRequest = async index => {
    socket.current.emit('sendToCustomer', {
      senderId: userdetails,
      receiverId: route.params.CustomerId,
      latitude: Mechanicposition.latitude,
      longitude: Mechanicposition.longitude,
      price: price,
    });
  };

  //Delete Customer Notification of getting mechanic

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

  // useEffect(() => {
  //   getRequestAcceptedByMechanic();
  // }, [price]);

  useEffect(() => {
    socket.current.on('getUpdatedPrice', data => {
      console.log('Updated price is', data.price);
      console.log(1);
      alert('Customer update price to ' + data.price);
      if (updatedPriceCondition) {
        setPrice(data.price);
        setupdatedPriceCondition(false);
      }
    });
  }, []);

  useEffect(() => {
    socket.current.on('getIdToDeleteNotification', data => {
      console.log('Customer Ended the request');
      alert('Customer Ended the request');
      navigation.goBack();
    });
  }, []);

  useEffect(() => {
    socket.current.on('getIdToDeleteNotification2', data => {
      console.log('Mechanic whose req is accepted is ', data.id);
      if (userdetails._id !== data.id) {
        console.log('Customer Ended the request');
        alert('Customer Ended the request');
        navigation.goBack();
      }
    });
  }, []);

  useEffect(() => {
    socket.current.on('getResponseFromCustomerTomechanicOffer', data => {
      // if (rejectionMessageCondition) {
      console.log(
        'The Response by Customer is ' +
          data.response +
          'gg' +
          rejectionMessageCondition,
      );
      if (data.response === 'Accepted') {
        console.log('ACEPTEDDDDDDDDD');
        navigation.navigate('MechanicComingToCustomerScreen', {
          mechanicPosition: Mechanicposition,
          customerposition: Customerposition,
          senderId: userdetails,
          receiverId: route.params.CustomerId,
          CustomerNumber: route.params.CustomerNumber,
          Location: address,
          price: price,
          description: description,
        });
        setrejectionMessageCondition(false);
      } else {
        alert('Customer decline your offer but you can send it again');
        setrejectionMessageCondition(false);
        setButtonVisibilityCondition(false);
      }

      setrejectionMessageCondition(false);
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
              navigation.goBack();
            }}>
            <AntDesign name={'left'} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Customer Request</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
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
            title="Yor are here"
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
          flex: 6,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#323943',
        }}>
        <View style={{flex: 1, margin: 15}}>
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
                  fontWeight: '400',
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
              Offer your fair
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
              disabled={buttonVisibilityCondition}
              style={
                buttonVisibilityCondition
                  ? {
                      backgroundColor: 'grey',
                      width: '80%',
                      height: 50,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : {
                      backgroundColor: Font.ButtonColor,
                      width: '80%',
                      height: 50,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
              }
              onPress={() => {
                acceptRequest();
                setButtonVisibilityCondition(true);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Lexend-Regular',
                  fontWeight: '400',
                }}>
                Accept for PKR{price}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MechanicSelectingCustomer;

const styles = StyleSheet.create({
  text: {
    color: 'white',

    fontSize: 18,
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
  },
});

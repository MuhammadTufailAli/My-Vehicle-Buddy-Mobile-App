import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Font} from '../font/Font';
import port from '../Port/Port';
import Lottie from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CartProvider from '../ContextApi/contextApi';
import axios from 'axios';

const CustomerMechanic = ({navigation}) => {
  const {userdetails, socket, onlineMechanic} = useContext(CartProvider);

  const [cond, setCond] = useState(true);
  const [price, setprice] = useState();
  const [description, setdescription] = useState();
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  function getAddressFromCoordinates() {
    Geocoder.init('AIzaSyDNY3hGEJG1sMAJi0SbK-zBR1W_th9D7co');

    Geocoder.from(position.latitude, position.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
        console.log(json.results[0]);
        setCond(false);
      })
      .catch(error => console.warn(error));
  }

  //Post req to find mechanic
  const FindMechanic = async () => {
    const requestDetails = {
      price: price,
      latitude: position.latitude,
      longitude: position.longitude,
      Description: description,

      refOfCustomer: userdetails?._id,
      Location: address,
      AcceptedByUser: [],
      createdAt: Date.now(),
    };

    try {
      const result = await axios.post(
        `${port.herokuPort}/MechanicNotificationRoute/PostNotification`,
        requestDetails,
      );
      const _id = result.data.data.doc._id;
      //Ya is liya kiya ha ta k customer ki notification ik bar mechanic ko show ho

      socket.current.emit('SendCustomerNotificationToAllMechanics', {
        _id: _id,
        price: price,
        latitude: position.latitude,
        longitude: position.longitude,
        Description: description,
        refOfCustomer: userdetails,
        Location: address,
        AcceptedByUser: [],
      });

      navigation.navigate('CustomerMechanicFindingScreen', {
        position: position,
        address: address,
        price: price,
        description: description,
        mechanicNotificationId: _id,
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: parseFloat(JSON.stringify(pos.coords.latitude)),
          longitude: parseFloat(JSON.stringify(pos.coords.longitude)),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
        console.log(parseFloat(JSON.stringify(pos.coords.latitude)));
        console.log(parseFloat(JSON.stringify(pos.coords.longitude)));
        getAddressFromCoordinates();
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
          }}>
          Fetching Data for You....
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
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
              title="Your current location"
              description="You are here"
              coordinate={position}
            />
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
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              Book Vehicle Mechanic
            </Text>
          </View>
          <View style={{flex: 3}}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={{color: 'grey', flex: 1}}>Location</Text>
              <TextInput
                style={styles.inputText}
                multiline={true}
                placeholderTextColor="grey"
                placeholder={address ? address : 'Enter Address'}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={{color: 'grey', flex: 1}}>Price</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Price"
                placeholderTextColor={Font.placeholder}
                keyboardType="numeric"
                onChangeText={val => {
                  const number = Number(val);
                  if (number < 0) {
                    alert('Price should not be negative');
                  } else {
                    setprice(val);
                  }
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'center',
                flex: 1,
              }}>
              <Text style={{color: 'grey', flex: 1}}>Description</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Description"
                placeholderTextColor={Font.placeholder}
                onChangeText={val => setdescription(val)}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#8739F9',
                width: '90%',
                alignItems: 'center',
                marginBottom: 20,
                marginLeft: '5%',
                marginRight: '5%',
                marginTop: 10,
                height: 40,
              }}
              onPress={() => {
                if (price === undefined || description === undefined) {
                  alert('Please fill al fields');
                } else {
                  FindMechanic();
                }
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>
                Find Mechanic
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default CustomerMechanic;

const styles = StyleSheet.create({
  inputText: {
    padding: 7,
    borderBottomWidth: 0.3,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    marginBottom: 2,
    color: 'grey',
    flex: 4,
  },
});

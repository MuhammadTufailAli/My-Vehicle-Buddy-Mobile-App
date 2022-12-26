import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import port from '../Port/Port';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import CartProvider from '../ContextApi/contextApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../Loader/Loader';
import Lottie from 'lottie-react-native';
import {Font} from '../font/Font';

const CustomerProfile = ({navigation}) => {
  const isFocused = useIsFocused();
  const {userdetails, setuserdetails, setUserSecret, socket} =
    useContext(CartProvider);

  const [getcondition, setcondition] = useState(true);
  const [dataarray, setdataarray] = useState([]);

  //Get Products from database
  const getproduct = async () => {
    try {
      const result = await axios.get(
        `${port.herokuPort}/car/CustomerVehicle/${userdetails._id}`,
      );

      setcondition(false);
      setdataarray(result.data.data);
    } catch (err) {
      console.log(err);
      alert('Error');
    }
  };

  React.useEffect(() => {
    getproduct();
  }, []);

  return (
    <View>
      <View style={{height: '30%'}}>
        <ImageBackground
          source={require('../../assets/profile1.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft: 10, marginTop: 30}}>
              <View>
                <Image
                  source={{
                    uri: userdetails?.photoUrl,
                  }}
                  style={{
                    width: 80,
                    height: 80,

                    borderRadius: 90 / 2,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    console.log('Navigation');
                    navigation.navigate('CustomerEditProfile');
                  }}
                  style={{
                    alignItems: 'center',
                    marginLeft: 45,
                    marginTop: -15,
                  }}>
                  <AntDesign
                    style={{marginTOp: 5}}
                    name="pluscircle"
                    size={18}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 27,
                  marginLeft: 10,
                }}>
                {userdetails?.firstname + ' ' + userdetails?.lastname}
              </Text>
            </View>
            <View style={{marginTop: 10, marginLeft: 60}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Feedback');
                }}>
                <Lottie
                  style={{
                    width: 150,
                    height: 110,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/help.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={async () => {
              try {
                socket.current.emit('Logout', {
                  userId: userdetails._id,
                });
                await AsyncStorage.clear();
                setUserSecret({});
                navigation.navigate('Welcome');
              } catch (e) {
                console.log(e);
              }
            }}
            style={{
              width: '90%',
              borderWidth: 1,
              padding: 5,
              marginLeft: '5%',
              marginRight: '5%',
              marginTop: 10,
              alignItems: 'center',
              borderColor: 'white',
            }}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CustomerEditProfile');
            }}
            style={{
              width: '90%',
              borderWidth: 1,
              padding: 5,
              marginLeft: '5%',
              marginRight: '5%',
              marginTop: 10,
              alignItems: 'center',
              borderColor: 'white',
            }}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={{height: '70%'}}>
        <ImageBackground
          source={require('../../assets/car.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <View
            style={{
              borderColor: 'white',
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                margin: 10,
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}>
              My Products
            </Text>
          </View>
          {getcondition ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Lottie
                style={{
                  marginTop: -50,
                  width: 420,
                  height: 480,
                  alignSelf: 'center',
                }}
                source={require('../../assets/loader.json')}
                autoPlay
                loop
              />
              <Text
                style={{
                  marginTop: -230,
                  fontSize: 16,
                  fontWeight: '700',
                  marginLeft: 10,
                  color: 'white',
                }}>
                Fetching Data for You
              </Text>
            </View>
          ) : dataarray.length === 0 ? (
            <View style={{flex: 1}}>
              <Lottie
                style={{
                  marginTop: -20,
                  width: 450,
                  height: 410,
                  alignSelf: 'center',
                }}
                source={require('../../assets/Not Found.json')}
                autoPlay
                loop
              />
              <Text
                style={{
                  marginTop: -90,
                  fontSize: 20,
                  fontWeight: '700',
                  marginLeft: 10,
                  color: 'white',
                  textAlign: 'center',
                }}>
                You haven't Posted any Product Yet :(
              </Text>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', margin: 10, flex: 1}}>
                <FlatList
                  data={dataarray}
                  renderItem={({item, index}) => {
                    var photoUrl = item.imageUrl[0];

                    return (
                      <View
                        elevation={6}
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#FAF9F6',
                          borderRadius: 15,
                          marginBottom: 15,
                          shadowColor: 'black',
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          shadowOffset: {
                            height: 1,
                            width: 1,
                          },
                        }}>
                        <View
                          style={{
                            width: '45%',
                            borderRightWidth: 1,
                            borderColor: 'black',
                          }}>
                          <Image
                            source={{
                              uri: photoUrl,
                            }}
                            style={{
                              width: '89%',
                              height: 150,
                              borderRadius: 10,
                              margin: 10,
                            }}
                          />
                        </View>
                        <View style={{width: '55%'}}>
                          <TouchableOpacity
                            style={{
                              alignSelf: 'flex-end',
                              marginTop: 3,
                              marginRight: 10,
                            }}
                            onPress={() => {}}>
                            <Entypo
                              style={{marginTop: 5}}
                              name="circle-with-cross"
                              size={26}
                              color="red"
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              marginTop: 0,
                              marginLeft: 10,
                              color: Font.TextColor,
                            }}>
                            {item.Name}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              marginLeft: 10,
                              color: 'grey',
                            }}>
                            Color: {item.Color}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              marginTop: 5,
                              marginLeft: 10,
                              color: '#8739F9',
                            }}>
                            Rs. {item.Price}
                          </Text>
                          <View
                            style={{
                              borderTopWidth: 1,
                              marginTop: 10,
                              borderColor: 'black',
                            }}>
                            <TouchableOpacity
                              onPress={() => {}}
                              style={{
                                alignItems: 'center',
                                padding: 10,
                                borderWidth: 0.5,
                                borderColor: 'black',
                                margin: 10,
                                backgroundColor: '#8739F9',
                                borderRadius: 20,
                              }}>
                              <Text style={{fontWeight: '600', color: 'white'}}>
                                Edit
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

export default CustomerProfile;

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
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

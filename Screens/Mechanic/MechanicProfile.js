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
import {Font, Commonstyles} from '../font/Font';
import CartProvider from '../ContextApi/contextApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import port from '../Port/Port';
import {Rating, AirbnbRating} from 'react-native-ratings';
import axios from 'axios';
const MechanicProfile = ({navigation}) => {
  const {userdetails, setuserdetails, setUserSecret, socket} =
    useContext(CartProvider);
  const [AllReview, setAllReview] = useState([]);
  const [condition, setCondition] = useState(true);
  const [noOfLines, setnoOfLines] = useState(true);
  //Get Reviews of Mechanic

  const getreview = async () => {
    try {
      const result = await axios.get(
        `${port.herokuPort}/reviewMechanic/getMechanicReview/${userdetails._id}`,
      );
      console.log(result.data.data);

      setAllReview(result.data.data);
      setCondition(false);
    } catch (err) {
      console.log('The error is');
      console.log(err);
    }
  };

  useEffect(() => {
    getreview();
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
                  fontFamily: 'Lexend-Regular',
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
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
              Logout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MechanicEditProfile');
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
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
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
                fontFamily: 'Lexend-Regular',
              }}>
              My Reviews
            </Text>
          </View>
          {condition ? (
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
                  fontFamily: 'Lexend-Regular',
                }}>
                Fetching Data for You
              </Text>
            </View>
          ) : AllReview.length === 0 ? (
            <View>
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
                  fontFamily: 'Lexend-Regular',
                }}>
                You haven't Posted any Product Yet :(
              </Text>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', margin: 10, flex: 1}}>
                <FlatList
                  data={AllReview}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          margin: 15,
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 10,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={{
                              uri: item.refOfCustomer?.photoUrl,
                            }}
                            style={{
                              width: 30,
                              height: 30,

                              borderRadius: 90 / 2,
                            }}
                          />
                          <Text
                            style={{
                              marginLeft: 8,
                              fontSize: 15,
                              fontWeight: '600',
                              color: Font.TextColor,
                              fontFamily: 'Lexend-Regular',
                            }}>
                            {item?.refOfCustomer?.firstname}{' '}
                            {item?.refOfCustomer?.lastname}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          <AirbnbRating
                            count={5}
                            defaultRating={item?.rating}
                            size={12}
                            isDisabled
                            showRating={false}
                          />
                          <Text
                            style={{
                              marginLeft: 4,
                              color: Font.TextColor,
                              fontFamily: 'Lexend-Regular',
                              fontWeight: '400',
                            }}>
                            {item?.createdAt}
                          </Text>
                        </View>

                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setnoOfLines(!noOfLines);
                            }}>
                            {noOfLines ? (
                              <Text
                                style={{color: Font.TextColor}}
                                numberOfLines={3}>
                                {item?.review}
                              </Text>
                            ) : (
                              <Text
                                style={{color: Font.TextColor}}
                                numberOfLines={null}>
                                {item?.review}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(data, index) => index.toString()}
                />
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    </View>
  );
};

export default MechanicProfile;
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
    fontFamily: 'Lexend-Regular',
  },
});

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
import port from '../Port/Port';
import React, {useState, useContext, useEffect} from 'react';
import {Font, Commonstyles} from '../font/Font';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CartProvider from '../ContextApi/contextApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminNotification = () => {
  const {userdetails, setuserdetails, token} = useContext(CartProvider);
  const [array, setarray] = useState([]);
  const [cartmodalVisible, setcartModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [getcondition, setcondition] = React.useState(true);
  const [condition, setCondition] = React.useState(true);
  const [refOfProduct, setrefOfProduct] = React.useState();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setuserReview] = useState('');
  const [pressed, setPressed] = useState('product');

  const getproduct = async () => {
    console.log('I am here');
    try {
      const result = await axios.get(
        `${port.herokuPort}/userNotification/UserNotification/${userdetails._id}`,
      );
      console.log(result.data.data);
      setarray(result.data.data);

      setcondition(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert('Error');
    }
  };

  useEffect(() => {
    getproduct();
  }, [condition]);
  return (
    <View style={{flex: 1}}>
      {getcondition ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Lottie
            style={{
              marginTop: -30,
              width: 360,
              height: 425,
              alignSelf: 'center',
            }}
            source={require('../../assets/loader.json')}
            autoPlay
            loop
          />
          <Text
            style={{
              marginTop: -180,
              fontSize: 16,
              fontWeight: '700',
              marginLeft: 10,
              paddingBottom: 80,
              color: Font.LabelColor,
              fontFamily: 'Lexend-Regular',
            }}>
            Fetching Data for You
          </Text>
        </View>
      ) : Object.keys(array).length === 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Lottie
            style={{
              marginTop: 10,
              width: 550,
              height: 510,
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
              color: Font.LabelColor,
              fontFamily: 'Lexend-Regular',
            }}>
            No Notification Yet :(
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              padding: 13,
              backgroundColor: 'white',
              borderBottomWidth: 0.6,
              borderColor: 'grey',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 15,
                  color: Font.TextBackground,
                  fontFamily: 'Lexend-Regular',
                }}>
                {array.length} Results
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flexDirection: 'row', marginRight: 15}}>
                <Text style={styles.TextColor}>Sort</Text>
                <MaterialIcons
                  name={'sort'}
                  size={20}
                  color={'black'}
                  style={{marginLeft: 3}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 5, flexDirection: 'row'}}>
                <Text style={styles.TextColor}>Filter</Text>
                <AntDesign
                  name={'filter'}
                  size={20}
                  color={'black'}
                  style={{marginLeft: 3}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{margin: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'Lexend-Regular',
              }}>
              Admin Notifications
            </Text>
          </View>

          <View style={{marginBottom: 105, margin: 5}}>
            <FlatList
              data={array}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <View
                      style={{
                        margin: 5,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        flexDirection: 'row',
                        height: 100,
                      }}>
                      <View
                        style={{
                          flex: 1.8,
                          backgroundColor: '#D3D3D3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 8,
                        }}>
                        <View
                          style={{
                            position: 'absolute',
                            color: 'white',
                            marginTop: 10,
                            alignSelf: 'flex-start',

                            flexDirection: 'row',
                          }}>
                          <Image
                            source={{
                              uri: item?.adminPhotoUrl,
                            }}
                            resizeMode={'cover'}
                            style={{
                              width: '92%',
                              height: 90,
                              borderRadius: 10,
                              margin: 4,
                            }}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 4,
                          margin: 5,
                        }}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                marginLeft: 3,
                                fontSize: 16,
                                fontWeight: '700',
                                color: Font.TextBackground,
                                fontFamily: 'Lexend-Regular',
                              }}>
                              {item?.adminName}
                            </Text>
                          </View>
                          <Text
                            numberOfLines={3}
                            style={{
                              marginLeft: 3,

                              color: Font.LightColor,
                              fontFamily: 'Lexend-Regular',
                              fontWeight: '400',
                            }}>
                            {item?.warning}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AdminNotification;

const styles = StyleSheet.create({});

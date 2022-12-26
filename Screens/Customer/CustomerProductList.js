import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Font} from '../font/Font';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import port from '../Port/Port';
const CustomerProductList = ({navigation, route}) => {
  const [array, setarray] = useState([]);
  const [getcondition, setcondition] = React.useState(true);

  const getproduct = async () => {
    try {
      const result = await axios.post(
        `${port.herokuPort}/product/FilteredProducts`,
        {
          category: route.params?.category,
          location: route.params?.location,
        },
      );
      console.log(result.data.data.length);
      setarray(result.data.data);
      setcondition(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert('Error');
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <View style={{backgroundColor: Font.BackGroundColor, height: '100%'}}>
      <View
        style={{
          backgroundColor: Font.ButtonColor,
          marginBottom: 2,
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: 1}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'left'} size={20} color={'white'} />
        </TouchableOpacity>

        <TextInput
          placeholder="Search auto parts"
          placeholderTextColor={Font.TextBackground}
          style={{
            padding: 6,
            borderWidth: 1,
            color: Font.TextColor,

            borderRadius: 10,
            flex: 0.97,
            backgroundColor: 'rgba(235, 238, 242, 255)',
          }}
        />
      </View>
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
            }}>
            Fetching Data for You
          </Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              padding: 13,
              backgroundColor: 'white',
              borderBottomWidth: 0.6,
              borderColor: 'grey',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontWeight: '600', fontSize: 15}}>
                {array.length} Results
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flexDirection: 'row', marginRight: 15}}>
                <Text>Sort</Text>
                <MaterialIcons
                  name={'sort'}
                  size={20}
                  color={'black'}
                  style={{marginLeft: 3}}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 5, flexDirection: 'row'}}>
                <Text>Filter</Text>
                <AntDesign
                  name={'filter'}
                  size={20}
                  color={'black'}
                  style={{marginLeft: 3}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <FlatList
              data={array}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      margin: 5,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1.8,
                        backgroundColor: '#D3D3D3',
                        alignItems: 'center',
                        borderRadius: 8,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('CustomerProductScreen', {
                            product: item,
                          });
                        }}>
                        <Image
                          source={{
                            uri: item.imageUrl[0],
                          }}
                          style={{
                            width: 109,
                            height: 120,
                            borderRadius: 10,
                            margin: 4,
                          }}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            color: 'white',
                            marginTop: 100,
                            marginLeft: 10,
                            flexDirection: 'row',
                          }}>
                          <EvilIcons
                            name={'image'}
                            size={18}
                            color={'white'}
                            style={{marginLeft: 3}}
                          />
                          <Text style={{color: 'white', marginTop: -2.5}}>
                            {item.imageUrl.length}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 4,
                        margin: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('CustomerProductScreen', {
                            product: item,
                          });
                        }}>
                        <View>
                          <Text style={{marginLeft: 3, color: 'grey'}}>
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              marginLeft: 3,
                              fontSize: 16,
                              fontWeight: '700',
                              color: Font.ButtonColor,
                            }}>
                            PKR {item.price}
                          </Text>
                          <Text
                            style={{
                              marginLeft: 3,
                              color: 'grey',
                            }}>
                            {item.place}
                          </Text>

                          <Text
                            style={{
                              marginLeft: 3,
                              color: 'grey',
                            }}>
                            {item.category} | {item.subcategory}
                          </Text>
                          <View
                            style={{alignItems: 'flex-start', marginLeft: 3}}>
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
                                startingValue={item.ratingsAverage}
                              />
                              <Text
                                style={{
                                  fontSize: 13,
                                  color: 'grey',
                                  marginLeft: 2,
                                }}>
                                {item.ratingsAverage}/5 ({item.ratingQuantity})
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{alignSelf: 'flex-end'}}>
                          <AntDesign
                            name="arrowright"
                            size={20}
                            color={Font.LabelColor}
                          />
                        </View>
                      </TouchableOpacity>
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

export default CustomerProductList;

const styles = StyleSheet.create({});

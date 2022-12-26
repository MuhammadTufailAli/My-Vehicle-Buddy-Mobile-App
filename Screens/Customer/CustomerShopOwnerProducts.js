import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {auth, db} from '../../firebase/firebase';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import port from '../Port/Port';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Loader from '../Loader/Loader';
// import {Font} from '../font/Font';
// import ImagePicker from 'react-native-image-crop-picker';

function CustomerShopOwnerProducts({navigation, route}) {
  console.log(route.params.user);
  const [dataarray, setdataarray] = useState([]);
  const [arrayOfID, setarrayofID] = useState([]);
  const [name, setname] = useState();
  const [shopname, setshopname] = useState();
  const [photoUrl, setphotoUrl] = useState();
  const [getcondition, setcondition] = useState(true);

  const getproduct = async () => {
    try {
      const result = await axios.get(
        `${port.herokuPort}/product/shopOwnerProducts/${route.params.user._id}`,
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
    <SafeAreaView style={{backgroundColor: '#36454F'}}>
      <View style={{height: '30%'}}>
        <ImageBackground
          source={require('../../assets/profile1.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 10, marginTop: 10}}>
              <View>
                <Image
                  source={{
                    uri: route.params.user.photoUrl,
                  }}
                  style={{
                    width: 80,
                    height: 80,

                    borderRadius: 90 / 2,
                  }}
                />
              </View>
            </View>
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {route.params.user.firstname} {route.params.user.lastname}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                {route.params.user.shopname}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CustomerShopOwnerDetails', {
                    user: route.params.user,
                  });
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    marginTop: 5,
                    color: 'blue',
                    textDecorationLine: 'underline',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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

              alignItems: 'center',
            }}>
            <Text
              style={{
                margin: 10,
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}>
              Products
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
          ) : (
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', margin: 10, flex: 1}}>
                <FlatList
                  data={dataarray}
                  numColumns={2}
                  renderItem={({item, index}) => {
                    var photoUrl = item.imageUrl[0];
                    if (typeof item === 'object') {
                      return (
                        <View
                          elevation={5}
                          style={{
                            width: 185,
                            height: 255,

                            backgroundColor: '#FAF9F6',
                            borderRadius: 15,
                            margin: 7,
                            marginLeft: 5,
                            marginBottom: 15,
                            shadowColor: 'black',
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            shadowOffset: {
                              height: 1,
                              width: 1,
                            },
                          }}>
                          <TouchableOpacity
                            // style={{width: 185, height: '100%'}}
                            onPress={() => {
                              navigation.navigate('CustomerProductScreen', {
                                product: item,
                              });
                            }}>
                            <View
                              style={{
                                height: '50%',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={{
                                  uri: photoUrl,
                                }}
                                style={{
                                  width: '95%',
                                  height: '100%',
                                  borderRadius: 10,
                                  margin: 10,
                                  marginTop: 4,
                                }}
                              />
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  marginTop: 7,
                                  marginLeft: 11,
                                  fontSize: 16,
                                }}>
                                {item.title}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',

                                  marginLeft: 10,
                                  color: '#8739F9',
                                }}>
                                Rs. {item.price}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  color: 'grey',
                                }}>
                                {item.category}
                              </Text>

                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '600',

                                  marginLeft: 10,
                                }}>
                                Location:{' '}
                                <Text style={{color: '#8739F9', fontSize: 16}}>
                                  {item.place}
                                </Text>
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default CustomerShopOwnerProducts;

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

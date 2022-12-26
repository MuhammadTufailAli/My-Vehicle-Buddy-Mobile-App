import React, {useState, useContext} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Lottie from 'lottie-react-native';
import {Font} from '../font/Font';
import axios from 'axios';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CartProvider from '../ContextApi/contextApi';
import port from '../Port/Port';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {auth, db} from '../../firebase/firebase';
import {StripeProvider} from '@stripe/stripe-react-native';
import {FlatList} from 'react-native-gesture-handler';
const CustomerProductScreen = ({navigation, route}) => {
  const {userdetails, setuserdetails, token} = useContext(CartProvider);
  const [dataarray, setdataarray] = useState(route.params?.product);
  const [getReview, setReview] = useState([]);
  const [AllReview, setAllReview] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setuserReview] = useState('');
  const [condition, setCondition] = useState(true);
  const [noOfLines, setnoOfLines] = useState(true);
  const [moreReview, setmoreReview] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartmodalVisible, setcartModalVisible] = useState(false);
  const [buymodalVisible, setbuyModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [buyquantity, setbuyQuantity] = useState('1');

  const findConversation = () => {
    console.log('Othererer userrrrrrrrrrrrrrr');
    console.log(dataarray.refOfUser._id);
    axios
      .get(
        `${port.herokuPort}/conversation/find/${userdetails._id}/${dataarray.refOfUser._id}`,
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
            receiverId: dataarray.refOfUser,
          };
          axios
            .post(`${port.herokuPort}/conversation`, userDetails, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(res => {
              navigation.navigate('CustomerChatScreen', {
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

  //this is slider for images
  const Slider = () => {
    const [getImage, setImage] = useState(route.params?.product.imageUrl);

    // useEffect(() => {

    //   socket.current.emit('addUser', userdetails._id);
    // }, []);

    return (
      <SliderBox
        images={getImage}
        sliderBoxHeight={240}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor="#8739F9"
        inactiveDotColor="white"
        paginationBoxVerticalPadding={10}
        // autoplay

        resizeMethod={'resize'}
        resizeMode={'cover'}
        ImageComponentStyle={{width: '100%'}}
        imageLoadingColor="#8739F9"
      />
    );
  };

  const getreview = async () => {
    try {
      setAllReview;
      const result = await axios.get(
        `${port.herokuPort}/review/getProductReview/${route.params?.product._id}`,
      );
      if (result.data.data.length > 3) {
        const arr = result.data.data.slice(0, 3);

        setReview(arr);
        setmoreReview(true);
      } else {
        setReview(result.data.data);
      }
      setAllReview(result.data.data);
      setCondition(false);
    } catch (err) {
      console.log(err.response.message);
    }
  };

  //Add to cart
  const addToCart = async () => {
    const cartData = {
      quantity: quantity,
      refOfUser: userdetails._id,
      refOfProduct: route.params?.product._id,
    };
    try {
      const result = await axios.post(
        `${port.herokuPort}/cart/addToCart`,
        cartData,
      );
      setcartModalVisible(!cartmodalVisible);
      alert('Added to cart successfully');
    } catch (err) {
      console.log(err.response.message);
    }
  };
  React.useEffect(() => {
    getreview();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* Cart Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={cartmodalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setcartModalVisible(!cartmodalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView2}>
              <View>
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 0,

                      marginLeft: 45,
                    }}></Text>
                  <Text style={styles.modalText2}>Cart Details</Text>

                  <Pressable
                    onPress={() => setcartModalVisible(!cartmodalVisible)}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: Font.ButtonColor,
                        marginRight: 15,
                        fontWeight: '600',
                      }}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
                <View style={{height: 127}}>
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
                      <Image
                        source={{
                          uri: route.params?.product.imageUrl[0],
                        }}
                        style={{
                          width: 105,
                          height: 105,
                          borderRadius: 10,
                          margin: 4,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 4,
                        margin: 5,
                      }}>
                      <View>
                        <Text style={{marginLeft: 3, color: 'grey'}}>
                          {route.params?.product.title}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 3,
                            fontSize: 16,
                            fontWeight: '700',
                            color: Font.TextColor,
                          }}>
                          PKR {route.params?.product.price}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 3,
                            color: 'grey',
                          }}>
                          {route.params?.product.place}
                        </Text>

                        <Text
                          style={{
                            marginLeft: 3,
                            color: 'grey',
                          }}>
                          {route.params?.product.category} |{' '}
                          {route.params?.product.subcategory}
                        </Text>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            marginLeft: 3,
                          }}></View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginTop: 5,
                      marginBottom: 5,
                      color: Font.TextColor,
                    }}>
                    More Photos
                  </Text>
                  <FlatList
                    numColumns={5}
                    data={route.params?.product.imageUrl}
                    renderItem={({item}) => {
                      return (
                        <View>
                          <Image
                            source={{
                              uri: item,
                            }}
                            style={{
                              width: 70,
                              height: 70,
                              borderRadius: 10,
                              marginRight: 5,
                            }}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0.5,
                    borderColor: 'grey',
                    width: '95%',
                    marginRight: 10,
                    marginLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      color: Font.TextColor,
                    }}>
                    Quantity
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{alignSelf: 'center', marginRight: 5}}
                      onPress={() => {
                        var NewNumber = parseInt(quantity);
                        if (NewNumber > 1) {
                          NewNumber = NewNumber - 1;
                          const displayNumber = NewNumber.toString();
                          setQuantity(displayNumber);
                        } else {
                          alert('Quantity Must be atleast 1');
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: 'bold',
                          color: '#8739F9',
                          marginLeft: 4,
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      value={quantity}
                      placeholderTextColor="grey"
                      keyboardType="numeric"
                      onChangeText={text => setQuantity(text)}
                      style={{
                        borderWidth: 0.8,
                        paddingTop: 1,
                        color: Font.TextColor,

                        paddingBottom: 1,
                        paddingRight: 10,
                        paddingLeft: 20,
                        borderColor: 'grey',
                      }}
                    />
                    <TouchableOpacity
                      style={{alignSelf: 'center', marginLeft: 8}}
                      onPress={() => {
                        if (quantity < route.params?.product.quantity) {
                          const NewNumber = parseInt(quantity) + 1;
                          const displayNumber = NewNumber.toString();
                          setQuantity(displayNumber);
                        } else {
                          alert('Product limit reach');
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#8739F9',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 40, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    addToCart();
                  }}
                  style={{
                    padding: 14,
                    backgroundColor: Font.ButtonColor,
                    width: '90%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, color: 'white', fontWeight: '700'}}>
                    Add to cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Buy modal */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={buymodalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setbuyModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView2}>
              <View>
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 0,

                      marginLeft: 45,
                    }}></Text>
                  <Text style={styles.modalText2}>Select Quantity</Text>

                  <Pressable onPress={() => setbuyModalVisible(false)}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: Font.ButtonColor,
                        marginRight: 15,
                        fontWeight: '600',
                      }}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
                <View style={{height: 127}}>
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
                      <Image
                        source={{
                          uri: route.params?.product.imageUrl[0],
                        }}
                        style={{
                          width: 105,
                          height: 105,
                          borderRadius: 10,
                          margin: 4,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 4,
                        margin: 5,
                      }}>
                      <View>
                        <Text style={{marginLeft: 3, color: 'grey'}}>
                          {route.params?.product.title}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 3,
                            fontSize: 16,
                            fontWeight: '700',
                            color: Font.TextColor,
                          }}>
                          PKR {route.params?.product.price}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 3,
                            color: 'grey',
                          }}>
                          {route.params?.product.place}
                        </Text>

                        <Text
                          style={{
                            marginLeft: 3,
                            color: 'grey',
                          }}>
                          {route.params?.product.category} |{' '}
                          {route.params?.product.subcategory}
                        </Text>
                        <View
                          style={{
                            alignItems: 'flex-start',
                            marginLeft: 3,
                          }}></View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginTop: 5,
                      marginBottom: 5,
                      color: Font.TextColor,
                    }}>
                    More Photos
                  </Text>
                  <FlatList
                    numColumns={5}
                    data={route.params?.product.imageUrl}
                    renderItem={({item}) => {
                      return (
                        <View>
                          <Image
                            source={{
                              uri: item,
                            }}
                            style={{
                              width: 70,
                              height: 70,
                              borderRadius: 10,
                              marginRight: 5,
                            }}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0.5,
                    borderColor: 'grey',
                    width: '95%',
                    marginRight: 10,
                    marginLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      color: Font.TextColor,
                    }}>
                    Quantity
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{alignSelf: 'center', marginRight: 5}}
                      onPress={() => {
                        var NewNumber = parseInt(buyquantity);
                        if (NewNumber > 1) {
                          NewNumber = NewNumber - 1;
                          const displayNumber = NewNumber.toString();
                          setbuyQuantity(displayNumber);
                        } else {
                          alert('Quantity Must be atleast 1');
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 26,
                          fontWeight: 'bold',
                          color: '#8739F9',
                          marginLeft: 4,
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      value={buyquantity}
                      keyboardType="numeric"
                      onChangeText={text => setbuyQuantity(text)}
                      style={{
                        borderWidth: 0.8,
                        paddingTop: 1,
                        color: Font.TextColor,

                        paddingBottom: 1,
                        paddingRight: 10,
                        paddingLeft: 20,
                        borderColor: 'grey',
                      }}
                    />
                    <TouchableOpacity
                      style={{alignSelf: 'center', marginLeft: 8}}
                      onPress={() => {
                        if (buyquantity < route.params?.product.quantity) {
                          const NewNumber = parseInt(buyquantity) + 1;
                          const displayNumber = NewNumber.toString();
                          setbuyQuantity(displayNumber);
                        } else {
                          alert('Product limit reach');
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#8739F9',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 40, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setbuyModalVisible(false);
                    navigation.navigate('CheckoutScreen', {
                      product: dataarray,
                      quantity: buyquantity,
                    });
                  }}
                  style={{
                    padding: 14,
                    backgroundColor: Font.ButtonColor,
                    width: '90%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, color: 'white', fontWeight: '700'}}>
                    Check out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Slider />

        <View>
          <Text
            style={{
              margin: 10,
              marginBottom: 5,
              fontSize: 18,
              fontWeight: '600',
              color: Font.TextColor,
            }}>
            {dataarray.title}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 18,
              marginBottom: 5,
            }}>
            <Text style={{color: '#8739F9'}}>PKR </Text>
            <Text style={{fontWeight: 'bold', color: Font.TextColor}}>
              {dataarray.price}
            </Text>
          </Text>
          {/* {dataarray.quantity} */}

          <Text style={{marginLeft: 10, fontSize: 18, marginBottom: 5}}>
            {dataarray.quantity > 0 ? (
              <Text style={{color: 'green'}}>In Stock</Text>
            ) : (
              <Text style={{color: 'red'}}>Out of Stock</Text>
            )}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 18,
              marginBottom: 5,
              color: Font.TextColor,
            }}>
            <FontAwesome5 name="map-marker-alt" size={20} color={'red'} />{' '}
            {dataarray.place}
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: 'grey',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 0,
              marginTop: 0,

              padding: 8,
              flexDirection: 'row',

              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'grey',
                fontWeight: '300',
                alignSelf: 'center',
              }}>
              Category
            </Text>
            <Text style={{color: 'grey'}}>{dataarray.category}</Text>
          </View>
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: 'grey',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 0,
              marginTop: 0,

              padding: 8,
              flexDirection: 'row',

              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'grey',
                fontWeight: '300',
                alignSelf: 'center',
              }}>
              Sub Category
            </Text>
            <Text style={{color: 'grey'}}>{dataarray.subcategory}</Text>
          </View>
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: 'grey',

              marginLeft: 10,
              marginRight: 10,
              marginTop: 0,
              marginBottom: 0,
              padding: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: 'grey',
                fontWeight: '300',
              }}>
              Uploaded Date
            </Text>
            <Text style={{color: 'grey'}}>{dataarray.createdDate}</Text>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: Font.TextColor,
            }}>
            Seller Description
          </Text>
          <Text style={{marginLeft: 10, marginTop: 10, color: Font.LightColor}}>
            {dataarray.description}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: Font.TextColor,
            }}>
            Ratings & Reviews
          </Text>
        </View>

        {condition ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Lottie
              style={{
                marginTop: -43,
                width: 160,
                height: 240,
                alignSelf: 'center',
              }}
              source={require('../../assets/loader.json')}
              autoPlay
              loop
            />
            <Text
              style={{
                marginTop: -130,
                fontSize: 16,
                fontWeight: '700',
                marginLeft: 10,
                color: Font.LabelColor,
              }}>
              Fetching Data for You
            </Text>
          </View>
        ) : getReview.length === 0 ? (
          <View>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 5,
                fontSize: 16,
                color: 'grey',
              }}>
              No review yet
            </Text>
          </View>
        ) : moreReview ? (
          <View>
            {getReview?.map(data => {
              return (
                <View style={{margin: 15}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{
                        uri: data.refOfUser.photoUrl,
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
                      }}>
                      {data.refOfUser.firstname} {data.refOfUser.lastname}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <AirbnbRating
                      count={5}
                      defaultRating={data.rating}
                      size={12}
                      isDisabled
                      showRating={false}
                    />
                    <Text style={{marginLeft: 4, color: Font.TextColor}}>
                      {data.createdAt}
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setnoOfLines(!noOfLines);
                      }}>
                      {noOfLines ? (
                        <Text style={{color: Font.TextColor}} numberOfLines={3}>
                          {data.review}
                        </Text>
                      ) : (
                        <Text
                          style={{color: Font.TextColor}}
                          numberOfLines={null}>
                          {data.review}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              style={{margin: 15}}
              onPress={() => {
                navigation.navigate('AllReviewScreen', {reviews: AllReview});
              }}>
              <Text style={{color: Font.LabelColor, fontWeight: '700'}}>
                See all reviews
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          getReview?.map(data => {
            return (
              <View style={{margin: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: data.refOfUser.photoUrl,
                    }}
                    style={{
                      width: 30,
                      height: 30,

                      borderRadius: 90 / 2,
                    }}
                  />
                  <Text
                    style={{marginLeft: 8, fontSize: 15, fontWeight: '600'}}>
                    {data.refOfUser.firstname} {data.refOfUser.lastname}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <AirbnbRating
                    count={5}
                    defaultRating={data.rating}
                    size={12}
                    isDisabled
                    showRating={false}
                  />
                  <Text style={{marginLeft: 4}}>{data.createdAt}</Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setnoOfLines(!noOfLines);
                    }}>
                    {noOfLines ? (
                      <Text numberOfLines={3}>{data.review}</Text>
                    ) : (
                      <Text numberOfLines={null}>{data.review}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}

        <View style={{marginTop: 20}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: Font.TextColor,
            }}>
            Seller Information
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CustomerShopOwnerProducts', {
                user: route.params?.product.refOfUser,
              })
            }
            style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: route.params?.product.refOfUser.photoUrl,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 90 / 2,
                marginLeft: 10,
                marginTop: 5,
              }}
            />
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text style={{color: Font.LightColor}}>
                {route.params?.product.refOfUser.firstname}{' '}
                {route.params?.product.refOfUser.lastname}
              </Text>
              <Text style={{color: Font.LightColor}}>
                Contact No. {route.params?.product.refOfUser.phonenumber}
              </Text>
              <Text style={{color: Font.LightColor}}>
                Emal: {route.params?.product.refOfUser.email}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 60,
          marginTop: 10,
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            findConversation();
          }}
          style={{
            height: 50,

            borderWidth: 1,
            flex: 1,
            borderColor: '#8739F9',
            marginLeft: 7,
            alignItems: 'center',
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#8739F9', fontWeight: 'bold'}}>Chat Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setcartModalVisible(true);
          }}
          style={{
            height: 50,

            borderWidth: 1,
            flex: 1,
            borderColor: '#8739F9',
            marginLeft: 7,
            alignItems: 'center',
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#8739F9', fontWeight: 'bold'}}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <StripeProvider publishableKey="pk_test_51LcNiZDfjQDKNGNJCnxuhFqlQVq3RMTmc7PF1VyckZc1NvxHaNvNiiaQYizidxp3f0zUd8XCshH5GqZsRZXX0zaX00qzWx0ciu">
          <TouchableOpacity
            onPress={() => {
              console.log(buymodalVisible);
              setbuyModalVisible(true);
            }}
            style={{
              flex: 1,
              height: 50,
              borderWidth: 1,
              backgroundColor: '#8739F9',
              borderColor: '#8739F9',
              marginLeft: 8,
              marginRight: 8,
              alignItems: 'center',
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Buy Now</Text>
          </TouchableOpacity>
        </StripeProvider>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {},
  modalView: {
    marginTop: 10,
    backgroundColor: '#1c1c1e',
    borderRadius: 15,
    height: '100%',
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
  modalView2: {
    marginTop: 10,
    backgroundColor: Font.BackGroundColor,
    borderRadius: 15,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText2: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default CustomerProductScreen;

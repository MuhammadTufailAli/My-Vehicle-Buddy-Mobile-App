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
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Font} from '../font/Font';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CartProvider from '../ContextApi/contextApi';
import port from '../Port/Port';

const CartScreen = ({navigation}) => {
  const {userdetails, setuserdetails, token} = useContext(CartProvider);
  const [array, setarray] = useState([]);
  const [cartId, setCartId] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [getcondition, setcondition] = React.useState(true);
  const [condition, setCondition] = React.useState(true);
  const [cartmodalVisible, setcartModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const getproduct = async () => {
    console.log('I am here');
    try {
      const result = await axios.get(
        `${port.herokuPort}/cart/getUserCartProduct/${userdetails._id}`,
      );
      console.log(result.data.data);
      setarray(result.data.data);
      if (Object.keys(result.data.data).length !== 0) {
        console.log(result.data?.data[0].refOfProduct);
        setSelectedProduct(result.data?.data[0].refOfProduct);
      }

      setcondition(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert('Error');
    }
  };

  const deletecartProduct = async id => {
    try {
      const result = await axios.delete(
        `${port.herokuPort}/cart/deleteCartProduct/${id}`,
      );

      alert('Deleted successfully');
    } catch (err) {
      console.log(err.response.message);
    }
  };

  const updateCart = async () => {
    const cartData = {
      quantity: quantity,
    };
    try {
      const result = await axios.patch(
        `${port.herokuPort}/cart/updateCart/${cartId}`,
        cartData,
      );

      alert('Cart Updated successfully');
      setcartModalVisible(false);
      navigation.navigate('CartScreen');
    } catch (err) {
      console.log(err.response.message);
    }
  };

  useEffect(() => {
    getproduct();
  }, [condition]);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: Font.ButtonColor,
          height: 60,
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
        <Text style={styles.text}>My Cart</Text>
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
            <Text style={{marginRight: 8, color: 'white'}}> </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 12}}>
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
        ) : Object.keys(array).length === 0 ? (
          <View style={{flex: 8, alignItems: 'center'}}>
            <Lottie
              style={{
                marginTop: -10,
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
                color: Font.LabelColor,
              }}>
              No Product in cart Found :(
            </Text>
          </View>
        ) : (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={cartmodalVisible}
              onRequestClose={() => {
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
                      <Text style={styles.modalText2}>Edit Cart</Text>

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
                              uri: selectedProduct?.imageUrl[0],
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
                              {selectedProduct?.title}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 3,
                                fontSize: 16,
                                fontWeight: '700',
                                color: Font.TextColor,
                              }}>
                              PKR {selectedProduct.price}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 3,
                                color: 'grey',
                              }}>
                              {selectedProduct?.place}
                            </Text>

                            <Text
                              style={{
                                marginLeft: 3,
                                color: 'grey',
                              }}>
                              {selectedProduct.category} |{' '}
                              {selectedProduct.subcategory}
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
                        data={selectedProduct?.imageUrl}
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
                            if (quantity < selectedProduct.quantity) {
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
                        setCondition(!condition);
                        updateCart();
                      }}
                      style={{
                        padding: 14,
                        backgroundColor: Font.ButtonColor,
                        width: '90%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: '700',
                        }}>
                        Update Cart
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
                <TouchableOpacity
                  style={{flexDirection: 'row', marginRight: 15}}>
                  <Text>Sort</Text>
                  <MaterialIcons
                    name={'sort'}
                    size={20}
                    color={'black'}
                    style={{marginLeft: 3}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 5, flexDirection: 'row'}}>
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
                              product: item.refOfProduct,
                            });
                          }}>
                          <Image
                            source={{
                              uri: item.refOfProduct?.imageUrl[0],
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
                              {item.refOfProduct?.imageUrl.length}
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
                              product: item.refOfProduct,
                            });
                          }}>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text style={{marginLeft: 3, color: 'grey'}}>
                                {item.refOfProduct?.title}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  setCondition(!condition);
                                  deletecartProduct(item._id);
                                }}>
                                <Text style={{color: 'red'}}>Delete</Text>
                              </TouchableOpacity>
                            </View>
                            <Text
                              style={{
                                marginLeft: 3,
                                fontSize: 16,
                                fontWeight: '700',
                                color: Font.TextColor,
                              }}>
                              PKR {item.refOfProduct?.price}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 3,
                                color: 'grey',
                              }}>
                              {item.refOfProduct?.place}
                            </Text>

                            <Text
                              style={{
                                marginLeft: 3,
                                color: 'grey',
                              }}>
                              {item.refOfProduct?.category} |{' '}
                              {item.refOfProduct?.subcategory}
                            </Text>
                            <View
                              style={{
                                alignItems: 'flex-start',
                                marginLeft: 3,
                              }}>
                              <Text style={{color: Font.TextColor}}>
                                Quantity:{' '}
                                <Text
                                  style={{
                                    color: Font.LabelColor,
                                    fontWeight: 'bold',
                                  }}>
                                  {item.quantity}
                                </Text>
                              </Text>
                            </View>
                          </View>
                          <View style={{alignSelf: 'flex-end'}}>
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedProduct(item.refOfProduct);
                                setQuantity(item.quantity.toString());
                                setCartId(item._id);
                                setcartModalVisible(true);
                              }}
                              style={{
                                padding: 5,
                                width: 50,
                                backgroundColor: Font.ButtonColor,
                                marginTop: -5,
                                borderRadius: 5,
                                alignItems: 'center',
                              }}>
                              <Text style={{color: 'white'}}>Edit</Text>
                            </TouchableOpacity>
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
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  centeredView: {},
  text: {
    color: 'white',

    fontSize: 18,
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
  modalText2: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

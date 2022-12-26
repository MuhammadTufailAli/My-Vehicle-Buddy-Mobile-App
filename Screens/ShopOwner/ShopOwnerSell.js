import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Platform,
  Keyboard,
  Modal,
  Alert,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

import DropDownPicker from 'react-native-dropdown-picker';
import {LogBox} from 'react-native';
import Lottie from 'lottie-react-native';
import port from '../Port/Port';

import axios from 'axios';

import CartProvider from '../ContextApi/contextApi';
import {Font} from '../font/Font';

const ShopOwnerSell = ({navigation}) => {
  const {userdetails, setuserdetails} = useContext(CartProvider);

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    {label: 'New', value: 'New'},
    {label: 'Used-like new', value: 'Used-like new'},
    {label: 'Used-Good', value: 'Used-Good'},
    {label: 'Used-Fair', value: 'Used-Fair'},
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [IndexOf, setIndexOf] = useState(false);
  var [images, setImages] = useState([]);
  const [price, setprice] = useState();
  const [title, settitle] = useState();
  const [condition, setcondition] = useState();
  const [description, setdescription] = useState();
  const [location, setlocation] = useState();

  const [category, setcategory] = useState();
  const [subCategory, setSubCategory] = useState();
  var [ImageUrl, setImageUrl] = useState([]);
  const [quantity, setquantity] = useState();

  const handleUpload = async image => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'MuhammadTufailAli'),
      data.append('cloud_name', 'vehiclebuddy');

    fetch('https://api.cloudinary.com/v1_1/vehiclebuddy/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        var newUrl = data.url.slice(0, 4) + 's' + data.url.slice(4);
        console.log(newUrl);
        setImageUrl(ImageUrl => [...ImageUrl, newUrl]);
      });
  };

  const postAd = async () => {
    console.log(ImageUrl);
    const productData = {
      place: location,
      description: description,

      title: title,
      condition: condition,
      price: price,
      category: category,
      subcategory: subCategory,
      quantity: quantity,
      refOfUser: userdetails?._id,
      imageUrl: ImageUrl,
    };

    try {
      const result = await axios.post(
        `${port.herokuPort}/product/addProduct`,
        productData,
      );

      alert('Product posted successfully');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const openImagePicker = () => {
    let imageList = [];

    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(response => {
        response.map(image => {
          setImages(images => [...images, image.path]);
          imageList.push({
            filename: image.filename,
            path: image.path,
            data: image.data,
          });
        });

        imageList.map(val => {
          var prefix = Math.random();
          let newfile = {
            uri: val.path,
            type: `${prefix}/${val.path.split('.')[2]}`,
            name: `${prefix}.${val.path.split('.')[2]}`,
          };

          handleUpload(newfile);
        });
      })
      .catch(e => console.log('error', e.message));
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  //If there is no shop
  if (userdetails?.shop === 'No Shop') {
    return (
      <View>
        <View style={{alignItems: 'center', margin: 10}}>
          <Text style={{fontSize: 26, color: Font.TextColor}}>
            <Text style={{color: '#8739F9'}}>Welcome </Text>
            {userdetails?.firstname} {userdetails?.lastname}
          </Text>
        </View>
        <Text style={{fontSize: 16, marginLeft: 10, color: Font.TextColor}}>
          We are glad to see you here.
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 10,
            marginBottom: 20,
            color: Font.TextColor,
          }}>
          You can not post an Ad untill you create a shop.
        </Text>
        <Lottie
          style={{
            width: 370,
            height: 430,
            alignSelf: 'center',
            marginTop: -14,
          }}
          source={require('../../assets/ShopClosed.json')}
          autoPlay
          loop
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShopOwner EnterShop');
          }}
          style={{
            padding: 10,
            backgroundColor: '#8739F9',
            width: '90%',
            alignItems: 'center',
            alignSelf: 'center',

            marginTop: -40,
          }}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
            Create Shop
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <ScrollView style={{backgroundColor: '#efefef'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={{marginTop: 20}}>
                <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                  <Text
                    style={{
                      fontSize: 22,
                      marginTop: 90,
                      fontWeight: 'bold',
                      marginBottom: 10,
                      color: Font.TextColor,
                    }}>
                    Sell <Text style={{color: '#8739F9'}}>Product</Text>
                  </Text>
                </View>

                {/* TO delete photo */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  style={{justifyContent: 'flex-end', margin: 0}}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
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
                          setImages(
                            images.filter((val, index1) => {
                              return index1 !== IndexOf;
                            }),
                          );
                          setImageUrl(
                            images.filter((val, index1) => {
                              return index1 !== IndexOf;
                            }),
                          );
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

                {ImageUrl.length == 0 ? (
                  <TouchableOpacity
                    onPress={openImagePicker}
                    style={{
                      backgroundColor: '#8739F9',
                      padding: 60,
                      alignItems: 'center',
                      borderWidth: 0.5,
                      borderColor: 'grey',
                      marginBottom: 20,
                      marginTop: 30,
                    }}>
                    <Text style={styles.buttonText}>
                      <Entypo name={'camera'} size={27} color={'white'} /> Add
                      Photo
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{backgroundColor: 'white', marginTop: 20}}>
                    <FlatList
                      horizontal={true}
                      data={images}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            style={{
                              marginLeft: 8,
                              marginTop: 8,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setIndexOf(index);
                                setModalVisible(true);
                              }}>
                              <Image
                                source={{
                                  uri: item,
                                }}
                                style={{
                                  width: 100,
                                  height: 70,
                                  borderRadius: 5,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: 4,
                        borderBottomWidth: 0.6,
                        borderColor: 'grey',
                      }}>
                      {images.length} Photos
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 5,
                      }}>
                      <TouchableOpacity onPress={openImagePicker}>
                        <Text
                          style={{
                            color: Font.LabelColor,
                            alignSelf: 'center',
                            padding: 5,
                            fontSize: 15,
                            fontWeight: '700',
                          }}>
                          Add More Photo
                        </Text>
                      </TouchableOpacity>
                      <Text style={{fontSize: 18, marginTop: 1}}>|</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setImages([]);
                          setImageUrl([]);
                        }}>
                        <Text
                          style={{
                            color: 'red',
                            alignSelf: 'center',
                            padding: 5,
                            fontSize: 15,
                            fontWeight: '700',
                          }}>
                          Delete All Photos
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <Text
                  style={{
                    marginTop: 40,
                    fontSize: 16,
                    marginLeft: 10,
                    color: Font.TextColor,
                  }}>
                  ACCESSORY DETAILS
                </Text>
                <View style={{backgroundColor: 'white', marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SelectCityForAd', {
                        city: setlocation,
                      });
                    }}>
                    <View pointerEvents="none">
                      <Text
                        style={{
                          marginLeft: '5.5%',
                          fontSize: 15,
                          color: Font.LabelColor,
                          marginTop: 5,
                          marginBottom: -8,
                        }}>
                        Location
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <TextInput
                          placeholder="Select City"
                          placeholderTextColor={Font.placeholder}
                          style={{
                            borderBottomWidth: 0.5,
                            borderColor: 'grey',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            fontSize: 16,
                            color: Font.TextColor,
                          }}
                          value={location}
                        />
                        <AntDesign
                          name={'right'}
                          size={18}
                          color={Font.TextColor}
                          style={{
                            alignSelf: 'center',
                            marginLeft: -25,
                            marginBottom: -10,
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SelectCategory', {
                        category: setcategory,
                        subcategory: setSubCategory,
                      });
                    }}>
                    <View pointerEvents="none">
                      <Text
                        style={{
                          marginLeft: '5.5%',
                          fontSize: 15,
                          color: Font.LabelColor,
                          marginTop: 5,
                          marginBottom: -8,
                        }}>
                        Category Information
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <TextInput
                          placeholderTextColor={Font.placeholder}
                          placeholder="Select a category"
                          style={{
                            borderBottomWidth: 0.5,
                            borderColor: 'grey',
                            width: '90%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            fontSize: 16,
                            color: Font.TextColor,
                          }}
                          value={subCategory}
                        />
                        <AntDesign
                          name={'right'}
                          size={18}
                          color={Font.TextColor}
                          style={{
                            alignSelf: 'center',
                            marginLeft: -25,
                            marginBottom: -10,
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <Text
                    style={{
                      marginLeft: '5.5%',
                      fontSize: 15,
                      color: Font.LabelColor,
                      marginTop: 5,
                      marginBottom: -8,
                    }}>
                    Title
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor={Font.placeholder}
                    placeholder="Title"
                    onChangeText={val => {
                      settitle(val);
                    }}
                  />

                  <Text
                    style={{
                      marginLeft: '5.5%',
                      fontSize: 15,
                      color: Font.LabelColor,
                      marginTop: 5,
                      marginBottom: -8,
                    }}>
                    Price
                  </Text>

                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor={Font.placeholder}
                    placeholder="Price"
                    keyboardType="numeric"
                    onChangeText={val => {
                      const getPrice = Number(val);
                      if (getPrice < 0) {
                        alert('Price should be positive');
                      } else {
                        setprice(val);
                      }
                    }}
                  />

                  <Text
                    style={{
                      marginLeft: '5.5%',
                      fontSize: 15,
                      color: Font.LabelColor,
                      marginTop: 5,
                      marginBottom: -8,
                    }}>
                    Condition
                  </Text>

                  <DropDownPicker
                    placeholderStyle={{
                      color: Font.placeholder,
                    }}
                    placeholder="Select condition"
                    open={open}
                    value={condition}
                    items={items}
                    setOpen={setOpen}
                    setValue={setcondition}
                    setItems={setItems}
                    multiple={false}
                    style={styles.dropDown}
                  />

                  <Text
                    style={{
                      marginLeft: '5.5%',
                      fontSize: 15,
                      color: Font.LabelColor,
                      marginTop: 5,
                      marginBottom: -8,
                    }}>
                    Description
                  </Text>

                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor={Font.placeholder}
                    placeholder="Description"
                    onChangeText={val => setdescription(val)}
                  />
                  <Text
                    style={{
                      marginLeft: '5.5%',
                      fontSize: 15,
                      color: Font.LabelColor,
                      marginTop: 5,
                      marginBottom: -8,
                    }}>
                    Quantity
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor={Font.placeholder}
                    placeholder="Quantity"
                    keyboardType="numeric"
                    onChangeText={val => {
                      const getQuantity = Number(val);
                      if (getQuantity < 0) {
                        alert('Quantity should be positive');
                      } else {
                        setquantity(val);
                      }
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: '#8739F9',
                    width: '90%',
                    alignItems: 'center',
                    marginBottom: 20,
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginTop: 15,
                  }}
                  onPress={() => {
                    if (
                      price !== '' &&
                      title !== '' &&
                      condition !== '' &&
                      description !== '' &&
                      location !== '' &&
                      category !== '' &&
                      quantity != ''
                    ) {
                      postAd();
                    } else {
                      alert('Enter all fields please!!!');
                    }
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    marginTop: -100,
    flex: 1,
    justifyContent: 'space-around',
  },

  textInput: {
    height: 30,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#8739F9',
    padding: 40,

    alignItems: 'center',
    margin: 10,
    marginTop: 50,
  },
  dropDown: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 7,
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '90%',
  },
  inputText: {
    padding: 10,
    borderBottomWidth: 0.3,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 7,
    marginBottom: 10,
    color: Font.TextColor,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
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
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    color: Font.LabelColor,
  },
});

export default ShopOwnerSell;

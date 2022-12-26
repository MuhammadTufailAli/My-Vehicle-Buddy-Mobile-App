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
  ActivityIndicator,
  Platform,
  Keyboard,
  Modal,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../Loader/Loader';
import {Font} from '../font/Font';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CartProvider from '../ContextApi/contextApi';
import port from '../Port/Port';

import axios from 'axios';

const ShopOwnerEditProduct = ({navigation, route}) => {
  let Condition = [
    {
      value: 'New',
    },
    {
      value: 'Used-like new',
    },
    {
      value: 'Used-Good',
    },
    {
      value: 'Used-Fair',
    },
  ];

  const {userdetails, setuserdetails} = useContext(CartProvider);
  const [Images, setImages] = useState([]);
  const [price, setprice] = useState();
  const [title, settitle] = useState();
  const [condition, setcondition] = useState();
  const [description, setdescription] = useState();
  const [location, setlocation] = useState();
  const [subCategory, setSubCategory] = useState();
  const [category, setcategory] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [quantity, setquantity] = useState();
  const [getcondition, setcondition1] = useState(true);
  const [dataarray, setdataarray] = useState([]);
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    {label: 'New', value: 'New'},
    {label: 'Used-like new', value: 'Used-like new'},
    {label: 'Used-Good', value: 'Used-Good'},
    {label: 'Used-Fair', value: 'Used-Fair'},
  ]);

  //Get Product details
  const getproductDetails = async () => {
    console.log('I am called');
    try {
      const result = await axios.get(
        `${port.herokuPort}/product/singleproduct/${route.params?.doc._id}`,
      );

      console.log(result.data.data.doc.place);
      setdataarray(result.data.data.doc);
      setprice(result.data.data.doc?.price);
      settitle(result.data.data.doc?.title);
      setcondition(result.data.data.doc?.condition);
      setdescription(result.data.data.doc?.description);
      setlocation(result.data.data.doc?.place);
      setSubCategory(result.data.data.doc?.subcategory);
      setcategory(result.data.data.doc?.category);
      setImageUrl(result.data.data.doc?.imageUrl);
      setquantity(result.data.data.doc?.quantity);

      setcondition1(false);
    } catch (err) {
      console.log(err.response.data);
      alert('Error');
    }
  };

  //Update Product Details
  const updateAd = async () => {
    const productData = {
      place: location,
      description: description,

      title: title,

      price: price,
      category: category,
      subcategory: subCategory,
      quantity: quantity,
      refOfUser: userdetails?._id,
      imageUrl: imageUrl,
    };

    try {
      const result = await axios.patch(
        `${port.herokuPort}/product/updateProduct/${route.params?.doc._id}`,
        productData,
      );

      alert('Product updated successfully');
      navigation.navigate('Profile');
    } catch (err) {
      console.log(err);
    }
  };

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
        console.log(data.url);
        var newUrl = data.url.slice(0, 4) + 's' + data.url.slice(4);

        setImageUrl(imageUrl => [...imageUrl, newUrl]);
      });
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
          setImages(Images => [...Images, image.path]);
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

  React.useEffect(() => {
    getproductDetails();
  }, []);

  if (getcondition) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Loader />
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
    );
  }

  return (
    <ScrollView style={{backgroundColor: '#DCDCDC'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={{marginTop: 20}}>
              <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                <Text
                  style={{
                    fontSize: 26,
                    marginTop: 90,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: Font.TextColor,
                  }}>
                  Edit <Text style={{color: '#8739F9'}}>Product</Text>
                </Text>
              </View>

              {Images ? (
                <View
                  style={{
                    marginBottom: 20,
                    marginTop: 30,
                  }}>
                  <FlatList
                    horizontal={true}
                    data={imageUrl}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{
                            marginLeft: 8,
                            marginTop: 8,
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
                        </View>
                      );
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl([]);
                      setImages([]);
                      openImagePicker();
                    }}
                    style={{
                      alignItems: 'center',
                      marginLeft: 7,
                      marginTop: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#8739F9',
                        fontWeight: 'bold',
                      }}>
                      Change Product Photo
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <FlatList
                    horizontal={true}
                    data={Images}
                    renderItem={({item, index}) => {
                      console.log('WITH');
                      return (
                        <View
                          style={{
                            marginLeft: 8,
                            marginTop: 8,
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
                        </View>
                      );
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl([]);
                      setImages([]);
                      openImagePicker();
                    }}
                    style={{
                      alignItems: 'center',
                      marginLeft: 7,
                      marginTop: -10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#8739F9',
                        fontWeight: 'bold',
                      }}>
                      Change Product Photo
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text
                style={{
                  marginTop: 30,
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
                        placeholder={'City: ' + location}
                        placeholderTextColor={Font.TextColor}
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
                  placeholder={'Title : ' + title}
                  placeholderTextColor={Font.LightColor}
                  onChangeText={val => settitle(val)}
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
                  placeholder={'Price : ' + dataarray?.price.toString()}
                  placeholderTextColor={Font.LightColor}
                  keyboardType="numeric"
                  onChangeText={val => setprice(val)}
                />

                {/* <Text
                  style={{
                    marginLeft: '5.5%',
                    fontSize: 15,
                    color: Font.LabelColor,
                    marginTop: 5,
                    marginBottom: -8,
                  }}>
                  Condition
                </Text> */}

                {/* <DropDownPicker
                  placeholderStyle={{
                    color: Font.LightColor,
                  }}
                  placeholder="Condition"
                  open={open}
                  value={Condition}
                  items={items}
                  setOpen={setOpen}
                  setValue={setcondition}
                  setItems={setItems}
                  multiple={false}
                  style={styles.dropDown}
                /> */}

                {/* <Dropdown
                  // style={styles.dropDown}
                  label={'Condition : ' + dataarray?.condition}
                  data={Condition}
                  onChangeText={val => setcondition(val)}
                /> */}

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
                  placeholder={'Description : ' + dataarray?.description}
                  placeholderTextColor={Font.LightColor}
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
                  placeholder={'Quantity : ' + dataarray?.quantity.toString()}
                  placeholderTextColor={Font.LightColor}
                  keyboardType="numeric"
                  onChangeText={val => setquantity(val)}
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
                  updateAd();
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
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
  row: {
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    color: Font.LabelColor,
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
});

export default ShopOwnerEditProduct;

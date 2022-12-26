import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  ListItem,
} from 'react-native';
// import Constants from 'expo-constants';
import port from '../Port/Port';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CartProvider from '../ContextApi/contextApi';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Font} from '../font/Font';
const CustomerVehicleSale = ({navigation, route}) => {
  // var arr = AsyncStorage.getItem('@store1:key');
  var {ar} = route.params;
  const {userdetails, setuserdetails, token} = useContext(CartProvider);
  const [username, setuname] = useState(
    userdetails.firstname + ' ' + userdetails.lastname,
  );
  const [phonenum, setphonenum] = useState();
  var [images, setImages] = useState([]);
  var [ImageUrl, setImageUrl] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [IndexOf, setIndexOf] = useState(false);

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

  const sendrequest = async () => {
    console.log('The Image url is ');
    console.log(ImageUrl);
    const productData = {
      refOfUser: userdetails._id,
      Name: ar[0].Name,
      Engine_Type: ar[0].Engine_Type,
      Transmission: ar[0].Transmission,
      Color: ar[0].Color,
      Assembly: ar[0].Assembly,
      Body_Type: ar[0].Body_Type,
      Mileage: ar[0].Mileage,
      Model_Year: ar[0].Model_Year,
      City: ar[0].City,
      Capacity: ar[0].Capacity,
      Price: ar[0].Price,
      Features: ar[0].Features,
      Username: username,
      User_Contact: phonenum,
      imageUrl: ImageUrl,
    };

    try {
      const result = await axios.post(
        `${port.herokuPort}/car/addcar`,
        productData,
      );
      console.log(result.data);

      alert('Ad posted successfully');
    } catch (err) {
      console.log('Error', err);
      alert(err.response.data.message);
    }

    // fetch(`${port.herokuPort}/car/addcar`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({

    //   }),
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //   })
    //   .catch(error => console.log('error', error));
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fcfd',
      }}>
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
      <View
        style={{
          backgroundColor: '#829460',
          padding: 6,
          width: '100%',
          height: 83,
        }}>
        <View style={styles.header}>
          <Text style={styles.text1}>Car Price Prediction.</Text>
          <Image
            style={{
              resizeMode: 'cover',
              height: 90,
              width: 100,
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1048/1048315.png',
            }}
          />
        </View>
      </View>
      <FlatList
        style={{marginTop: 10, width: '100%'}}
        data={ar}
        renderItem={({item}) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 20,
                }}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/741/741407.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Name}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/3462/3462067.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Price}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2413/2413653.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Model_Year}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 20,
                }}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2384/2384796.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Engine_Type}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2061/2061918.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Transmission}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2202/2202865.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Color}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 20,
                }}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/7425/7425459.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Assembly}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1048/1048315.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Body_Type}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1599/1599739.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Mileage}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 20,
                }}>
                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/562/562460.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.City}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/7654/7654868.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Capacity}
                  </Text>
                </View>

                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 1.5,
                    shadowRadius: 2,
                    elevation: 4,
                  }}>
                  <Image
                    style={{
                      resizeMode: 'cover',
                      height: 33,
                      width: 33,
                      marginLeft: 20,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/1541/1541425.png',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color: Font.TextColor,
                    }}>
                    {item?.Features}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View>
        <Text
          style={{
            fontSize: 18,
            marginRight: 140,
            marginTop: 20,
            fontWeight: 'bold',
            color: '#829460',
          }}>
          Enter Your Details
        </Text>
      </View>
      <View style={{width: '90%'}}>
        {ImageUrl.length == 0 ? (
          <TouchableOpacity
            onPress={openImagePicker}
            style={{
              backgroundColor: '#8739F9',
              padding: 40,
              alignItems: 'center',
              borderWidth: 0.5,
              borderColor: 'grey',
              marginBottom: 20,
              marginTop: 30,
              borderRadius: 10,
            }}>
            <Text style={styles.buttonText}>
              <Entypo name={'camera'} size={27} color={'white'} /> Add Photo
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
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            value={username}
            onChangeText={username => setuname(username)}
            placeholder={
              userdetails.firstname
                ? userdetails.firstname + ' ' + userdetails.lastname
                : 'Enter your name'
            }
            placeholderTextColor="#8b9cb5"
            clearButtonMode="always"
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            value={phonenum}
            maxLength={11}
            onChangeText={phonenum => setphonenum(phonenum)}
            placeholder="Phone Number" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="number-pad"
            underlineColorAndroid="#f000"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{
            width: 100,
            padding: 10,
            backgroundColor: '#829460',

            marginLeft: 179,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 9,
          }}
          onPress={() => {
            sendrequest();
          }}>
          <Text style={styles.buttontext}>Submit...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerVehicleSale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fffff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
    color: Font.TextColor,
  },
  buttonstyle: {
    width: 100,
    height: 25,
    backgroundColor: '#829460',

    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  buttontext: {
    color: 'white',
    fontSize: 14,
    padding: 0,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 47,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalView: {
    margin: 20,

    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {io} from 'socket.io-client';
import CartProvider from '../ContextApi/contextApi';
import {Font} from '../font/Font';
import Loader from '../Loader/Loader';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import port from '../Port/Port';

const ShopOwnerHome = ({navigation}) => {
  // const socket = useRef();
  const {userdetails, setOnlineUsers, socket} = useContext(CartProvider);
  const [cond, setcond] = useState(true);
  const [array, setarray] = useState([]);
  const [dataarray, setdataarray] = useState([]);
  const [condition, setconditon] = useState(true);
  const [condition1, setconditon1] = useState(true);

  const getproduct = async () => {
    try {
      const result = await axios.get(
        `${port.herokuPort}/ShopOwnerBuyingNotificationRoute/getNotification/${userdetails._id}`,
      );

      setarray(result.data.data);
      setconditon1(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }

    try {
      const result = await axios.get(
        `${port.herokuPort}/product/shopOwnerProducts/${userdetails._id}`,
      );

      setconditon(false);
      setdataarray(result.data.data);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  //Adding user to socket io and getting user from socket io
  useEffect(() => {
    socket.current.emit('addUser', userdetails._id);
    socket.current.on('getUsers', users => {
      setOnlineUsers(users);
    });
  }, []);

  const Slider = () => {
    const [getImage, setImage] = useState([
      'https://www.dreamhost.com/blog/wp-content/uploads/2019/06/afa314e6-1ae4-46c5-949e-c0a77f042e4f_DreamHost-howto-prod-descrips-full-750x500.jpeg',
      'https://w0.peakpx.com/wallpaper/295/998/HD-wallpaper-red-graph-on-black-background-analysis-finance-concepts-graph-background-diagram-analytics-concepts-business-background-finance-graph-background.jpg',
      'https://w0.peakpx.com/wallpaper/974/615/HD-wallpaper-blue-technology-background-communication-social-network-background-communication-background-earth-blue-background.jpg',
    ]);

    return (
      <SliderBox
        images={getImage}
        sliderBoxHeight={130}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor="#8739F9"
        inactiveDotColor="white"
        paginationBoxVerticalPadding={10}
        autoplay
        circleLoop
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        ImageComponentStyle={{
          borderRadius: 15,
          width: '92%',
          marginTop: 5,
          height: '95%',
        }}
        imageLoadingColor="#2196F3"
      />
    );
  };

  const Features = () => {
    return (
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            // padding: 10,
            marginLeft: 15,
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={() => {
              navigation.navigate('SELL');
            }}>
            <View
              style={{
                flex: 4.5,
                backgroundColor: Font.ButtonColor,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <FontAwesome
                style={styles.iconsStyle}
                name="plus-circle"
                size={70}
                color={Font.TextColor2}
              />
              <Text style={styles.text4}>Sell Product</Text>

              <Text style={styles.text5}>On one touch</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 5}}>
                <AntDesign
                  name="arrowright"
                  size={22}
                  color={Font.LabelColor}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonstyle2}
            onPress={() => {
              navigation.navigate('Setting');
            }}>
            <View
              style={{
                flex: 4.5,
                backgroundColor: 'white',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <Ionicons
                name="build"
                size={70}
                color={Font.ButtonColor}
                style={styles.iconsStyle}
              />
              <Text style={styles.text6}>Manage Shop</Text>
              <Text style={styles.text7}>Easy to Manage</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: Font.ButtonColor,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 5}}>
                <AntDesign name="arrowright" size={22} color={'white'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonstyle2}
            onPress={() => {
              navigation.navigate('Messenger');
            }}>
            <View
              style={{
                flex: 4.5,
                backgroundColor: 'white',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <Fontisto
                name="messenger"
                size={68}
                color={Font.ButtonColor}
                style={{
                  alignSelf: 'center',
                  height: 68,
                  width: 68,
                  marginTop: 5,
                }}
              />
              <Text style={styles.text6}>Messenger</Text>
              <Text style={styles.text7}>Quick Chat</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: Font.ButtonColor,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 5}}>
                <AntDesign name="arrowright" size={22} color={'white'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonstyle2}
            onPress={() => {
              navigation.navigate('ShopOwnerNotification');
            }}>
            <View
              style={{
                flex: 4.5,
                backgroundColor: 'white',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <Ionicons
                name="notifications"
                size={70}
                color={Font.ButtonColor}
                style={styles.iconsStyle}
              />
              <Text style={styles.text6}>Notification</Text>
              <Text style={styles.text7}>Instant Alert</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: Font.ButtonColor,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 5}}>
                <AntDesign name="arrowright" size={22} color={'white'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const TotalSummary = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [getCash, setCash] = useState(10);

    if (condition || condition1) {
      return (
        <View>
          <Lottie
            style={{
              marginTop: -40,
              width: 250,
              height: 250,
              alignSelf: 'center',
            }}
            source={require('../../assets/loader.json')}
            autoPlay
            loop
          />
          <Text
            style={{
              marginTop: -125,
              fontSize: 16,
              fontWeight: '700',
              marginLeft: 10,
              color: Font.LabelColor,
              textAlign: 'center',
            }}>
            Fetching Data for You
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', marginLeft: 7}}>
          {/* Total sold */}
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle3}
              onPress={() => {
                navigation.navigate('ShopOwnerNotification');
              }}>
              <View
                style={{
                  flex: 4,
                  backgroundColor: Font.ButtonColor,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: '700',
                    alignSelf: 'center',
                    color: 'white',
                    marginTop: 10,
                  }}>
                  {array.length}
                </Text>
                <Text
                  style={{alignSelf: 'center', color: 'white', fontSize: 15}}>
                  Total Sold
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <Text style={{color: Font.LabelColor, alignSelf: 'center'}}>
                  View History
                </Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 5,
                  }}></TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          {/* Total products */}
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle3}
              onPress={() => {
                navigation.navigate('ShopOwnerProfile');
              }}>
              <View
                style={{
                  flex: 4,
                  backgroundColor: 'rgba(255, 255, 255, 255)',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: '700',
                    alignSelf: 'center',
                    color: Font.LabelColor,
                    marginTop: 10,
                  }}>
                  {dataarray.length}
                </Text>
                <Text
                  style={{alignSelf: 'center', color: '#979ea4', fontSize: 15}}>
                  Total Products
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Font.ButtonColor,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  View All
                </Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 5,
                  }}></TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          {/* Total Earning */}
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle3}
              onPress={() => {
                navigation.navigate('ShopOwnerNotification');
              }}>
              <View
                style={{
                  flex: 4,
                  backgroundColor: 'rgba(255, 255, 255, 255)',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: '700',
                    alignSelf: 'center',
                    color: Font.LabelColor,
                    marginTop: 10,
                  }}>
                  {userdetails.earning}
                </Text>
                <Text
                  style={{alignSelf: 'center', color: '#979ea4', fontSize: 15}}>
                  Total Earning
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Font.ButtonColor,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  View All
                </Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 5,
                  }}></TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.topContainer}>
      {/* Name Area */}
      <View style={{flex: 1}}>
        <Ionicons
          name="car-sport"
          size={40}
          color={Font.LabelColor}
          style={{alignSelf: 'center'}}
        />
        <View style={styles.header}>
          <Text style={styles.text1}>
            Welcome, {userdetails.firstname} {userdetails.lastname}
          </Text>
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => {
              navigation.navigate('ShopOwnerNotification');
            }}>
            <Ionicons name="notifications" size={30} color={Font.ButtonColor} />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 15, marginLeft: 15}}>
          <Text style={styles.text2}>
            To MY VEHICLE
            <Text style={{color: Font.LabelColor}}> BUDDY</Text>
          </Text>
        </View>
      </View>
      {/* Slider view */}
      <View style={{flex: 2, marginTop: 10}}>
        <Slider />
      </View>
      {/* Bottom Part */}
      {userdetails.shop === 'No Shop' ? (
        <View>
          <Lottie
            style={{
              width: 270,
              height: 330,
              alignSelf: 'center',
              marginTop: -14,
            }}
            source={require('../../assets/Shop Closed.json')}
            autoPlay
            loop
          />
          <View style={{marginTop: -50}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginBottom: 5,
                color: Font.TextColor,
              }}>
              Let's create a Shop first
            </Text>
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
                // borderRadius: '50%',
              }}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
                Create Shop
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{flex: 4, marginBottom: 15, justifyContent: 'space-around'}}>
          <View>
            <View style={{marginTop: 10, marginLeft: 15}}>
              <Text style={styles.text3}>Top Features</Text>
            </View>

            <Features />
          </View>

          <View>
            <View style={{marginTop: 10, marginLeft: 15}}>
              <Text style={styles.text3}>Summary</Text>
            </View>

            <TotalSummary />
          </View>
        </View>
      )}
    </View>
  );
};

export default ShopOwnerHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    backgroundColor: 'rgba(235, 238, 242, 255)',
    display: 'flex',
    flex: 1,
  },
  header: {
    marginLeft: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
  },
  sliderBox: {
    marginTop: 15,
    marginBottom: 19,
  },
  iconsStyle: {
    alignSelf: 'center',
    width: 70,
  },
  iconsStyle2: {
    alignSelf: 'center',
    marginTop: 5,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#979ea4',
    marginTop: 5,
  },
  text2: {
    fontSize: 20,
    fontWeight: '700',
    color: Font.LabelColor,
  },
  text3: {
    fontSize: 16,
    color: Font.LabelColor,

    fontWeight: '700',
  },
  text4: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#f4f4f4',
  },
  text6: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Font.LabelColor,
  },
  text5: {
    fontSize: 14,
    marginLeft: 10,
    color: '#f4f4f4',
  },
  text7: {
    fontSize: 14,
    marginLeft: 10,
    color: Font.LabelColor,
  },
  buttonstyle: {
    height: 150,
    width: 135,
    borderRadius: 15,

    marginRight: 7,
  },
  buttonstyle3: {
    height: 120,
    width: '95%',
    borderRadius: 15,

    marginRight: 7,
  },

  buttonstyle2: {
    flex: 1,
    height: 150,
    width: 135,
    borderRadius: 15,
    marginRight: 7,
    backgroundColor: Font.TextColor2,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    borderRadius: 5,
    margin: 10,
    padding: 5,
    elevation: 2,
    backgroundColor: '#1A3C40',
  },
  viewbutton: {
    marginLeft: 230,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

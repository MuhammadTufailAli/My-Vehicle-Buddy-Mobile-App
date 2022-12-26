import React, {useState, useContext, useEffect, useRef} from 'react';
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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {ScrollView} from 'react-native-gesture-handler';
import port from '../Port/Port';
const CustomerHome = ({navigation}) => {
  // const socket = useRef();
  const {userdetails, setOnlineUsers, socket} = useContext(CartProvider);
  const [cond, setcond] = useState(true);

  //Adding user to socket io and getting user from socket io
  useEffect(() => {
    socket.current.emit('addUser', userdetails._id);
    socket.current.on('getUsers', users => {
      setOnlineUsers(users);
    });
  }, []);
  const Slider = () => {
    const [getImage, setImage] = useState([
      'https://t4.ftcdn.net/jpg/03/90/71/57/360_F_390715748_JS1Q9c0FRxAfhlO0oMPZdFvrlkx163AF.jpg',
      'https://kiamotors-portqasim.com/wp-content/uploads/2020/03/Full-Car-Service.jpg',
      'https://www.investopedia.com/thmb/expg8128rWcMNUqI9CNhURkoto0=/1920x1080/filters:fill(auto,1)/162971_VE-ALT_howToSellCar-5a8dd0c4d8fdd50037949800.jpg',
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
          marginTop: 10,
          height: 150,
        }}
        imageLoadingColor="#2196F3"
      />
    );
  };

  const Features = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [getCash, setCash] = useState(10);

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 15,
            marginTop: 10,
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                navigation.navigate('Mechanic');
              }}>
              <View
                style={{
                  flex: 4.5,
                  backgroundColor: Font.ButtonColor,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    height: 60,
                    width: 60,
                    marginLeft: -5,
                    marginTop: 5,
                  }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1995/1995470.png',
                  }}
                />
                <Text style={styles.text4}>Mechanic</Text>
                <Text style={styles.text5}>Fast service</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 5}}>
                  <AntDesign
                    name="arrowright"
                    size={22}
                    color={Font.LabelColor}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle2}
              onPress={() => {
                navigation.navigate('Prediction');
              }}>
              <View
                style={{
                  flex: 4.5,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="google-analytics"
                  size={70}
                  color={Font.ButtonColor}
                />
                <Text style={styles.text6}>Prediction</Text>
                <Text style={styles.text7}>Predict Price</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Font.ButtonColor,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 5}}>
                  <AntDesign name="arrowright" size={22} color={'white'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle2}
              onPress={() => {
                navigation.navigate('Buy');
              }}>
              <View
                style={{
                  flex: 4.5,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  alignItems: 'center',
                }}>
                <Fontisto
                  name="shopping-store"
                  size={68}
                  color={Font.ButtonColor}
                  style={{marginTop: 4}}
                />
                <Text style={styles.text6}>Store</Text>
                <Text style={styles.text7}>Easy to buy</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Font.ButtonColor,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 5}}>
                  <AntDesign name="arrowright" size={22} color={'white'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 15,
            marginTop: 10,
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle2}
              onPress={() => {
                navigation.navigate('Sell');
              }}>
              <View
                style={{
                  flex: 4.5,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  alignItems: 'center',
                }}>
                <FontAwesome
                  name="plus-circle"
                  size={70}
                  color={Font.ButtonColor}
                  style={{width: 70, height: 70}}
                />

                <Text style={styles.text6}>Sell Vehicle</Text>
                <Text style={styles.text7}>Easy to Sell</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: Font.ButtonColor,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 5}}>
                  <AntDesign name="arrowright" size={22} color={'white'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                navigation.navigate('CustomerVehicleBuy');
              }}>
              <View
                style={{
                  flex: 4.5,
                  backgroundColor: Font.ButtonColor,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    height: 70,
                    width: 70,
                    alignContent: 'center',
                    marginTop: 5,
                  }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1019/1019607.png',
                  }}
                />
                <Text style={styles.text4}>Buy Vehicle</Text>
                <Text style={styles.text5}>Easy to Buy</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 5}}>
                  <AntDesign
                    name="arrowright"
                    size={22}
                    color={Font.LabelColor}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                navigation.navigate('CustomerNotifiation');
              }}>
              <View
                style={{
                  flex: 4.5,
                  backgroundColor: Font.ButtonColor,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="notifications"
                  size={70}
                  color="white"
                  style={styles.iconsStyle}
                />
                <Text style={styles.text4}>Notification</Text>
                <Text style={styles.text5}>Instant</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 5}}>
                  <AntDesign
                    name="arrowright"
                    size={22}
                    color={Font.LabelColor}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.topContainer}>
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
              navigation.navigate('Messenger');
            }}>
            <Fontisto
              name="messenger"
              size={30}
              color={Font.ButtonColor}
              style={{marginRight: 5}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 15, marginLeft: 15}}>
          <Text style={styles.text2}>
            To MY VEHICLE
            <Text style={{color: Font.LabelColor}}> BUDDY</Text>
          </Text>
        </View>
      </View>
      <View style={{flex: 7, marginTop: 20, justifyContent: 'space-around'}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1.2}}>
            <Slider />
          </View>
          <View style={{flex: 3}}>
            <View style={{marginTop: 10, marginLeft: 15, flex: 1}}>
              <Text style={styles.text3}>TOP FEATURES</Text>
            </View>
            <View style={{flex: 8}}>
              <Features />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomerHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'rgba(235, 238, 242, 255)',
  },

  header: {
    marginLeft: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderBox: {
    marginTop: 15,
    marginBottom: 19,
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

    color: '#f4f4f4',
  },
  text7: {
    fontSize: 14,
    marginLeft: 10,
    color: Font.LabelColor,
  },
  buttonstyle: {
    height: 150,
    width: '95%',
    borderRadius: 15,

    marginRight: 7,
  },
  buttonstyle3: {
    felx: 1,
    height: 120,
    width: '95%',
    borderRadius: 15,
    marginRight: 7,
  },

  buttonstyle2: {
    height: 150,
    width: '95%',
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

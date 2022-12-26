import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  Modal,
  Pressable,
} from 'react-native';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import port from '../Port/Port';

import axios from 'axios';

import Icons from 'react-native-vector-icons/Ionicons';

import {ActivityIndicator, MD2Colors} from 'react-native-paper';

import StarRating from 'react-native-star-rating-widget';
const Feedback = () => {
  let url = `${port.herokuPort}/`;

  const Tab = createBottomTabNavigator();

  const Feedback = ({navigation, route}) => {
    const [getlist, setlist] = useState([]);
    const [getfeedback, setfeedback] = useState([]);

    const [getcondition, setcondition] = useState(true);
    const [getmodalvisible, setModalVisible] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
      axios
        .get(`${url}feedback/getfeedback`)
        .then(res => {
          console.log(res.data);
          setlist(res.data);
          setcondition(false);
        })
        .catch(err => {
          console.log(err);
        });
      return () => {
        setlist([]);
      };
    }, []);

    const sendrequest = () => {
      axios
        .post(`${url}feedback/addfeedback`, {
          username: 'Soooban',
          userfeedback: getfeedback,
          userimage:
            'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg',
        })
        .then(res => {
          console.log(res);
          setModalVisible(true);
        })
        .catch(err => {
          console.log(err);
        });
    };
    if (getcondition) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 30,
          }}>
          <ActivityIndicator animating={true} color="brown" />

          <Text>Waiting for response</Text>
        </View>
      );
    }
    const onRefresh = async () => {
      setIsFetching(true);
      await sleep(2000);
      setIsFetching(false);
    };
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f9fcfd'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fffafd',
          }}>
          <Modal animationType="fade" visible={getmodalvisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Lexend-Regular',
                    fontWeight: '400',
                  }}>
                  Your feedback has been posted
                </Text>
                <View>
                  <Icon name="verified" color="green" size={40} />
                </View>
                <View>
                  <Pressable
                    style={{
                      backgroundColor: '#1A3C40',
                      width: 120,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 7,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('Feedback');
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                        fontFamily: 'Lexend-Regular',
                      }}>
                      Go Back home
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{backgroundColor: '#1A3C40', padding: 6}}>
          <View style={styles.header}>
            <Text style={styles.text1}>Feedback.</Text>
            <Icon name="feedback" color="white" size={40} />
          </View>
        </View>
        <View>
          <View style={{marginTop: 15, padding: 5}}>
            <TextInput
              placeholder="Enter your Feedback..."
              style={{
                margin: 5,
                padding: 5,
                backgroundColor: 'white',
                color: 'grey',
                shadowColor: '#000',
                height: 39,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
              onChangeText={setfeedback}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                sendrequest();
              }}>
              <Text style={styles.buttontext}>Post</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonstyle} onPress={() => {}}>
              <Text style={styles.buttontext}>Via Email</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 15, height: 350}}>
            <FlatList
              onRefresh={onRefresh}
              refreshing={isFetching}
              showsVerticalScrollIndicator={false}
              data={getlist}
              renderItem={({item}) => {
                return (
                  <View style={styles.cartCard}>
                    <View style={styles.circle}>
                      <Image
                        source={{uri: item.userimage}}
                        style={{height: 80, width: 80}}
                      />
                    </View>
                    <View
                      style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          fontFamily: 'Lexend-Regular',
                          fontWeight: '400',
                        }}>
                        {item.username}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'Lexend-Regular',
                          fontWeight: '400',
                        }}>
                        {item.userfeedback}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const FAQs = props => {
    const [filtered, setFilterted] = useState('');
    const [search, setSearch] = useState('');
    const [getfaqs, setfaqs] = useState();
    useEffect(() => {
      axios.get(`${url}faqs/getfaq`).then(res => {
        console.log(res.data);
        setfaqs(res.data);
      });
      return () => {
        setfaqs([]);
      };
    }, []);
    const updateSearch = search => {
      const d = getfaqs.filter(item => {
        return item.Question.match(search);
      });

      setSearch(search);
      setFilterted(d);
    };
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f9fcfd'}}>
        <View style={{backgroundColor: '#1A3C40', padding: 6}}>
          <View style={styles.header}>
            <Text style={styles.text1}>FAQs.</Text>
            <Ico name="chat-question" color="white" size={40} />
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              paddingHorizontal: 20,
            }}>
            <View style={styles.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                style={{flex: 1, fontSize: 18}}
                placeholder="Search for FAQs"
                onChangeText={updateSearch}
              />
            </View>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filtered.length > 0 ? filtered : getfaqs}
            renderItem={({item}) => {
              return (
                <View style={styles.cartCard2}>
                  <View
                    style={{
                      height: 100,
                      marginLeft: 10,
                      paddingVertical: 20,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginBottom: 8,
                        fontFamily: 'Lexend-Regular',
                      }}>
                      {item.Question}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        fontFamily: 'Lexend-Regular',
                        fontWeight: '400',
                      }}>
                      {item.Answer}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

  const Reviews = () => {
    const [getrev, setrev] = useState();
    const [getRating, setRating] = useState(0);
    const [getReview, setReview] = useState([]);

    const sendrequest = () => {
      axios
        .post(`${url}userreview/adduserreview`, {
          UserName: 'Soooban',
          UserReview: getrev,
          UserRating: getRating,
          UserImage:
            'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg',
        })
        .then(res => {
          console.log(res);
          setModalVisible(true);
        })
        .catch(err => {
          console.log(err);
        });
    };
    useEffect(() => {
      axios.get(`${url}userreview/getusereview`).then(res => {
        console.log(res.data);
        setReview(res.data);
        setcondition(false);
      });
      return () => {
        setReview([]);
      };
    }, []);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f9fcfd'}}>
        <View style={{backgroundColor: '#1A3C40', padding: 4}}>
          <View style={styles.header}>
            <Text style={styles.text2}>Suggest Changes</Text>
            <Icons
              name="ios-chatbubble-ellipses-outline"
              color="white"
              size={32}
            />
          </View>
        </View>

        <View>
          <View style={{marginTop: 15, padding: 5}}>
            <TextInput
              placeholder="Suggest us changes"
              style={{
                margin: 5,
                padding: 5,
                backgroundColor: 'white',
                color: 'grey',
                shadowColor: '#000',
                height: 70,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
              }}
              onChangeText={setrev}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{fontFamily: 'Lexend-Regular', fontWeight: '400'}}>
              Rate Us:{' '}
            </Text>
            {/* <StarRating rating={getRating} onChange={setRating} starSize={20} /> */}

            <AirbnbRating
              showRating={false}
              count={5}
              reviews={['Terrible', 'Bad', 'Normal', 'Good', 'Excellent']}
              defaultRating={0}
              size={20}
              onFinishRating={rating => {
                setRating(rating);
              }}
            />
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                sendrequest();
              }}>
              <Text style={styles.buttontext}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1A3C40',
              marginRight: 100,
              fontFamily: 'Lexend-Regular',
            }}>
            Users Suggestion
          </Text>
        </View>
        <View style={{marginTop: 15, height: 350}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getReview}
            renderItem={({item}) => {
              return (
                <View style={styles.cartCard}>
                  <View style={styles.circle}>
                    <Image
                      source={{uri: item.UserImage}}
                      style={{height: 80, width: 80}}
                    />
                  </View>
                  <View
                    style={{
                      height: 100,
                      marginLeft: 10,
                      paddingVertical: 20,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        fontFamily: 'Lexend-Regular',
                        fontWeight: '400',
                      }}>
                      {item.UserName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        fontFamily: 'Lexend-Regular',
                        fontWeight: '400',
                      }}>
                      {item.UserReview}
                    </Text>
                    {/* <StarRating rating={item.UserRating} starSize={20} /> */}

                    <AirbnbRating
                      showRating={false}
                      count={5}
                      reviews={[
                        'Terrible',
                        'Bad',
                        'Normal',
                        'Good',
                        'Excellent',
                      ]}
                      defaultRating={item.UserRating}
                      size={20}
                      isDisabled
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          size = 32;
          if (route.name === 'Feedback') {
            return (
              <MaterialCommunityIcons
                name={'message-processing-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'FAQs') {
            return (
              <Icons
                name={'ios-information-circle'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Reviews') {
            return <Icons name="notifications" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#315559',
      })}>
      <Tab.Screen
        name="Feedback"
        component={Feedback}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="FAQs"
        component={FAQs}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Reviews"
        component={Reviews}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: 'white',
    padding: 8,
  },
  buttonstyle: {
    width: 100,
    height: 25,
    backgroundColor: '#315559',

    marginRight: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  buttontext: {
    color: 'white',
    fontSize: 14,
    padding: 0,
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
  },
  view: {
    margin: 0,
    backgroundColor: '#fff',
    padding: 0,
    marginVertical: 0,
    borderRadius: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 100,
    fontFamily: 'Lexend-Regular',
  },
  text2: {
    fontSize: 15,
    color: '#1A3C40',
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
  },
  cartCard: {
    height: 160,
    elevation: 15,
    backgroundColor: '#ffff',
    marginVertical: 2,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartCard2: {
    flexShrink: 1,
    height: 150,
    elevation: 15,
    backgroundColor: '#c1dbdb',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 0,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
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
});

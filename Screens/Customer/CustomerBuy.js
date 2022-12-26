import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SliderBox} from 'react-native-image-slider-box';
import port from '../Port/Port';

import axios from 'axios';

import Loader from '../Loader/Loader';
import {Font} from '../font/Font';
import Lottie from 'lottie-react-native';

function CustomerBuy({navigation}) {
  const [selectCategory, setselectcategory] = React.useState('');
  const [color1, setColor1] = React.useState('#8739F9');
  const [color2, setColor2] = React.useState('black');
  const [w1, setw1] = React.useState(1);
  const [w2, setw2] = React.useState(0);
  const [font1, setfont1] = React.useState('bold');
  const [font2, setfont2] = React.useState('normal');

  const Slider = () => {
    const [getImage, setImage] = useState([
      require('../../assets/autoparts.jpg'),
      require('../../assets/carspray.jpg'),
      require('../../assets/carraccc.jpg'),
      require('../../assets/cartyre.jpg'),
    ]);
    return (
      <SliderBox
        images={getImage}
        sliderBoxHeight={200}
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
          width: '96%',
          marginTop: 10,
          height: 255,
        }}
        imageLoadingColor="#2196F3"
      />
    );
  };

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
            onPress={() => {}}>
            <Text></Text>
          </TouchableOpacity>
        </View>
        <View>
          <Ionicons
            name="car-sport"
            size={40}
            color={Font.LabelColor}
            style={{alignSelf: 'center'}}
          />

          <Text
            style={{
              fontSize: 18,
              marginBottom: 15,
              marginTop: -6,
              color: 'white',
              fontWeight: '700',
            }}>
            MY VEHICEL BUD
            <Text
              style={{
                color: Font.LabelColor,
                fontWeight: '700',
                fontSize: 18,
              }}>
              D
            </Text>
            Y
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CartScreen');
            }}
            style={{marginRight: 8}}>
            <MaterialCommunityIcons name={'cart'} size={28} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 9}}>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <View>
            <Slider />
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
                color: Font.TextColor,
              }}>
              Browse Auto Parts & Accessories
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => {
                  setColor1('#8739F9');
                  setColor2('black');
                  setfont1('bold');
                  setfont2('normal');
                  setselectcategory('category');
                  setw1(1);
                  setw2(0);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 4,
                    color: color1,
                    fontWeight: font1,
                    borderBottomWidth: w1,
                    borderColor: color1,
                  }}>
                  Category
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => {
                  setColor2('#8739F9');
                  setColor1('black');
                  setfont2('bold');
                  setfont1('normal');
                  setw1(0);
                  setw2(1);
                  setselectcategory('location');
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 8,
                    color: color2,
                    fontWeight: font2,
                    borderBottomWidth: w2,
                    borderColor: color2,
                  }}>
                  Location
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {selectCategory === 'location' ? (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Islamabad',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/islamabad.jpg')}
                      />

                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Islamabad
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Lahore',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/lahore.jpg')}
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Lahore
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Faisalabad',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/faslabad.jpg')}
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Faisalabad
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Karachi',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/karachi.jpg')}
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Karachi
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Rawalpindi',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/pindi.jpg')}
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Rawalpindi
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Multan',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/multan.jpg')}
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Multan
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Peshawar',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/peshwar.jpg')}
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Peshawar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.category1}
                      onPress={() => {
                        navigation.navigate('CustomerProductList', {
                          location: 'Quetta',
                        });
                      }}>
                      <Image
                        style={styles.image}
                        source={require('../../assets/quetta.jpg')}
                      />
                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: 'bold',
                          color: Font.TextColor,
                        }}>
                        Quetta
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Engine & Mechanical',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'engine-outline'}
                          size={28}
                          color={Font.TextColor}
                        />

                        <Text style={{color: Font.TextColor}}>
                          Engine & Mechanical
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Brakes',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'car-brake-hold'}
                          size={28}
                          color={Font.TextColor}
                        />

                        <Text style={{color: Font.TextColor}}>Brakes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Car Care',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'spray'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}> Car Care</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Interior',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'car-seat'}
                          size={28}
                          color={Font.TextColor}
                          style={{marginLeft: 10}}
                        />

                        <Text style={{color: Font.TextColor}}> Interior</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Exterior',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'car-door'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>Exterior</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Lights & Electrical',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'car-light-high'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Lights & Electrical
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Tyre & Wheels',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'car-door'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Tyre & Wheels
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Audio / Video',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'radio'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Audio / Video
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Oil & Lubricants',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'oil'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          <Text style={{color: Font.TextColor}}>{'    '} </Text>
                          Oil & Lubricants
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Tools & Gadgets',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'tools'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Tools & Gadgets
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Bikes',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'steering'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>Bikes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Security & Sensors',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'security'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Security & Sensors
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Other Vehicles',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'steering'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Other Vehicles
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Exhaust and Parts',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'steering'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Exhaust & Parts
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Car utilities',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'steering'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>
                          Car utilities
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.category}
                        onPress={() => {
                          navigation.navigate('CustomerProductList', {
                            category: 'Bicycle',
                          });
                        }}>
                        <MaterialCommunityIcons
                          name={'steering'}
                          size={28}
                          color={Font.TextColor}
                        />
                        <Text style={{color: Font.TextColor}}>Bicycle</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CustomerBuy;
const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    width: 95,
    height: 95,
    borderRadius: 10,
    margin: 3.5,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 10, // IOS
    shadowRadius: 10, //IOS
    backgroundColor: '#fff',
    elevation: 20, // Android
  },
  category1: {
    alignItems: 'center',
    borderWidth: 0.5,
    width: 95,
    height: 95,
    borderRadius: 10,
    margin: 3.5,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 10, // IOS
    shadowRadius: 10, //IOS
    backgroundColor: '#fff',
    elevation: 20, // Android
  },
  image: {
    width: 95,
    height: 70,
    marginTop: -9,

    borderRadius: 10,
  },
});

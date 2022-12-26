import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import port from '../Port/Port';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Lottie from 'lottie-react-native';
import {Font, Commonstyles} from '../font/Font';

export default function CustomerVehicleBuy({navigation}) {
  const [getcondition, setcondition] = useState(true);

  const [listings, setlistings] = useState([]);

  const getVehicles = async () => {
    try {
      const result = await axios.get(`${port.herokuPort}/car/getcar`);
      console.log('The result is');
      console.log(result.data.data.doc);
      setlistings(result.data.data.doc);
      setcondition(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const [search, setSearch] = useState('');
  const [filtered, setFilterted] = useState('');

  const updateSearch = search => {
    const d = listings.filter(item => {
      return item.name.match(search);
    });

    setSearch(search);
    setFilterted(d);
  };

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#f9fcfd',
      }}>
      <View
        style={{
          backgroundColor: '#829460',
          padding: 6,
          width: '100%',
          flex: 1,
          marginBottom: 38,
        }}>
        <View style={styles.header}>
          <Text style={styles.text1}>Sale & Buy.</Text>
          <Image
            style={{
              resizeMode: 'cover',
              height: 90,
              width: 100,
              marginLeft: 60,
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1048/1048315.png',
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={styles.inputContainer}>
          <Icon name="search" size={28} style={{color: Font.TextColor}} />
          <TextInput
            style={{flex: 1, fontSize: 18, color: Font.TextColor}}
            placeholder="Search for Cars"
            placeholderTextColor={Font.TextColor}
            // onChangeText={search => updateSearch(search)}
            value={search}
          />
          <Icon
            name="cancel"
            size={20}
            style={{color: Font.TextColor}}
            onPress={() => {
              setSearch('');
              setFilterted('');
            }}
          />
        </View>
      </View>

      {getcondition ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 8}}>
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
              fontFamily: 'Lexend-Regular',
            }}>
            Fetching Data for You
          </Text>
        </View>
      ) : listings.length === 0 ? (
        <View style={{flex: 8}}>
          <Lottie
            style={{
              marginTop: -20,
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
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Lexend-Regular',
            }}>
            You haven't Posted any Product Yet :(
          </Text>
        </View>
      ) : (
        <View style={{flex: 8}}>
          <FlatList
            data={listings}
            numColumns={2}
            extraData={listings}
            columnWrapperStyle={{flexWrap: 'wrap'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.row}>
                  <View style={styles.carts}>
                    <Image
                      style={styles.productImg}
                      source={{
                        uri: item?.imageUrl[0],
                      }}
                    />

                    <View>
                      <Text style={styles.prdtext1}>{item.Name}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.prdtext2}>Click for Details</Text>

                      <TouchableOpacity
                        style={{
                          backgroundColor: '#829460',
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                          marginTop: 0,
                          marginRight: 5,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('CustomerVehicleBuyDetails', {
                            product: item,
                          });
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                            fontFamily: 'Lexend-Regular',
                            fontWeight: '400',
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fcfd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  carts: {
    backgroundColor: '#f2e8cb',
    borderRadius: 10,
    width: 147,
    height: 'auto',
    margin: 12,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    flexBasis: '50%',
  },
  productImg: {
    resizeMode: 'cover',
    height: 100,
    width: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 8,
    borderRadius: 10,
  },
  prdtext1: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 9,
    marginLeft: 9,
    fontFamily: 'Lexend-Regular',
  },
  prdtext2: {
    fontSize: 12,
    marginTop: 9,
    marginLeft: 9,
    fontFamily: 'Lexend-Regular',
    fontWeight: '400',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
  },

  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 40,
    fontFamily: 'Lexend-Regular',
  },
});

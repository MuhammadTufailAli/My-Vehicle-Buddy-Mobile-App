import React, {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import CartProvider from '../ContextApi/contextApi';
import {Font} from '../font/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import port from '../Port/Port';

function Setting({navigation}) {
  const {userdetails, setuserdetails} = useContext(CartProvider);
  if (userdetails?.shop === 'No Shop') {
    return (
      <View>
        <View style={{alignItems: 'center', margin: 10}}>
          <Text style={{fontSize: 26}}>
            <Text style={{color: '#8739F9'}}>Welcome </Text>
            {userdetails?.firstname} {userdetails?.lastname}
          </Text>
        </View>
        <Text style={{fontSize: 16, marginLeft: 10}}>
          We are glad to see you here.
        </Text>
        <Text style={{fontSize: 16, marginLeft: 10, marginBottom: 20}}>
          You first have to create shop
        </Text>
        <ImageBackground
          source={require('../../assets/prison.jpg')}
          resizeMode="cover"
          style={{width: '100%', height: 300}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShopOwner EnterShop');
            }}
            style={{
              padding: 10,
              backgroundColor: '#8739F9',
              width: '90%',
              alignItems: 'center',
              // borderRadius: '50%',
              margin: 10,
              marginTop: '30%',
            }}>
            <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
              Create Shop
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.8,
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
          <Text style={styles.text}>Manage Shop</Text>
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
        {/* <View
          style={{
            backgroundColor: Font.ButtonColor,
            marginBottom: 5,
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign name={'left'} size={20} color={'white'} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: '700',
              marginLeft: 132,
            }}>
            Manage Shop
          </Text>
        </View> */}
        <View style={{flex: 9}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShopOwnerViewShop');
            }}
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',

              margin: 10,
              marginBottom: 0,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Entypo
                name={'eye'}
                size={25}
                color={Font.ButtonColor}
                style={{marginRight: 10}}
              />
              <Text
                style={{
                  color: Font.LabelColor,
                  fontWeight: '500',
                  fontSize: 18,
                }}>
                View Shop Details
              </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <AntDesign
                name={'right'}
                size={18}
                color={Font.LabelColor}
                style={{
                  justifyContent: 'flex-end',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditShopPre');
            }}
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',

              margin: 10,
              marginBottom: 0,
            }}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name={'edit'}
                size={25}
                color={'green'}
                style={{marginRight: 10}}
              />
              <Text
                style={{
                  color: Font.LabelColor,
                  fontWeight: '500',
                  fontSize: 18,
                }}>
                Edit Shop
              </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <AntDesign
                name={'right'}
                size={18}
                color={Font.LabelColor}
                style={{
                  justifyContent: 'flex-end',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Delete Shop');
            }}
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',

              margin: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign
                name={'delete'}
                size={25}
                color={'red'}
                style={{marginRight: 10}}
              />
              <Text
                style={{
                  color: Font.LabelColor,
                  fontWeight: '500',
                  fontSize: 18,
                }}>
                Delete Shop
              </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <AntDesign
                name={'right'}
                size={18}
                color={Font.LabelColor}
                style={{
                  justifyContent: 'flex-end',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Setting;
const styles = StyleSheet.create({
  text: {
    color: 'white',

    fontSize: 18,
  },
});

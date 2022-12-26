import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {Font, Commonstyles} from '../font/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Rating, AirbnbRating} from 'react-native-ratings';
import port from '../Port/Port';

const AllReviewScreen = ({navigation, route}) => {
  console.log(route.params?.reviews);
  return (
    <View>
      <View
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
            marginLeft: 139,
            fontFamily: 'Lexend-Regular',
          }}>
          All Reviews
        </Text>
      </View>

      <FlatList
        data={route.params?.reviews}
        renderItem={({item}) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 15,
                  marginTop: 10,
                }}>
                <Image
                  source={{
                    uri: item.refOfUser.photoUrl,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    float: 'left',

                    borderRadius: 90 / 2,
                  }}
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    fontWeight: '600',
                    color: Font.TextColor,
                    fontFamily: 'Lexend-Regular',
                  }}>
                  {item.refOfUser.firstname} {item.refOfUser.lastname}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 10, marginLeft: 15}}>
                <AirbnbRating
                  count={5}
                  defaultRating={item.rating}
                  size={12}
                  isDisabled
                  showRating={false}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    color: Font.TextColor,
                    fontFamily: 'Lexend-Regular',
                    fontWeight: '400',
                  }}>
                  {item.createdAt}
                </Text>
              </View>

              <View style={{marginLeft: 15}}>
                <Text
                  style={{
                    color: Font.TextColor,
                    fontFamily: 'Lexend-Regular',
                    fontWeight: '400',
                  }}>
                  {item.review}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AllReviewScreen;

const styles = StyleSheet.create({});

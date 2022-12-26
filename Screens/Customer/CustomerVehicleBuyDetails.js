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
  Linking,
  Platform,
} from 'react-native';
import {Font} from '../font/Font';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SliderBox} from 'react-native-image-slider-box';

const CustomerVehicleBuyDetails = ({navigation, route}) => {
  const {product} = route.params;

  //Make call on mobile

  const makeCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      const number = 'tel:0' + product.User_Contact;
      phoneNumber = number;
    } else {
      const number = 'telprompt:0' + product.User_Contact;
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  //this is slider for images
  const Slider = () => {
    const [getImage, setImage] = useState(product.imageUrl);

    // useEffect(() => {

    //   socket.current.emit('addUser', userdetails._id);
    // }, []);

    return (
      <SliderBox
        images={getImage}
        sliderBoxHeight={280}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor="#8739F9"
        inactiveDotColor="white"
        paginationBoxVerticalPadding={10}
        // autoplay

        resizeMethod={'resize'}
        resizeMode={'cover'}
        ImageComponentStyle={{width: '100%'}}
        imageLoadingColor="#8739F9"
      />
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Slider />
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginLeft: 14,
              color: Font.TextColor,
            }}>
            {product.Name}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              marginRight: 17,
              fontWeight: 'bold',
              marginLeft: 14,
              color: Font.TextColor,
            }}>
            Rs. {product.Price} Lac
          </Text>
        </View>

        <View
          style={{
            padding: 4,
            marginTop: 5,
            margin: 14,
            alignContent: 'center',
            borderColor: '#f2e8cb',
            borderWidth: 2,
            backgroundColor: '#fffcf5',
            borderRadius: 5,
            height: 250,
            width: 300,
          }}>
          <Text
            style={{
              fontSize: 15,
              marginTop: 9,
              marginLeft: 9,
              color: Font.TextColor,
            }}>
            Model Year: {product.Model_Year}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 9,
              marginLeft: 9,
              color: Font.TextColor,
            }}>
            Mileage: {product.Mileage}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 9,
              marginLeft: 9,
              color: Font.TextColor,
            }}>
            Engine Type: {product.Engine_Type}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 9,
              marginLeft: 9,
              color: Font.TextColor,
            }}>
            Transmission: {product.Transmission}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 9,
              marginLeft: 9,
              color: Font.TextColor,
            }}>
            Color: {product.Color}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 9,
              marginLeft: 9,
              color: Font.TextColor,
            }}>
            Assembly: {product.Assembly}
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 9,
              marginLeft: 9,
              color: Font.TextColor,
            }}>
            Body Type: {product.Body_Type}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 10,
            marginRight: 30,
          }}>
          <TouchableOpacity
            style={{
              width: 150,
              padding: 10,
              backgroundColor: '#829460',

              marginLeft: 179,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9,
            }}
            onPress={() => {
              makeCall();
            }}>
            <Text style={{color: 'white', fontSize: 14, padding: 0}}>
              Contact the Buyer
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomerVehicleBuyDetails;
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
    height: 190,
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
  },
  prdtext2: {
    fontSize: 12,
    marginTop: 9,
    marginLeft: 9,
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
  },
});

import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import CartProvider from '../ContextApi/contextApi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Font, Commonstyles} from '../font/Font';
import axios from 'axios';
import port from '../Port/Port';
export default function SelectPaymentScreentScreen({navigation, route}) {
  console.log(route.params?.product.refOfUser);
  const [Product, setProduct] = useState(route.params?.product);
  const {userdetails, setuserdetails} = useContext(CartProvider);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(route.params?.quantity);
  const [notPressed, SetNotPressed] = useState(true);

  const cashOnDelivery = async paymentMethod => {
    const Quant = parseInt(quantity);
    const amount = quantity * Product.price;
    const buyingInfo = {
      refOfProduct: route.params?.product._id,
      refOfCustomer: userdetails._id,
      refOfShopOwner: route.params?.product.refOfUser,
      price: amount,
      quantity: Quant,
      paymentMethod: paymentMethod,
    };

    const updatedProduct = {
      quantity: Product.quantity - Quant,
    };

    try {
      const result = await axios.patch(
        `${port.herokuPort}/product/updateProduct/${route.params?.product._id}`,
        updatedProduct,
      );

      setProduct(result.data.data);
    } catch (err) {
      console.log(err.response.data);
    }

    const earningData = {
      earning: route.params?.product.refOfUser.earning + amount,
    };
    try {
      const result = await axios.patch(
        `${port.herokuPort}/users/updateUser/${route.params?.product.refOfUser._id}`,
        earningData,
      );

      setProduct(result.data.data);
    } catch (err) {
      console.log(err.response.data);
    }

    try {
      const result = await axios.post(
        `${port.herokuPort}/CustomerBuyingNotificationRoute/PostNotification`,
        buyingInfo,
      );

      console.log('I aaaaaammmmmmmmmmmmmmm hereeeeeee');
      const buyingInfo2 = {
        refOfProduct: route.params?.product._id,
        refOfCustomer: userdetails._id,
        refOfShopOwner: route.params?.product.refOfUser,
        refOfCustomerNotification: result.data.data.doc._id,
        price: amount,
        quantity: Quant,
        paymentMethod: paymentMethod,
      };

      try {
        const result = await axios.post(
          `${port.herokuPort}/ShopOwnerBuyingNotificationRoute/PostNotification`,
          buyingInfo2,
        );

        console.log(result.data.data);

        alert('Product bought successfull');
        navigation.goBack();
      } catch (err) {
        console.log(err.response.data);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const amount = quantity * Product.price;
    const paymentInfo = {
      amount: amount,
    };
    initializePaymentSheet;

    const response = await axios.post(
      `${port.herokuPort}/booking/BuyUsingStripe`,
      paymentInfo,
    );

    const {paymentIntent, customer} = await response.data;

    return {
      paymentIntent,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      customerId: customer,

      paymentIntentClientSecret: paymentIntent,

      merchantDisplayName: 'Example Inc.',
    });
    console.log(error);

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async paymentMethod => {
    const {error} = await presentPaymentSheet();
    console.log(error);
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      const Quant = parseInt(quantity);
      const amount = quantity * Product.price;
      const buyingInfo = {
        refOfProduct: route.params?.product._id,
        refOfCustomer: userdetails._id,
        refOfShopOwner: route.params?.product.refOfUser,
        price: amount,
        quantity: Quant,
        paymentMethod: paymentMethod,
      };

      const updatedProduct = {
        quantity: Product.quantity - Quant,
      };

      //Update product to change its quantity
      try {
        const result = await axios.patch(
          `${port.herokuPort}/product/updateProduct/${route.params?.product._id}`,
          updatedProduct,
        );

        console.log(result.data.data);
      } catch (err) {
        console.log(err.response.data);
      }
      // Update User Info to set Earning
      const earningData = {
        earning: route.params?.product.refOfUser.earning + amount,
      };
      try {
        const result = await axios.patch(
          `${port.herokuPort}/users/updateUser/${route.params?.product.refOfUser._id}`,
          earningData,
        );

        setProduct(result.data.data);
      } catch (err) {
        console.log(err.response.data);
      }

      //Post customer and shop owner notification

      try {
        const result = await axios.post(
          `${port.herokuPort}/CustomerBuyingNotificationRoute/PostNotification`,
          buyingInfo,
        );

        console.log(result.data.data);

        const buyingInfo2 = {
          refOfProduct: route.params?.product._id,
          refOfCustomer: userdetails._id,
          refOfShopOwner: route.params?.product.refOfUser,
          refOfCustomerNotification: result.data.data.doc._id,
          price: amount,
          quantity: Quant,
          paymentMethod: paymentMethod,
        };

        try {
          const result = await axios.post(
            `${port.herokuPort}/ShopOwnerBuyingNotificationRoute/PostNotification`,
            buyingInfo2,
          );

          console.log(result.data.data);

          alert('Payment successfull');
          navigation.goBack();
        } catch (err) {
          console.log(err.response.data);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: Font.ButtonColor,
          marginBottom: 5,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            marginLeft: -10,
            fontFamily: 'Lexend-Regular',
          }}>
          Payment
        </Text>
        <Text></Text>
      </View>
      <View style={{marginTop: 25, marginLeft: 20, marginRight: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            fontFamily: 'Lexend-Regular',
          }}>
          Select Payment Method
        </Text>
        <View
          style={{
            marginTop: 25,
            marginBottom: 15,
          }}>
          <TouchableOpacity
            disabled={!loading}
            onPress={() => {
              console.log('Bank is pressed');
              const method = 'Stripe';
              openPaymentSheet(method);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name={'bank'} size={22} color={'black'} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                color: 'black',
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
              Credit/Debit Card & Online Bank Transfer
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 15,
            marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              const method = 'Cash on delivery';
              cashOnDelivery(method);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5 name={'hand-holding-usd'} size={22} color={'black'} />
            <Text
              style={{
                marginLeft: 13,
                fontSize: 16,
                color: 'black',
                fontFamily: 'Lexend-Regular',
                fontWeight: '400',
              }}>
              Cash on delivery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

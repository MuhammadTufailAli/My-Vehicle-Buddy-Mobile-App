import 'react-native-gesture-handler';
import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
//Importing Screens

//Welcome Screen
import WelcomeScreen from './Screens/WelcomeScreen/WelcomeScreen';
//User Profiling
import LoginScreen from './Screens/UserProfiling/Login';
import SignupScreen from './Screens/UserProfiling/Signup';
import SignupCustomer from './Screens/UserProfiling/SignupCustomer';
//ShopOwner Screens
import ShopOwnerInterface from './Screens/ShopOwner/ShopOwnerInterface';
import ShopOwnerEnterShop from './Screens/ShopOwner/ShopOwnerEnterShop';
import ShopOwnerEditShop from './Screens/ShopOwner/ShopOwnerEditShop';
import SelectCityForAd from './Screens/ShopOwner/SelectCityForAd';
import SelectCategory from './Screens/ShopOwner/SelectCategory';
import DeleteShop from './Screens/ShopOwner/DeleteShop';
import EditShopPre from './Screens/ShopOwner/EditShopPre';
import ShopOwnerEditProduct from './Screens/ShopOwner/ShopOwnerEditProduct';
import ShopOwnerEditProfile from './Screens/ShopOwner/ShopOwnerEditProfile';
import ShopOwnerViewShop from './Screens/ShopOwner/ShopOwnerViewShop';
import Setting from './Screens/ShopOwner/Setting';
import ShopOwnerNotification from './Screens/ShopOwner/ShopOwnerNotification';
import ShopOwnerProfile from './Screens/ShopOwner/ShopOwnerProfileFinal';

//Customer Screens
import CustomerInterface from './Screens/Customer/CustomerInterface';
import CustomerProductScreen from './Screens/Customer/CustomerProductScreen';

import CustomerProductList from './Screens/Customer/CustomerProductList';
import CustomerShopOwnerProducts from './Screens/Customer/CustomerShopOwnerProducts';
import SelectPaymentScreen from './Screens/Customer/SelectPaymentScreen';
import CheckoutScreen from './Screens/Customer/CheckoutScreen';
import AllReviewScreen from './Screens/Customer/AllReviewScreen';
import CartScreen from './Screens/Customer/CartScreen';
import CustomerNotifiation from './Screens/Customer/CustomerNotifiation';
import CustomerEditProfile from './Screens/Customer/CustomerEditProfile';
import CustomerShopOwnerDetails from './Screens/Customer/CustomerShopOwnerDetails';
import CustomerMechanicFindingScreen from './Screens/Customer/CustomerMechanicFindingScreen';
import CustomerMechanicComingScreen from './Screens/Customer/CustomerMechanicComingScreen';
import CustomerVehicleSale from './Screens/Customer/CustomerVehicleSale';
import CustomerVehicleBuy from './Screens/Customer/CustomerVehicleBuy';
import CustomerVehicleBuyDetails from './Screens/Customer/CustomerVehicleBuyDetails';
import SelectCity from './Screens/Customer/SelectCity';
import SelectCarName from './Screens/Customer/SelectCarName';
//Mechainc Screens
import MechanicInterface from './Screens/Mechanic/MechanicInterface';
import MechanicSelectingCustomer from './Screens/Mechanic/MechanicSelectingCustomer';
import MechanicComingToCustomerScreen from './Screens/Mechanic/MechanicComingToCustomerScreen';
import MechanicEditProfile from './Screens/Mechanic/MechanicEditProfile';

//Messenger
import SearchUser from './Screens/Messenger/SearchUser';
import Messenger from './Screens/Messenger/Messenger';
import ChatScreen from './Screens/Messenger/ChatScreen';
import CustomerChatScreen from './Screens/Messenger/CustomerChatScreen';
import MechanicChatScreen from './Screens/Messenger/MechanicChatScreen';
//Feedback
import Feedback from './Screens/FeedBack/Feedback';

//Importing Dependencies
import {CartProvider} from './Screens/ContextApi/contextApi';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {/* Welcome Screen */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          {/* Login Screen */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
          <Stack.Screen name="SignUpCustomer" component={SignupCustomer} />
          {/* Shop Owner */}
          <Stack.Screen
            name="ShopOwnerEditProduct"
            component={ShopOwnerEditProduct}
          />
          <Stack.Screen
            name="ShopOwnerEditProfile"
            component={ShopOwnerEditProfile}
          />
          <Stack.Screen
            name="ShopOwner EnterShop"
            component={ShopOwnerEnterShop}
          />
          <Stack.Screen
            name="ShopOwner EditShop"
            component={ShopOwnerEditShop}
          />
          <Stack.Screen
            name="ShopOwnerViewShop"
            component={ShopOwnerViewShop}
          />
          <Stack.Screen name="SelectCityForAd" component={SelectCityForAd} />
          <Stack.Screen name="SelectCategory" component={SelectCategory} />
          <Stack.Screen
            name="ShopOwnerInterface"
            component={ShopOwnerInterface}
          />
          <Stack.Screen name="Delete Shop" component={DeleteShop} />
          <Stack.Screen name="EditShopPre" component={EditShopPre} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen
            name="ShopOwnerNotification"
            component={ShopOwnerNotification}
          />
          <Stack.Screen name="ShopOwnerProfile" component={ShopOwnerProfile} />
          {/* Customer Screens */}
          <Stack.Screen
            name="CustomerProductList"
            component={CustomerProductList}
          />
          <Stack.Screen
            name="CustomerProductScreen"
            component={CustomerProductScreen}
          />
          <Stack.Screen
            name="CustomerInterface"
            component={CustomerInterface}
          />
          <Stack.Screen
            name="CustomerShopOwnerProducts"
            component={CustomerShopOwnerProducts}
          />
          <Stack.Screen
            name="SelectPaymentScreen"
            component={SelectPaymentScreen}
          />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen name="AllReviewScreen" component={AllReviewScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen
            name="CustomerNotifiation"
            component={CustomerNotifiation}
          />
          <Stack.Screen
            name="CustomerEditProfile"
            component={CustomerEditProfile}
          />
          <Stack.Screen
            name="CustomerShopOwnerDetails"
            component={CustomerShopOwnerDetails}
          />
          <Stack.Screen
            name="CustomerMechanicFindingScreen"
            component={CustomerMechanicFindingScreen}
          />
          <Stack.Screen
            name="CustomerMechanicComingScreen"
            component={CustomerMechanicComingScreen}
          />
          <Stack.Screen
            name="CustomerVehicleSale"
            component={CustomerVehicleSale}
          />
          <Stack.Screen
            name="CustomerVehicleBuy"
            component={CustomerVehicleBuy}
          />
          <Stack.Screen
            name="CustomerVehicleBuyDetails"
            component={CustomerVehicleBuyDetails}
          />
          <Stack.Screen name="SelectCity" component={SelectCity} />
          <Stack.Screen name="SelectCarName" component={SelectCarName} />
          {/* Mechainc Screen */}
          <Stack.Screen
            name="MechanicInterface"
            component={MechanicInterface}
          />
          <Stack.Screen
            name="MechanicSelectingCustomer"
            component={MechanicSelectingCustomer}
          />
          <Stack.Screen
            name="MechanicComingToCustomerScreen"
            component={MechanicComingToCustomerScreen}
          />
          <Stack.Screen
            name="MechanicEditProfile"
            component={MechanicEditProfile}
          />

          {/* Messenger */}
          <Stack.Screen name="Messenger" component={Messenger} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen
            name="CustomerChatScreen"
            component={CustomerChatScreen}
          />
          <Stack.Screen
            name="MechanicChatScreen"
            component={MechanicChatScreen}
          />
          <Stack.Screen name="SearchUser" component={SearchUser} />
          {/* Feeback */}
          <Stack.Screen name="Feedback" component={Feedback} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputText: {
    padding: 15,
    borderBottomWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 7,
  },
});

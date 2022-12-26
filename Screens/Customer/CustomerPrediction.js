import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  ListItem,
} from 'react-native';
import port from '../Port/Port';
import axios from 'axios';
import {Font} from '../font/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DropDownPicker from 'react-native-dropdown-picker';
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerPrediction({navigation}) {
  const [name, setname] = useState('');
  const [mileage, setmileage] = useState();
  const [getCity, setCity] = useState('');
  const [capacity, setcapacity] = useState();
  const [year, setyear] = useState();
  const [getres, setres] = useState();
  const [color, setcolor] = useState('');
  // const [bodytype, setbodytype] = useState('');
  const [getcondition, setcondition] = useState(true);
  const [getmodalvisible, setModalVisible] = React.useState(false);

  // const storedata = async () => {
  //   try {
  //     console.log('Saving');
  //     var arr = [
  //       {
  //         Name: name,
  //         Engine_Type: value,
  //         Transmission: value2,
  //         Color: color,
  //         Assembly: value3,
  //         Body_Type: bodytype,
  //         Mileage: mileage,
  //         Model_Year: year,

  //       },
  //     ];
  //     await AsyncStorage.setItem('@store1:key', JSON.stringify(arr));
  //     console.log('Saving Done!');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@store1:key');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const submit = () => {
    console.log('Year is ', year);
    if (
      name.length > 0 &&
      mileage.length > 0 &&
      getCity.length > 0 &&
      capacity.length > 0 &&
      color.length > 0 &&
      bodytype.length > 0
    ) {
      let formData = new FormData();
      formData.append('Name', name);
      formData.append('Engine_Type', value);
      formData.append('Transmission', value2);
      formData.append('Color', color);
      formData.append('Assembly', value3);
      formData.append('Body_Type', bodytype);
      formData.append('Mileage', mileage);
      formData.append('Model_Year', year);
      console.log('here');

      fetch('http://10.113.6.2:5000/predict', {
        method: 'POST',
        mode: 'cors',
        body: formData,
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('SUBMIT IS PRESSED');
          var value = responseJson.Prediction;
          const withoutFirst = value.slice(1);
          const final = withoutFirst.slice(0, -1);

          const number = Number(final);
          var intvalue = Math.floor(number);
          const predictedValue = intvalue / 100000;
          const last = predictedValue.toFixed(3);

          console.log(last);
          // var intvalue = Math.floor(floatvalue);

          setres(last);
          setModalVisible(true);
        })
        .catch(error => {
          alert('Please enter correct data');
          console.log('error', error);
        });
    } else {
      console.log('Enter all required fields');

      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please fill all the fields',
      });
    }
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Petrol', value: 'Petrol'},
    {label: 'Diesel', value: 'Diesel'},
    {label: 'Hybrid', value: 'Hybrid'},
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Automatic', value: 'Automatic'},
    {label: 'Manual', value: 'Manual'},
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: 'Imported', value: 'Imported'},
    {label: 'Local', value: 'Local'},
  ]);

  const [open5, setOpen5] = useState(false);
  const [bodytype, setValue5] = useState(null);
  const [items5, setItems5] = useState([
    {label: 'Hatchback', value: 'Hatchback'},
    {label: 'SUV', value: 'SUV'},
    {label: 'Sedan', value: 'Sedan'},
    {label: 'Crossover', value: 'Crossover'},
    {label: 'Mini Van', value: 'Mini Van'},
    {label: 'Station Wagon', value: 'Station Wagon'},
    {label: 'MPV', value: 'MPV'},
    {label: 'Double Cabin', value: 'Double Cabin'},
  ]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState([]);
  const [items4, setItems4] = useState([
    {label: 'ABS', name: 'ABS'},
    {label: 'AM/FM Radio', name: 'AM/FM Radio'},
    {label: 'Air Bags', name: 'Air Bags'},
    {label: 'Conditioning', name: 'Conditioning'},
    {label: 'CD Player', name: 'CD Player'},
    {label: 'DVD Player', name: 'DVD Player'},
    {label: 'Immobilizer Key', name: 'Immobilizer Key'},
    {label: 'Keyless Entry', name: 'Keyless Entry'},
    {label: 'Navigation System', name: 'Navigation System'},
    {label: 'Power Locks', name: 'Power Locks'},
    {label: 'Power Mirrors', name: 'Power Mirrors'},
    {label: 'Power Steering', name: 'Power Steering'},
    {label: 'Power Windows', name: 'Power Windows'},
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = selectedItems => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };

  var arr = [
    {
      Name: name,
      Engine_Type: value,
      Transmission: value2,
      Color: color,
      Assembly: value3,
      Body_Type: bodytype,
      Mileage: mileage,
      Model_Year: year,
      City: getCity,
      Capacity: capacity,
      Features: selectedItems,
      Price: getres,
    },
  ];

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
              <Text style={{textAlign: 'center', color: Font.TextColor}}>
                Your Predicted Price: {getres} Lac Rs
              </Text>
              <View>
                <Image
                  style={{
                    resizeMode: 'cover',
                    height: 90,
                    width: 100,
                  }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1300/1300302.png',
                  }}
                />
              </View>
              <View>
                <Pressable
                  style={{
                    backgroundColor: '#829460',
                    width: 120,
                    padding: 6,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 7,
                  }}
                  onPress={() => {
                    // storedata();
                    console.log(arr);
                    navigation.navigate('CustomerVehicleSale', {ar: arr});
                    setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    Do you want to sell it?
                  </Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  style={{
                    backgroundColor: '#829460',
                    width: 120,
                    padding: 6,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 7,
                  }}
                  onPress={() => {
                    // _retrieveData();
                    setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    Go back
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#829460',
            padding: 6,
            width: '100%',
            height: 83,
          }}>
          <View style={styles.header}>
            <Text style={styles.text1}>Car Price Prediction.</Text>
            <Image
              style={{
                resizeMode: 'cover',
                height: 90,
                width: 100,
              }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1048/1048315.png',
              }}
            />
          </View>
        </View>

        <View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 25,
              marginRight: 90,
              fontWeight: 'bold',
              marginLeft: 20,
              color: Font.TextColor,
            }}>
            Welcome to Car Sale & Buy.
          </Text>
          <Text
            style={{
              marginTop: 7,
              fontSize: 15,
              marginRight: 100,
              marginLeft: 20,
              color: 'grey',
            }}>
            Please fill out the following form to predict your vehicle price.
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectCarName', {
                category: setname,
              });
            }}>
            <View pointerEvents="none" style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={name}
                onChangeText={name => setname(name)}
                placeholder="Car Name"
                placeholderTextColor="#8b9cb5"
                clearButtonMode="always"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={year}
              onChangeText={year => {
                const number = Number(year);
                if (number > 2022) {
                  alert('you can not predict future car price :)');
                } else {
                  if (number < 0) {
                    alert('Year can not be negative');
                    setyear('');
                  } else {
                    setyear(year);
                  }
                }
              }}
              placeholder="Year" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="number-pad"
              underlineColorAndroid="#f000"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={mileage}
              onChangeText={mileage => {
                const number = Number(mileage);
                if (number < 0) {
                  alert('Milage can not be negative');
                  setmileage('');
                } else {
                  setmileage(mileage);
                }
              }}
              placeholder="Mileage" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="number-pad"
              underlineColorAndroid="#f000"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectCity', {
                city: setCity,
              });
            }}>
            <View pointerEvents="none" style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={getCity}
                onChangeText={getCity => setCity(getCity)}
                placeholder="Registered City"
                placeholderTextColor="#8b9cb5"
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              marginLeft: 35,
              marginRight: 35,

              height: 47,
              flex: 1,
            }}>
            <DropDownPicker
              style={styles.inputStyle}
              containerStyle={{height: 47, width: 150}}
              placeholder="Select Engine Type"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            <DropDownPicker
              style={styles.inputStyle}
              containerStyle={{height: 47, width: 150}}
              placeholder="Select Transmission"
              open={open2}
              value={value2}
              items={items2}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems2}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              value={capacity}
              onChangeText={capacity => {
                const number = Number(capacity);
                if (number < 0) {
                  alert('Engine capacity can not be negative');
                  setcapacity('');
                } else {
                  if (number < 4801) {
                    setcapacity(capacity);
                  } else {
                    alert('Enter correct engine capacity');
                  }
                }
              }}
              placeholder="Engine Capacity"
              placeholderTextColor="#8b9cb5"
              keyboardType="number-pad"
              underlineColorAndroid="#f000"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              marginLeft: 35,
              marginRight: 35,

              height: 47,
              flex: 1,
            }}>
            <TextInput
              style={styles.inputStyle}
              value={color}
              onChangeText={color => setcolor(color)}
              placeholder="Car Color"
              placeholderTextColor="#8b9cb5"
              clearButtonMode="always"
            />
            <DropDownPicker
              style={styles.inputStyle}
              containerStyle={{height: 47, width: 150}}
              placeholder="Select Assembly"
              open={open3}
              value={value3}
              items={items3}
              setOpen={setOpen3}
              setValue={setValue3}
              setItems={setItems3}
            />
          </View>

          <View style={styles.SectionStyle}>
            <DropDownPicker
              style={styles.inputStyle2}
              containerStyle={{height: 47, width: 140}}
              placeholder="Body Type"
              open={open5}
              value={bodytype}
              items={items5}
              setOpen={setOpen5}
              setValue={setValue5}
              setItems={setItems5}
            />
            {/* <TextInput
              style={styles.inputStyle}
              value={bodytype}
              onChangeText={bodytype => setbodytype(bodytype)}
              placeholder="Body Type"
              placeholderTextColor="#8b9cb5"
              clearButtonMode="always"
            /> */}
          </View>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: '85%',
                height: 47,
                // marginTop: 20,
                // marginLeft: 35,
                // marginRight: 35,
                // margin: 10,
              }}>
              <MultiSelect
                hideTags
                items={items4}
                uniqueKey="label"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Pick Features"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor="#48d22b"
                submitButtonText="Submit"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 250,
            }}>
            <TouchableOpacity
              style={styles.buttonstyle}
              onPress={() => {
                if (
                  name !== '' &&
                  mileage !== '' &&
                  getCity !== '' &&
                  capacity !== '' &&
                  year !== '' &&
                  color !== '' &&
                  bodytype != '' &&
                  value != '' &&
                  value2 != '' &&
                  value3 != ''
                ) {
                  submit();
                } else {
                  alert('Enter all fields please!!!');
                }
              }}>
              <Text style={styles.buttontext}>Continue...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fffff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
    color: Font.TextColor,
  },
  inputStyle2: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
    color: Font.TextColor,
  },

  buttonstyle: {
    width: 100,
    padding: 10,
    backgroundColor: '#829460',

    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  buttontext: {
    color: 'white',
    fontSize: 14,
    padding: 0,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 47,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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

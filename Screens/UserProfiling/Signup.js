import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import port from '../Port/Port';
import {Font} from '../font/Font';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';
import CartProvider from '../ContextApi/contextApi';
import ImagePicker from 'react-native-image-crop-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';

function SignUp({navigation, route}) {
  const user = route.params?.user;
  const {userdetails, setuserdetails} = useContext(CartProvider);

  var [cnicFront, setCnicFront] = useState('');
  var [cnicBack, setCnicBack] = useState('');
  var [cnicFrontImageUrl, setcnicFrontImageUrl] = useState('');
  var [cnicBackImageUrl, setcnicBackImageUrl] = useState('');

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  // Checking Validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email Address is Required')
      .email('Please enter valid email'),
    password: Yup.string()
      .required('Password is Required')
      .min(6, 'Password Should be greater than 6 letters'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
    firstname: Yup.string().required('First Name is Required'),

    lastname: Yup.string().required('Last Name is Required'),
    PhoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'too short')
      .max(11, 'too long'),
  });

  //Same axios call sa signup bhi ho raha or admin ko call bhi ja rahi ha
  const handleSignUp = async (
    email,
    password,
    firstname,
    lastname,
    confirmpassword,
    PhoneNumber,
  ) => {
    if (cnicFrontImageUrl === '' || cnicBackImageUrl === '') {
      alert('Please enter CNIC Photos');
    } else {
      var userData = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        confirmPassword: confirmpassword,
        role: route.params?.user,
        active: 'pending',
        cnicFrontImageUrl: cnicFrontImageUrl,
        cnicBackImageUrl: cnicBackImageUrl,
        phonenumber: PhoneNumber,
      };

      try {
        const result = await axios.post(
          `${port.herokuPort}/users/signup`,
          userData,
        );
        alert('Your resquest has been sent to admin');
      } catch (err) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      }
    }
  };

  const handleUploadFront = async image => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'MuhammadTufailAli'),
      data.append('cloud_name', 'vehiclebuddy');

    fetch('https://api.cloudinary.com/v1_1/vehiclebuddy/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        var newUrl = data.url.slice(0, 4) + 's' + data.url.slice(4);
        console.log(newUrl);
        setcnicFrontImageUrl(newUrl);
      });
  };
  const openImagePickerFront = () => {
    // let imageList = [];

    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(response => {
        setCnicFront(response.path);
        let imageList = {
          filename: response.filename,
          path: response.path,
          data: response.data,
        };

        var prefix = Math.random();
        let newfile = {
          uri: imageList.path,
          type: `${prefix}/${imageList.path.split('.')[2]}`,
          name: `${prefix}.${imageList.path.split('.')[2]}`,
        };

        handleUploadFront(newfile);
      })
      .catch(e => console.log('error', e.message));
  };

  const handleUploadBack = async image => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'MuhammadTufailAli'),
      data.append('cloud_name', 'vehiclebuddy');

    fetch('https://api.cloudinary.com/v1_1/vehiclebuddy/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        var newUrl = data.url.slice(0, 4) + 's' + data.url.slice(4);
        console.log(newUrl);
        setcnicBackImageUrl(newUrl);
      });
  };
  const openImagePickerBack = () => {
    // let imageList = [];

    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(response => {
        setCnicBack(response.path);
        let imageList = {
          filename: response.filename,
          path: response.path,
          data: response.data,
        };

        console.log('THe pathhh', response.path);

        var prefix = Math.random();
        let newfile = {
          uri: imageList.path,
          type: `${prefix}/${imageList.path.split('.')[2]}`,
          name: `${prefix}.${imageList.path.split('.')[2]}`,
        };

        handleUploadBack(newfile);
      })
      .catch(e => console.log('error', e.message));
  };

  return (
    <ScrollView>
      <View style={{alignItems: 'center', marginTop: 50}}>
        {/* <Icon
          style={{margin: 10, justifyContent: 'center', color: '#1DA1F2'}}
          name="car"
          size={25}
        /> */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            marginTop: 40,
            color: Font.TextColor,
          }}>
          {user} <Text style={{color: '#8739F9'}}>SignUp</Text>
        </Text>
      </View>
      <Formik
        validationSchema={validationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          handleSignUp(
            values.email,
            values.password,
            values.firstname,
            values.lastname,
            values.confirmPassword,
            values.PhoneNumber,
          );
          console.log(values);
        }}>
        {({handleChange, handleSubmit, values, errors, isValid}) => (
          <>
            <TextInput
              name="firstname"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="First Name"
              onChangeText={handleChange('firstname')}
            />

            {errors.firstname && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.firstname}
              </Text>
            )}

            <TextInput
              name="lastname"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="Last Name"
              onChangeText={handleChange('lastname')}
            />
            {errors.lastname && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.lastname}
              </Text>
            )}

            <TextInput
              name="email"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="Email E.g name@account.com"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
            />

            {errors.email && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.email}
              </Text>
            )}

            <TextInput
              name="password"
              style={styles.inputText}
              secureTextEntry={true}
              placeholderTextColor={Font.placeholder}
              placeholder="Password must be greater than 6 letters"
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {errors.password && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.password}
              </Text>
            )}

            <TextInput
              name="confirmPassword"
              style={styles.inputText}
              secureTextEntry={true}
              placeholderTextColor={Font.placeholder}
              placeholder="Confirmed Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />
            {errors.confirmPassword && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.confirmPassword}
              </Text>
            )}

            <TextInput
              name="PhoneNumber"
              style={styles.inputText}
              placeholderTextColor={Font.placeholder}
              placeholder="Phone Number"
              onChangeText={handleChange('PhoneNumber')}
            />

            {errors.PhoneNumber && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 4,
                }}>
                {errors.PhoneNumber}
              </Text>
            )}
            <View
              style={{
                margin: 20,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Font.LightColor,
                borderRadius: 15,
              }}>
              <Text style={{color: Font.TextColor, marginBottom: 10}}>
                CNIC (Front Side)
              </Text>
              {cnicFrontImageUrl === '' ? (
                <Image
                  source={require('../../assets/cnicfront.jpg')}
                  style={{
                    width: '100%',
                    height: 220,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/cnicfront.jpg')}
                    style={{
                      width: '100%',
                      height: 220,
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{marginTop: 10, color: 'white'}}>
                    Image Uploaded successfully
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={openImagePickerFront}
                style={{
                  borderColor: '#8739F9',
                  borderWidth: 2,
                  marginTop: 10,

                  width: 150,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text style={styles.buttonText}>Add Photo</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                margin: 20,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Font.LightColor,
                borderRadius: 15,
              }}>
              <Text style={{color: Font.TextColor, marginBottom: 10}}>
                CNIC (Back Side)
              </Text>
              {cnicBackImageUrl === '' ? (
                <Image
                  source={require('../../assets/cnicback.jpg')}
                  style={{
                    width: '100%',
                    height: 220,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/cnicback.jpg')}
                    style={{
                      width: '100%',
                      height: 220,
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{marginTop: 10, color: 'white'}}>
                    Image Uploaded successfully
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={openImagePickerBack}
                style={{
                  borderColor: '#8739F9',
                  borderWidth: 2,
                  marginTop: 10,

                  width: 150,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text style={styles.buttonText}>Add Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                disabled={!isValid}
                title="Submit"
                style={{
                  padding: 10,
                  backgroundColor: isValid ? '#8739F9' : 'grey',
                  width: '90%',
                  alignItems: 'center',
                  // borderRadius: '50%',
                  marginTop: 10,
                }}
                onPress={handleSubmit}>
                <Text style={{color: 'white', fontWeight: '500'}}>SignUp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginBottom: 30}}
                onPress={() => {
                  navigation.navigate('Login', {user: user});
                }}>
                <Text style={{color: Font.TextBackground}}>
                  {'\n'} Already have an account?
                  <Text style={{color: '#8739F9'}}> Login</Text>{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      {/* <TextInput
        style={styles.inputText}
        placeholderTextColor={Font.placeholder}
        placeholder="First Name"
        onChangeText={value => setfirstname(value)}
      />

      <TextInput
        style={styles.inputText}
        placeholderTextColor={Font.placeholder}
        placeholder="Last Name"
        onChangeText={value => setlastname(value)}
      />

      <TextInput
        style={styles.inputText}
        placeholderTextColor={Font.placeholder}
        placeholder="Email E.g name@account.com"
        onChangeText={value => setemail(value)}
      />

      <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholderTextColor={Font.placeholder}
        placeholder="Password must be greater than 6 letters"
        onChangeText={value => setpassword(value)}
      />

      <TextInput
        style={styles.inputText}
        secureTextEntry={true}
        placeholderTextColor={Font.placeholder}
        placeholder="Confirmed Password"
        onChangeText={value => setconfirmpassword(value)}
      />
      <View
        style={{
          margin: 20,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Font.LightColor,
          borderRadius: 15,
        }}>
        <Text style={{color: Font.TextColor, marginBottom: 10}}>
          CNIC (Front Side)
        </Text>
        {cnicFrontImageUrl === '' ? (
          <Image
            source={require('../../assets/cnicfront.jpg')}
            style={{
              width: '100%',
              height: 220,
              borderRadius: 10,
            }}
          />
        ) : (
          <View style={{width: '100%', alignItems: 'center'}}>
            <Image
              source={require('../../assets/cnicfront.jpg')}
              style={{
                width: '100%',
                height: 220,
                borderRadius: 10,
              }}
            />
            <Text style={{marginTop: 10, color: 'white'}}>
              Image Uploaded successfully
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={openImagePickerFront}
          style={{
            borderColor: '#8739F9',
            borderWidth: 2,
            marginTop: 10,

            width: 150,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}>
          <Text style={styles.buttonText}>Add Photo</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          margin: 20,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Font.LightColor,
          borderRadius: 15,
        }}>
        <Text style={{color: Font.TextColor, marginBottom: 10}}>
          CNIC (Back Side)
        </Text>
        {cnicBackImageUrl === '' ? (
          <Image
            source={require('../../assets/cnicback.jpg')}
            style={{
              width: '100%',
              height: 220,
              borderRadius: 10,
            }}
          />
        ) : (
          <View style={{width: '100%', alignItems: 'center'}}>
            <Image
              source={require('../../assets/cnicback.jpg')}
              style={{
                width: '100%',
                height: 220,
                borderRadius: 10,
              }}
            />
            <Text style={{marginTop: 10, color: 'white'}}>
              Image Uploaded successfully
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={openImagePickerBack}
          style={{
            borderColor: '#8739F9',
            borderWidth: 2,
            marginTop: 10,

            width: 150,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}>
          <Text style={styles.buttonText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#8739F9',
            width: '90%',
            alignItems: 'center',
            // borderRadius: '50%',
            marginTop: 10,
          }}
          onPress={() => {
            if (
              firstname != '' &&
              lastname != '' &&
              email != '' &&
              password != '' &&
              confirmpassword != '' &&
              cnicFrontImageUrl !== '' &&
              cnicBackImageUrl !== ''
            ) {
              if (password.length > 6) {
                if (password == confirmpassword) {
                  handleSignUp();
                } else {
                  alert('Confirm password does not match');
                }
              } else {
                alert('Password must be greater than 6');
              }
            } else {
              alert('Enter all Fields');
            }
          }}>
          <Text style={{color: 'white', fontWeight: '500'}}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginBottom: 30}}
          onPress={() => {
            navigation.navigate('Login', {user: user});
          }}>
          <Text style={{color: Font.TextBackground}}>
            {'\n'} Already have an account?
            <Text style={{color: '#8739F9'}}> Login</Text>{' '}
          </Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
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
    color: 'black',
  },
  buttonText: {
    fontSize: 16,
    color: '#8739F9',
  },
});

export default SignUp;

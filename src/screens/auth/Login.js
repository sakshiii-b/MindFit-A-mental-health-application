/* eslint-disable prettier/prettier */
import React, { useState,useEffect} from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const storedEmail = await AsyncStorage.getItem('email');
        navigation.navigate('Home'); // Replace 'Home' with your actual home route name
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        const response = await fetch('http://192.168.123.244:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Unexpected content type in response.');
        }
  
        const data = await response.json();
        console.log(data)
  
        if (data.message === 'Login successful') {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('email', email);
          navigation.navigate('Home'); // Replace 'Home' with your actual home route name
        } else {
          Alert.alert('Login Failed', 'Please enter valid login details');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error...', 'An error occurred. Please try again later.');
      }
    } else {
      Alert.alert('Info...', 'Please enter both User ID and password.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.name}>MIND-FIT</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="User ID"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setemail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginText}>Register/signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // height:150,
    // width:150,
    marginBottom: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#9D2235',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: 'black',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#9D2235',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signup: {
    color: 'black',
    fontSize: 11,
  },
});

export default Login;
// import React, { useState, useEffect } from 'react';
// import { View,Alert, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { COLORS, ROUTES } from '../../constants';
// import Logo from '../../assets/icons/LOGO.svg';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Login = ({ navigation }) => {
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     checkLoginStatus();
//   }, []);

//   const checkLoginStatus = async () => {
//     try {
//       const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//       if (isLoggedIn === 'true') {
//         const localEmail = await AsyncStorage.getItem('teacherEmail');
//         const localPassword = await AsyncStorage.getItem('password');
//        const response = await fetch('https://demo.vmmhs.org/admin/ApiController/teacherLogin', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: `email=${encodeURIComponent(localEmail)}&password=${encodeURIComponent(localPassword)}`,
//         });

//         const data = await response.json();
//         navigation.navigate(ROUTES.HOME);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleLogin = async () => {
//   //  navigation.navigate(ROUTES.HOME);
//     if (username !== '' && password !== '') {
//       try {
//         const response = await fetch('https://demo.vmmhs.org/admin/ApiController/teacherLogin', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: `email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
//         });

//         const data = await response.json();
//         //console.log(data); // Log the response for debugging

//         if (data.responseCode === 200) {
//           // Login successful, store the user type in async storage
//           await AsyncStorage.setItem('isLoggedIn', 'true');
//           await AsyncStorage.setItem('teacherEmail',data.teacherEmail);
//           await AsyncStorage.setItem('teacherName',data.teacherName);
//           await AsyncStorage.setItem('className',data.className);
//           await AsyncStorage.setItem('password',password);
//           navigation.navigate(ROUTES.HOME);
//         } else {
//           // Login failed, display error message
//           Alert.alert('Login Failed', 'Please enter valid login details');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         Alert.alert('Error...', 'An error occurred. Please try again later.');
//       }
//     } else {
//       Alert.alert('Info...', 'Please enter both User ID and password.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../../assets/logovmm.png')} style={styles.logo} />
//       <Text style={styles.name}>VMMHS Teacher</Text>
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.inputText}
//           placeholder="User ID"
//           placeholderTextColor="#003f5c"
//           onChangeText={text => setUsername(text)}
//           value={username}
//         />
//       </View>
//       <View style={styles.inputView}>
//         <TextInput
//           style={styles.inputText}
//           placeholder="Password"
//           placeholderTextColor="#003f5c"
//           secureTextEntry={true}
//           onChangeText={text => setPassword(text)}
//           value={password}
//         />
//       </View>
//       {/* <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
//         <Text style={styles.forgot}>Forgot Password?</Text>
//       </TouchableOpacity> */}
//       <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
//         <Text style={styles.loginText}>LOGIN</Text>
//       </TouchableOpacity>
//       {/* <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
//         <Text style={styles.signup}>Don't have an account? Sign up</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo:{
//     // height:150,
//     // width:150,
//     marginBottom:20,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 30,
//     color: '#9D2235',
//     marginBottom: 20,
//   },
//   inputView: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     justifyContent: 'center',
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.44,
//     shadowRadius: 10.32,

//     elevation: 16,
//   },
//   inputText: {
//     height: 50,
//     color: 'black',
//   },
//   forgot: {
//     color: 'black',
//     fontSize: 11,
//   },
//   loginBtn: {
//     width: '80%',
//     backgroundColor: '#9D2235',
//     borderRadius: 25,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.44,
//     shadowRadius: 10.32,

//     elevation: 16,
//   },
//   loginText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   signup: {
//     color: 'black',
//     fontSize: 11,
//   },
// });

// export default Login;

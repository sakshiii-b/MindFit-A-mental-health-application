/* eslint-disable prettier/prettier */
// import React from 'react';
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

// const Register = () => {
//   return (
//     <SafeAreaView
//       // eslint-disable-next-line react-native/no-inline-styles
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Register</Text>
//     </SafeAreaView>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({});
import React, { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async () => {
    if (name !== '' && email !== '' && password !== '' && gender !== '') {
      try {
        const response = await fetch('http://192.168.245.244:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            gender: gender,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          if (data.message === 'Registration successful') {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('email', email);
            navigation.navigate('Home'); // Replace 'Home' with your actual home route name
          } else {
            Alert.alert('Registration Failed', data.message);
          }
        } else {
          console.error('Network response was not ok. Status:', response.status);
          Alert.alert('Error...', 'An error occurred. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error...', 'An error occurred. Please try again later.');
      }
    } else {
      Alert.alert('Info...', 'Please enter all details.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.name}>Register</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email ID"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Gender"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setGender(text)}
          value={gender}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain the same as in Login.js
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 5,
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
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
});

export default Register;

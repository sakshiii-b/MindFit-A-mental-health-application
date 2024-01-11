// import React from 'react';
// import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
// import {COLORS, ROUTES} from '../../constants';

// const Settings = ({navigation}) => {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.bgColor,
//       }}>
//       <Text>Settings Detail</Text>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.button}
//         activeOpacity={0.8}>
//         <Text style={styles.buttonText}>Go Back</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default Settings;

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: COLORS.primary,
//     padding: 17,
//     margin: 10,
//     borderRadius: 5,
//     fontSize: 18,
//     width: 180,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet } from 'react-native';

const FormExample = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [degree, setDegree] = useState('');
  const [classt, setClasst] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = () => {
    // Perform your form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Degree:', degree);
    console.log('Classt:', classt);
    console.log('Photo:', photo);
  };

  return (
    
    <View style={styles.container}>
       <Text style={styles.title}>Class Teacher Details</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor="black"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Degree"
        placeholderTextColor="black"
        value={degree}
        onChangeText={setDegree}
        style={styles.input}
        
      />
      <TextInput
        placeholder="Classt"
        placeholderTextColor="black"
        value={classt}
        onChangeText={setClasst}
        style={styles.input}
       
      />
      <TextInput
        placeholder="Photo"
        placeholderTextColor="black"
        value={photo}
        onChangeText={setPhoto}
        style={styles.input}
       
      />

      <Button title="Update" onPress={handleSubmit} color="#9D2235" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
});

export default FormExample;

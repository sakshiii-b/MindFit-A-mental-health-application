// import React ,{useState, useEffect}from 'react';
// import {StyleSheet, Text, View,Modal} from 'react-native';
// import {COLORS} from '../../constants';


// const Profile = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   return (
//     <View
//     style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: COLORS.bgColor,
//     }}>
//     <Text>Profile</Text>
//     </View>
//     );
// };  
// export default Profile;

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

      <Button title="Submit" onPress={handleSubmit} />
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
    color:'black',
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

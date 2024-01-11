//ADD STUDENT BUTTON FORM
import React, { useState } from 'react';
import { View, TextInput, Text, Modal, Button, StyleSheet, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddScreen = () => {
  const navigation = useNavigation();
  const [rollNo, setRollNo] = useState('');
  const [className, setClassName] = useState('');
  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const createStudent = async () => {
    // Form submission logic
    // ...
    try {
      // Send the form data to the API endpoint
      const response = await fetch('https://demo.vmmhs.org/admin/ApiController/createStudent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          rollNo,
          className,
          name,
          loginId,
          mobile,
          dob,
          address,
          photo,
          gender,
          password,
        }),
      });
      console.log('Response:', response.status, response.statusText);
      // Check the response status
      if (response.ok) {
        // Form submission successful
        Alert.alert('Success', 'Student added successfully!');
        // Reset form fields here
        setRollNo('');
        setClassName('');
        setName('');
        setLoginId('');
        setMobile('');
        setDob('');
        setAddress('');
        setPhoto('');
        setGender('');
        setPassword('');

        // Go back to the previous screen
        navigation.goBack();
      } else {
        // Form submission failed
        Alert.alert('Error', 'Failed to add student. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form fields here
    setRollNo('');
    setClassName('');
    setName('');
    setLoginId('');
    setMobile('');
    setDob('');
    setAddress('');
    setPhoto('');
    setGender('');
    setPassword('');

    // Go back to the previous screen
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.modalTitle}>Add Student</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Roll No"
          placeholderTextColor="black"
          value={rollNo}
          onChangeText={setRollNo}
          style={styles.input}
        />
        <TextInput
          placeholder="Class Name"
          placeholderTextColor="black"
          value={className}
          onChangeText={setClassName}
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile"
          placeholderTextColor="black"
          value={mobile}
          onChangeText={setMobile}
          style={styles.input}
        />
        <TextInput
          placeholder="DOB"
          placeholderTextColor="black"
          value={dob}
          onChangeText={setDob}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          placeholderTextColor="black"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TextInput
          placeholder="Gender"
          placeholderTextColor="black"
          value={gender}
          onChangeText={setGender}
          style={styles.input}
        />
        <TextInput
          placeholder="Photo"
          placeholderTextColor="black"
          value={photo}
          onChangeText={setPhoto}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={createStudent} color="#9D2235" />
          <Button title="Cancel" onPress={handleCancel} color="red" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});

export default AddScreen;

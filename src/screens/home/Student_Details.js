import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Button, ScrollView,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Student_Details = ({ route }) => {
  const { rollNo } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [className, setClassName] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [selectedStudent, setSelectedStudent] = useState();

  const handleSubmit= async () => {
    try {
      const response = await fetch(`https://demo.vmmhs.org/admin/ApiController/updateStudent/${rollNo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rollNo,
          className,
          name,
          mobile,
          dob,
          address,
          photo,
          gender,
          password,
        }),
      });
  
      if (response.ok) {
        console.log('Student updated successfully');
  
        // Show the alert
        Alert.alert('Student Updated Successfully');
  
        // ... any other logic you want to perform after successful update ...
  
      } else {
        console.error('Error updating student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  const handleCancel = () => {
    // Reset form fields here
    setClassName('');
    setName('');
    setMobile('');
    setDob('');
    setAddress('');
    setPhoto('');
    setGender('');
    setPassword('');
    navigation.goBack();
  };

  useEffect(() => {
    fetchStudentDetails(rollNo); // Fetch student details when component mounts
  }, []);

  const fetchStudentDetails = async (rollNo) => {
    try {
      const response = await fetch(
        `https://demo.vmmhs.org/admin/ApiController/getStudents/${rollNo}`
      );
      const data = await response.json();
      // console.log('Fetched data:', data);
      const student = data.find((student) => student.rollNo === rollNo);
      if (student) {
        // Update the state with the fetched data
        setClassName(student.className);
        setName(student.name);
        setMobile(student.mobile);
        setDob(student.dob);
        setAddress(student.address);
        setPhoto(student.photo);
        setGender(student.gender);
        setPassword(student.password);

        setSelectedStudent(student);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      <Text style={styles.rollNo}>Roll No: {rollNo}</Text>

      {selectedStudent && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Class Name"
            placeholderTextColor="black"
            value={className !== null ? className : ''}
            onChangeText={setClassName}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            placeholderTextColor="black"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            placeholderTextColor="black"
            value={dob}
            onChangeText={setDob}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="black"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Photo"
            placeholderTextColor="black"
            value={photo}
            onChangeText={setPhoto}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            placeholderTextColor="black"
            value={gender}
            onChangeText={setGender}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          /> */}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="SUBMIT" onPress={handleSubmit} color="#9D2235" />
        <Button style={styles.button} title="CANCEL" onPress={handleCancel} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  rollNo: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    width: '40%',
  },
});

export default Student_Details;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Modal, StyleSheet, TextInput, Button } from 'react-native';

// const Student_Details = ({ route }) => {
//   const { rollNo } = route.params;
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [className, setClassName] = useState('');
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [dob, setDob] = useState('');
//   const [address, setAddress] = useState('');
//   const [photo, setPhoto] = useState('');
//   const [gender, setGender] = useState('');
//   const [password, setPassword] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState(null);
  

//   const handleSubmit = () => {
//     // Perform form submission logic here
//     console.log('Form submitted!');
//   };

//   const handleCancel = () => {
//     // Reset form fields here
//     setClassName('');
//     setName('');
//     setMobile('');
//     setDob('');
//     setAddress('');
//     setPhoto('');
//     setGender('');
//     setPassword('');
//   };

//   useEffect(() => {
//     fetchStudentDetails(rollNo); // Pass the rollNo parameter to the function
//   }, []);

//   const fetchStudentDetails = async (rollNo) => {
//     try {
//       const response = await fetch(
//         `https://demo.vmmhs.org/admin/ApiController/getStudents/${rollNo}`
//       );
//       const data = await response.json();

//       // Update the state with the fetched data
//       setClassName(data.className);
//       setName(data.name);
//       setMobile(data.mobile);
//       setDob(data.dob);
//       setAddress(data.address);
//       setPhoto(data.photo);
//       setGender(data.gender);
//       setPassword(data.password);

//       setSelectedStudent(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Student Details</Text>
//       <Text style={styles.rollNo}>Roll No: {rollNo}</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Class Name"
//           value={className}
//           onChangeText={setClassName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Mobile"
//           value={mobile}
//           onChangeText={setMobile}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Date of Birth"
//           value={dob}
//           onChangeText={setDob}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Address"
//           value={address}
//           onChangeText={setAddress}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Photo"
//           value={photo}
//           onChangeText={setPhoto}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Gender"
//           value={gender}
//           onChangeText={setGender}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button style={styles.button} title="SUBMIT" onPress={handleSubmit} />
//         <Button style={styles.button} title="CANCEL" onPress={handleCancel} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   rollNo: {
//     marginBottom: 20,
//   },
//   inputContainer: {
//     backgroundColor: '#f7f7f7',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     width: '40%',
//   },
// });

// export default Student_Details;



// import React, { useState, useEffect } from 'react';
// import { View, Text, Modal, StyleSheet, TextInput, Button } from 'react-native';

// const Student_Details = ({ route }) => {
//   const { rollNo } = route.params;
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [className, setClassName] = useState('');
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [dob, setDob] = useState('');
//   const [address, setAddress] = useState('');
//   const [photo, setPhoto] = useState('');
//   const [gender, setGender] = useState('');
//   const [password, setPassword] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const handleSubmit = () => {
//     // Perform form submission logic here
//     console.log('Form submitted!');
//   };

//   const handleCancel = () => {
//     // Reset form fields here
//     setClassName('');
//     setName('');
//     setMobile('');
//     setDob('');
//     setAddress('');
//     setPhoto('');
//     setGender('');
//     setPassword('');
//   };

//   useEffect(() => {
//     fetchStudentDetails();
//   }, []);

//   const fetchStudentDetails = async (rollNo) => {
//     try {
//       const response = await fetch(
//         `https://demo.vmmhs.org/admin/ApiController/getStudents/${rollNo}`
//       );
//       const data = await response.json();
//       setSelectedStudent(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Student Details</Text>
//       <Text style={styles.rollNo}>Roll No: {rollNo}</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Class Name"
//           value={className}
//           onChangeText={setClassName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Mobile"
//           value={mobile}
//           onChangeText={setMobile}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Date of Birth"
//           value={dob}
//           onChangeText={setDob}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Address"
//           value={address}
//           onChangeText={setAddress}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Photo"
//           value={photo}
//           onChangeText={setPhoto}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Gender"
//           value={gender}
//           onChangeText={setGender}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <Button style={styles.button} title="SUBMIT" onPress={handleSubmit} />
//         <Button style={styles.button} title="CANCEL" onPress={handleCancel} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   rollNo: {
//     marginBottom: 20,
//   },
//   inputContainer: {
//     backgroundColor: '#f7f7f7',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     width: '40%',
//   },
// });

// export default Student_Details;



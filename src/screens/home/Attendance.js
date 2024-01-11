//ATTENDANCE
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView,Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceTime, setAttendanceTime] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getClassName();
    getTeacherName();
        getStudentsByClassName();
      }, []);

      const getClassName = async () => {
        try {
          const className = await AsyncStorage.getItem('className');
          setClassName(className);
        } catch (error) {
          console.error('Error fetching className:', error);
        }
      };
      const getTeacherName = async () => {
        try {
          const teacherName = await AsyncStorage.getItem('teacherName');
          setTeacherName(teacherName);
        } catch (error) {
          console.error('Error fetching teacherName:', error);
        }
      };

  const getStudentsByClassName = async () => {
    try {
      let className = await AsyncStorage.getItem('className');
      const response = await fetch('https://demo.vmmhs.org/admin/ApiController/getStudentsByClassNameForAttendance');
      const data = await response.json();
      console.log(data.setudents);
      // Add a "selected" property to each student
      if(data.presentyTaken===false){
        const studentsWithSelection = data.students.map((student) => ({
          ...student,
          selected: true,
        }));
        setStudents(studentsWithSelection);
      }
      if(data.presentyTaken===true){
        const studentsWithSelection = data.students.map((student) => ({
          ...student,
          selected: student.presenty=="1" ? true : false,
        }));
        setStudents(studentsWithSelection);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const toggleCheckbox = (rollNo) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNo === rollNo) {
        return {
          ...student,
          selected: !student.selected,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };
  // const navigateToViewAttendance = () => {
  //   navigation.navigate('ViewAttendance');
  // };

  const submitAttendance = async () => {
    const formattedDate = moment( new Date().getDate(), 'DD-MM-YY').format('DD-MM-YYYY');
    let className = await AsyncStorage.getItem('className');

    const selectedStudents = students.filter((student) => student.selected) ;
    const notSelectedStudents = students.filter((student) => !student.selected) ;
    const attendanceData = {
      
      students: selectedStudents.map((student) => ({
        rollNo: student.rollNo,
        name: student.name,
        presenty: true,
        className: className,
        attendanceDate: formattedDate,
      })),
      absentStudents: notSelectedStudents.map((student) => ({
        rollNo: student.rollNo,
        name: student.name,
        presenty: false,
        className: className,
        attendanceDate: formattedDate,
      }))
    };
  
    try {
      console.log(attendanceData);
      const response = await fetch('https://demo.vmmhs.org/admin/ApiController/createAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(attendanceData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Attendance created successfully');
        Alert.alert('Attendance Created Successfully');

        if(data.presentyTaken===false){
          const studentsWithSelection = data.students.map((student) => ({
            ...student,
            selected: true,
          }));
          setStudents(studentsWithSelection);
        }
        if(data.presentyTaken===true){
          const studentsWithSelection = data.students.map((student) => ({
            ...student,
            selected: student.presenty=="1" ? true : false,
          }));
          setStudents(studentsWithSelection);
        }
        // Clear the input fields after successful submission
        setAttendanceDate('');
        setAttendanceTime('');
      } else {
        console.log(response);
        console.error('Error creating attendance');
      }
    } catch (error) {
      console.error('Error creating attendance:', error);
    }
  };
  
  const renderStudent = ({ item }) => (
    <View style={styles.studentRow}>
      <Text style={styles.studentInfo}>{item.rollNo}</Text>
      <Text style={styles.studentInfo}>{item.name}</Text>
      <CheckBox
        value={item.selected}
        onValueChange={() => toggleCheckbox(item.rollNo)}
        style={styles.checkbox}
        tintColors={{ true: 'black', false: 'black' }}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    {/* <TouchableOpacity style={styles.viewButton} onPress={navigateToViewAttendance}>
        <Text style={styles.viewButtonText}>HISTORY</Text>
      </TouchableOpacity> */}
 
      <Text style={styles.title}>Class ={className}</Text>
      <Text style={styles.subtitle}>Class Teacher:{teacherName}</Text>
      <Text style={styles.subtitle}>Attendance Date : {moment( new Date().getDate(), 'DD-MM-YY').format('DD-MM-YYYY')}</Text>
      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item) => item.rollNo.toString()}
      />

      <TouchableOpacity onPress={submitAttendance}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  viewButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#9D2233',
    borderRadius: 15,
    height: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    color: 'black',
  },
  studentInfo: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  checkbox: {
    alignSelf: 'flex-end',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    backgroundColor: '#9D2233',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;


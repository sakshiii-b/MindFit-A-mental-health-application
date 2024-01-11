//ADD Student
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StudentsScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  //

  const navigation = useNavigation();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://demo.vmmhs.org/admin/ApiController/getStudents');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudentDetails = async (rollNo) => {
    try {
      navigation.navigate('Student_Details', { rollNo: rollNo });
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToAddScreen = () => {
    navigation.navigate('Add');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddScreen}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Students</Text>

      <ScrollView style={styles.studentList}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Roll No</Text>
          <Text style={styles.tableHeader}>Name</Text>
        </View>
       {students.map((student, index) => (
  <TouchableOpacity
    key={student.rollNo} // Ensure rollNo is unique for each student
    style={[
      styles.tableRow,
      { backgroundColor: index % 2 === 0 ? '#F2F2F2' : 'white' },
      index !== students.length - 1 && { borderBottomColor: '#F2F2F2' },
    ]}
    onPress={() => fetchStudentDetails(student.rollNo)}
  >
    <Text style={styles.tableCell}>{student.rollNo}</Text>
    <Text style={styles.tableCell}>{student.name}</Text>
  </TouchableOpacity>
))}
      </ScrollView>

      {selectedStudent && (
        <View style={styles.studentDetailsContainer}>
          <Text style={styles.selectedStudentTitle}>Selected Student:</Text>
          <Text>Roll No: {selectedStudent.rollNo}</Text>
          <Text>Name: {selectedStudent.name}</Text>
          <Text>Mobile: {selectedStudent.mobile}</Text>
          <Text>DOB: {selectedStudent.dob}</Text>
          <Text>Address: {selectedStudent.address}</Text>
          <Text>Gender: {selectedStudent.gender}</Text>
          <Text>Photo: {selectedStudent.photo}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#9D2235',
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
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  studentList: {
    flex: 1,
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    backgroundColor: '#333',
  },
  tableCell: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
  },
  studentDetailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  selectedStudentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default StudentsScreen;

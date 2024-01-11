// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// import DatePicker from '@react-native-community/datetimepicker';

// const ViewAttendanceScreen = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [attendanceData, setattendanceData] = useState([]);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     fetchAttendanceData();
//   }, [selectedDate]);

//   const fetchAttendanceData = async () => {
//     const apiUrl = 'https://demo.vmmhs.org/admin/ApiController/getAttendanceByClassandDate';
//     const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `attendanceDate=${formattedDate}`,
//       });

//       const data = await response.json();
//       setAttendanceData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDateChange = (event, date) => {
//     setShowDatePicker(false);

//     if (date !== undefined) {
//       setSelectedDate(date);
//     }
//   };

//   const setAttendanceData = (newAttendanceData) => {
//     setAttendanceData(newAttendanceData);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Attendance History</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Select Date:</Text>
//         <DatePicker
//           value={selectedDate}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       </View>

//       <Button
//         title="Fetch Attendance"
//         onPress={fetchAttendanceData}
//         disabled={!selectedDate}
//       />

//       {attendanceData && (
//         <View style={styles.attendanceContainer}>
//           <Text style={styles.heading}>Attendance for {selectedDate.toDateString()}:</Text>
//           {attendanceData.map((item, index) => (
//             <Text key={index} style={styles.attendanceItem}>
//               {/* Render attendance data item here */}
//             </Text>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 5,
//   },
//   attendanceContainer: {
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 16,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   attendanceItem: {
//     marginBottom: 5,
//   },
// });

// export default ViewAttendanceScreen;

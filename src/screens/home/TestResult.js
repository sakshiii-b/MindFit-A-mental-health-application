//ATTENDANCE
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView,Alert} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import moment from 'moment';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const App = () => {
//   const [students, setStudents] = useState([]);
//   const [className, setClassName] = useState('');
//   const [teacherName, setTeacherName] = useState('');
//   const [attendanceDate, setAttendanceDate] = useState('');
//   const [attendanceTime, setAttendanceTime] = useState('');
//   const navigation = useNavigation();
//   useEffect(() => {
//     getClassName();
//     getTeacherName();
//         getStudentsByClassName();
//       }, []);

//       const getClassName = async () => {
//         try {
//           const className = await AsyncStorage.getItem('className');
//           setClassName(className);
//         } catch (error) {
//           console.error('Error fetching className:', error);
//         }
//       };
//       const getTeacherName = async () => {
//         try {
//           const teacherName = await AsyncStorage.getItem('teacherName');
//           setTeacherName(teacherName);
//         } catch (error) {
//           console.error('Error fetching teacherName:', error);
//         }
//       };

//   const getStudentsByClassName = async () => {
//     try {
//       let className = await AsyncStorage.getItem('className');
//       const response = await fetch('https://demo.vmmhs.org/admin/ApiController/getStudentsByClassNameForAttendance');
//       const data = await response.json();
//       console.log(data.setudents);
//       // Add a "selected" property to each student
//       if(data.presentyTaken===false){
//         const studentsWithSelection = data.students.map((student) => ({
//           ...student,
//           selected: true,
//         }));
//         setStudents(studentsWithSelection);
//       }
//       if(data.presentyTaken===true){
//         const studentsWithSelection = data.students.map((student) => ({
//           ...student,
//           selected: student.presenty=="1" ? true : false,
//         }));
//         setStudents(studentsWithSelection);
//       }
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const toggleCheckbox = (rollNo) => {
//     const updatedStudents = students.map((student) => {
//       if (student.rollNo === rollNo) {
//         return {
//           ...student,
//           selected: !student.selected,
//         };
//       }
//       return student;
//     });
//     setStudents(updatedStudents);
//   };
//   // const navigateToViewAttendance = () => {
//   //   navigation.navigate('ViewAttendance');
//   // };

//   const submitAttendance = async () => {
//     const formattedDate = moment( new Date().getDate(), 'DD-MM-YY').format('DD-MM-YYYY');
//     let className = await AsyncStorage.getItem('className');

//     const selectedStudents = students.filter((student) => student.selected) ;
//     const notSelectedStudents = students.filter((student) => !student.selected) ;
//     const attendanceData = {
      
//       students: selectedStudents.map((student) => ({
//         rollNo: student.rollNo,
//         name: student.name,
//         presenty: true,
//         className: className,
//         attendanceDate: formattedDate,
//       })),
//       absentStudents: notSelectedStudents.map((student) => ({
//         rollNo: student.rollNo,
//         name: student.name,
//         presenty: false,
//         className: className,
//         attendanceDate: formattedDate,
//       }))
//     };
  
//     try {
//       console.log(attendanceData);
//       const response = await fetch('https://demo.vmmhs.org/admin/ApiController/createAttendance', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: JSON.stringify(attendanceData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         console.log('Attendance created successfully');
//         Alert.alert('Attendance Created Successfully');

//         if(data.presentyTaken===false){
//           const studentsWithSelection = data.students.map((student) => ({
//             ...student,
//             selected: true,
//           }));
//           setStudents(studentsWithSelection);
//         }
//         if(data.presentyTaken===true){
//           const studentsWithSelection = data.students.map((student) => ({
//             ...student,
//             selected: student.presenty=="1" ? true : false,
//           }));
//           setStudents(studentsWithSelection);
//         }
//         // Clear the input fields after successful submission
//         setAttendanceDate('');
//         setAttendanceTime('');
//       } else {
//         console.log(response);
//         console.error('Error creating attendance');
//       }
//     } catch (error) {
//       console.error('Error creating attendance:', error);
//     }
//   };
  
//   const renderStudent = ({ item }) => (
//     <View style={styles.studentRow}>
//       <Text style={styles.studentInfo}>{item.rollNo}</Text>
//       <Text style={styles.studentInfo}>{item.name}</Text>
//       <CheckBox
//         value={item.selected}
//         onValueChange={() => toggleCheckbox(item.rollNo)}
//         style={styles.checkbox}
//         tintColors={{ true: 'black', false: 'black' }}
//       />
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
//     {/* <TouchableOpacity style={styles.viewButton} onPress={navigateToViewAttendance}>
//         <Text style={styles.viewButtonText}>HISTORY</Text>
//       </TouchableOpacity> */}
 
//       <Text style={styles.title}>Class ={className}</Text>
//       <Text style={styles.subtitle}>Class Teacher:{teacherName}</Text>
//       <Text style={styles.subtitle}>Attendance Date : {moment( new Date().getDate(), 'DD-MM-YY').format('DD-MM-YYYY')}</Text>
//       <FlatList
//         data={students}
//         renderItem={renderStudent}
//         keyExtractor={(item) => item.rollNo.toString()}
//       />

//       <TouchableOpacity onPress={submitAttendance}>
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>Submit</Text>
//         </View>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   viewButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: '#9D2233',
//     borderRadius: 15,
//     height: 30,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.24,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   viewButtonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: 'black',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     marginBottom: 10,
//     color: 'black',
//   },
//   studentRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     color: 'black',
//   },
//   studentInfo: {
//     flex: 1,
//     fontSize: 16,
//     color: 'black',
//   },
//   checkbox: {
//     alignSelf: 'flex-end',
//     color: 'black',
//     borderWidth: 1,
//     borderColor: 'black',
//   },
//   button: {
//     backgroundColor: '#9D2233',
//     paddingVertical: 10,
//     alignItems: 'center',
//     marginTop: 20,
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.44,
//     shadowRadius: 10.32,
//     elevation: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default App;


import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
// import FastImage from 'react-native-fast-image';



const App = () => {
  const dummyData = {
    overallScore: 75,
    detailedBreakdown: [
      { category: 'Stress', score: 80 },
      { category: 'Anxiety', score: 70 },
      { category: 'Mood', score: 85 },
    ],
    recommendations: [
      {
        id: 1,
        image: 'http://192.168.173.244:5000/get_image/1',
        description: 'Short description about the article 1',
        link: 'https://www.example.com/article1',
      },
      {
        id: 2,
        image: 'http://192.168.173.244:5000/get_image/2',
        description: 'Short description about the article 2',
        link: 'https://www.example.com/article2',
      },
      {
        id: 3,
        image: 'http://192.168.173.244:5000/get_image/3',
        description: 'Short description about the article 2',
        link: 'https://www.example.com/article2',
      },
      {
        id: 4,
        image: 'http://192.168.173.244:5000/get_image/4',
        description: 'Short description about the article 2',
        link: 'https://www.example.com/article2',
      },
      // Add more recommendation objects as needed
    ],
  };

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call and set data
        // Replace this with your actual API call
        setTimeout(async () => {
          setApiData(dummyData);

          if (dummyData.recommendations && dummyData.recommendations.length > 0) {
            const imageTasks = dummyData.recommendations.map(async (item) => {
              try {
                const response = await fetch(item.image);
                const imageBlob = await response.blob();
                const base64Image = await convertBlobToBase64(imageBlob);
                await AsyncStorage.setItem(`image_${item.id}`, base64Image);
              } catch (error) {
                console.error('Error downloading and storing images:', error);
              }
            });

            // Wait for all image tasks to complete before proceeding
            await Promise.all(imageTasks);
          }
        }, 3000); // Simulating a delay in fetching data (1 second)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const convertBlobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const getRiskLevel = (score) => {
    if (score <= 33.33) {
      return 'Low Risk';
    } else if (score <= 66.66) {
      return 'Moderate Risk';
    } else {
      return 'High Risk';
    }
  };

  const RecommendationItem = ({ item }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
      const fetchImage = async () => {
        try {
          const storedImageData = await AsyncStorage.getItem(`image_${item.id}`);
          setImageData(storedImageData);
        } catch (error) {
          console.error('Error fetching image data:', error);
        }
      };
      fetchImage();
    }, [item.id]);

    return (
      <View style={styles.recommendationItem}>
        {imageData && (
          <Image
            source={{ uri: imageData }}
            style={styles.recommendationImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.recommendationDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#6441A5', '#2a0845']} // Example gradient colors
      style={styles.gradient}
    >
  <View style={styles.container}>
    <Text style={styles.title}>MindFit Test Results</Text>
    {apiData ? (
      <View>
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Overall Score</Text>
          {/* <Text style={styles.score}>{apiData.overallScore}</Text> */}
        </View>
        <View style={styles.scoreMeter}>
          <Svg width="150" height="60">
            <Circle
              cx="75"
              cy="30"
              r="20"
              stroke="#00a86b"
              strokeWidth="2"
              strokeOpacity="0.5"
              fill="none"
              strokeDasharray={`${(apiData.overallScore / 100) * 125},125`}
            />
          </Svg>
          <Text style={styles.riskLevel}>
            {getRiskLevel(apiData.overallScore)}
          </Text>
          <Text style={styles.score}>{apiData.overallScore}</Text>
        </View>
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
          <View style={styles.breakdownContainer}>
            {apiData.detailedBreakdown.map((item, index) => (
              <Text key={index} style={styles.breakdownItem}>
                {item.category}: {item.score}
              </Text>
            ))}
          </View>
        </View>
        {/* ... (other sections) */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {apiData.recommendations.map((item) => (
              <RecommendationItem key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      </View>
    ) : (
      <View style={styles.loadingContainer}>
            {/* Your loading UI */}
            {/* <FastImage
              style={styles.loadingImage}
              source={require('../../assets/loading.gif')}
              // autoplay={true}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <Text style={styles.loadingText}>Fetching your results...</Text>
      </View>
    )}
  </View>
  </LinearGradient>
);
}

const styles = StyleSheet.create({

  // Your styles here

  container: {
    flex: 1,
    // paddingHorizontal: 1,
    paddingLeft: 20,
    backgroundColor: 'transparent',
  },
  gradient: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  recommendationsContainer: {
    marginTop: 120,
    color:'white',
    marginBottom: 20,
  },
  recommendationItem: {
    marginRight: 20, // Increase the gap between recommendation items
    width: 250, // Adjust the width of the recommendation item
    alignItems: 'center',
  },
  recommendationDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: 'blue', // Change this to your desired text color
  },
  recommendationImage: {
    width: '100%', // Make the image take the entire width of its container
    height: 120, // Set a fixed height for the image
    borderRadius: 8,
    marginBottom: 5,
  },
  // eslint-disable-next-line no-dupe-keys
  recommendationDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 1,
    marginLeft: 75,
    color: 'white'
  },
  scoreMeter: {
    alignItems: 'center',
    marginTop: 1,
  },
  riskLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },

  resultBox: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  resultSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    // marginTop:'10',
    color: 'white',
    textAlign: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  breakdownContainer: {
    marginTop: 5,
  },
  breakdownItem: {
    fontSize: 16,
    color: 'white',
  },
  recommendations: {
    fontSize: 16,
    color: 'white',
  },
});

export default App;

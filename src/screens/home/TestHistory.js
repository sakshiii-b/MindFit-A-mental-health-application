/* eslint-disable prettier/prettier */
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
// import { Svg, Circle } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';
// import FastImage from 'react-native-fast-image';



// const App = () => {
//   const dummyData = {
//     overallScore: 75,
//     detailedBreakdown: [
//       { category: 'Stress', score: 80 },
//       { category: 'Anxiety', score: 70 },
//       { category: 'Mood', score: 85 },
//     ],
//     recommendations: [
//       {
//         id: 1,
//         image: 'http://192.168.173.244:5000/get_image/1',
//         description: 'Short description about the article 1',
//         link: 'https://www.example.com/article1',
//       },
//       {
//         id: 2,
//         image: 'http://192.168.173.244:5000/get_image/2',
//         description: 'Short description about the article 2',
//         link: 'https://www.example.com/article2',
//       },
//       {
//         id: 3,
//         image: 'http://192.168.173.244:5000/get_image/3',
//         description: 'Short description about the article 2',
//         link: 'https://www.example.com/article2',
//       },
//       {
//         id: 4,
//         image: 'http://192.168.173.244:5000/get_image/4',
//         description: 'Short description about the article 2',
//         link: 'https://www.example.com/article2',
//       },
//       // Add more recommendation objects as needed
//     ],
//   };

//   const [apiData, setApiData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulate API call and set data
//         // Replace this with your actual API call
//         setTimeout(async () => {
//           setApiData(dummyData);

//           if (dummyData.recommendations && dummyData.recommendations.length > 0) {
//             const imageTasks = dummyData.recommendations.map(async (item) => {
//               try {
//                 const response = await fetch(item.image);
//                 const imageBlob = await response.blob();
//                 const base64Image = await convertBlobToBase64(imageBlob);
//                 await AsyncStorage.setItem(`image_${item.id}`, base64Image);
//               } catch (error) {
//                 console.error('Error downloading and storing images:', error);
//               }
//             });

//             // Wait for all image tasks to complete before proceeding
//             await Promise.all(imageTasks);
//           }
//         }, 3000); // Simulating a delay in fetching data (1 second)
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const convertBlobToBase64 = async (blob) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onerror = reject;
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.readAsDataURL(blob);
//     });
//   };

//   const getRiskLevel = (score) => {
//     if (score <= 33.33) {
//       return 'Low Risk';
//     } else if (score <= 66.66) {
//       return 'Moderate Risk';
//     } else {
//       return 'High Risk';
//     }
//   };

//   const RecommendationItem = ({ item }) => {
//     const [imageData, setImageData] = useState(null);

//     useEffect(() => {
//       const fetchImage = async () => {
//         try {
//           const storedImageData = await AsyncStorage.getItem(`image_${item.id}`);
//           setImageData(storedImageData);
//         } catch (error) {
//           console.error('Error fetching image data:', error);
//         }
//       };
//       fetchImage();
//     }, [item.id]);

//     return (
//       <View style={styles.recommendationItem}>
//         {imageData && (
//           <Image
//             source={{ uri: imageData }}
//             style={styles.recommendationImage}
//             resizeMode="cover"
//           />
//         )}
//         <Text style={styles.recommendationDescription}>{item.description}</Text>
//       </View>
//     );
//   };

//   return (
//     <LinearGradient
//       colors={['#6441A5', '#2a0845']} // Example gradient colors
//       style={styles.gradient}
//     >
//   <View style={styles.container}>
//     <Text style={styles.title}>MindFit Test Results</Text>
//     {apiData ? (
//       <View>
//         <View style={styles.resultSection}>
//           <Text style={styles.sectionTitle}>Overall Score</Text>
//           {/* <Text style={styles.score}>{apiData.overallScore}</Text> */}
//         </View>
//         <View style={styles.scoreMeter}>
//           <Svg width="150" height="60">
//             <Circle
//               cx="75"
//               cy="30"
//               r="20"
//               stroke="#00a86b"
//               strokeWidth="2"
//               strokeOpacity="0.5"
//               fill="none"
//               strokeDasharray={`${(apiData.overallScore / 100) * 125},125`}
//             />
//           </Svg>
//           <Text style={styles.riskLevel}>
//             {getRiskLevel(apiData.overallScore)}
//           </Text>
//           <Text style={styles.score}>{apiData.overallScore}</Text>
//         </View>
//         <View style={styles.resultSection}>
//           <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
//           <View style={styles.breakdownContainer}>
//             {apiData.detailedBreakdown.map((item, index) => (
//               <Text key={index} style={styles.breakdownItem}>
//                 {item.category}: {item.score}
//               </Text>
//             ))}
//           </View>
//         </View>
//         {/* ... (other sections) */}
//         <View style={styles.recommendationsContainer}>
//           <Text style={styles.sectionTitle}>Recommendations</Text>
//           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//             {apiData.recommendations.map((item) => (
//               <RecommendationItem key={item.id} item={item} />
//             ))}
//           </ScrollView>
//         </View>
//       </View>
//     ) : (
//       <View style={styles.loadingContainer}>
//             {/* Your loading UI */}
//             {/* <FastImage
//               style={styles.loadingImage}
//               source={require('../../assets/loading.gif')}
//               // autoplay={true}
//               resizeMode={FastImage.resizeMode.contain}
//             /> */}
//             <Text style={styles.loadingText}>Fetching your results...</Text>
//       </View>
//     )}
//   </View>
//   </LinearGradient>
// );
// }

// const styles = StyleSheet.create({

//   // Your styles here

//   container: {
//     flex: 1,
//     // paddingHorizontal: 1,
//     paddingLeft: 20,
//     backgroundColor: 'transparent',
//   },
//   gradient: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   loadingText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   recommendationsContainer: {
//     marginTop: 120,
//     color:'white',
//     marginBottom: 20,
//   },
//   recommendationItem: {
//     marginRight: 20, // Increase the gap between recommendation items
//     width: 250, // Adjust the width of the recommendation item
//     alignItems: 'center',
//   },
//   recommendationDescription: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: 'blue', // Change this to your desired text color
//   },
//   recommendationImage: {
//     width: '100%', // Make the image take the entire width of its container
//     height: 120, // Set a fixed height for the image
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   // eslint-disable-next-line no-dupe-keys
//   recommendationDescription: {
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 50,
//     marginTop: 1,
//     marginLeft: 75,
//     color: 'white'
//   },
//   scoreMeter: {
//     alignItems: 'center',
//     marginTop: 1,
//   },
//   riskLevel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'white',
//   },

//   resultBox: {
//     width: '100%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     elevation: 10,
//   },
//   resultSection: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     // marginTop:'10',
//     color: 'white',
//     textAlign: 'center',
//   },
//   score: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   breakdownContainer: {
//     marginTop: 5,
//   },
//   breakdownItem: {
//     fontSize: 16,
//     color: 'white',
//   },
//   recommendations: {
//     fontSize: 16,
//     color: 'white',
//   },
// });

// export default App;
// TestHistory.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestHistory = () => {
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    // Fetch test history data here (e.g., from AsyncStorage, database, etc.)
    const fetchTestHistory = async () => {
      try {
        // Example: Fetching test history from AsyncStorage
        const storedHistory = await AsyncStorage.getItem('testHistory');
        if (storedHistory) {
          setTestHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error fetching test history:', error);
      }
    };

    fetchTestHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test History</Text>
      {testHistory.map((test, index) => (
        <View key={index} style={styles.historyItem}>
          <Text>Date: {test.date}</Text>
          <Text>Result: {test.result}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  historyItem: {
    marginBottom: 8,
  },
});

export default TestHistory;

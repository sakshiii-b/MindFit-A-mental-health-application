/* eslint-disable prettier/prettier */
//GALLERY

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
const VisitWebsite = () => {
  const handleVisitWebsite = () => {
    Linking.openURL('https://youtu.be/iwbCmKqwO1U?si=3YTa94C3jO5hICgj');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.contentContainer}>
        
        <TouchableOpacity
          style={styles.visitWebsiteButton}
          onPress={handleVisitWebsite}>
          <Text style={styles.visitWebsiteButtonText}>Visit Mental Health Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  contentContainer: {
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    /* your input field container styles here */
  },
  visitWebsiteButton: {
    backgroundColor: '#9D2235',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  visitWebsiteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VisitWebsite;

/* eslint-disable prettier/prettier */
// Import necessary components and libraries
// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import Video from 'react-native-video';

// // Define a list of mental health videos
// const mentalHealthVideos = [
//   {
//     id: 1,
//     title: 'Managing Stress',
//     videoUrl: 'https://youtu.be/3QIfkeA6HBY?si=Aj8jShypfgMrHuSJ',
//     thumbnail: 'http://192.168.173.2444:5000/get_image/2',
//   },
//   // Add more videos as needed
// ];

// // VideoScreen component to display individual videos
// const VideoScreen = ({ navigation }) => {
//   const videoUrl = navigation.getParam('videoUrl', '');
  
//   return (
//     <View>
//       <Video
//         source={{ uri: videoUrl }}
//         style={{ width: '100%', height: 200 }}
//         controls={true}
//       />
//     </View>
//   );
// };

// // HomeScreen component to display the list of mental health videos
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Mental Health Videos',
//   };

//   render() {
//     return (
//       <View>
//         <FlatList
//           data={mentalHealthVideos}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() =>
//                 this.props.navigation.navigate('Video', {
//                   videoUrl: item.videoUrl,
//                 })
//               }>
//               <View>
//                 <Text>{item.title}</Text>
//                 <Image
//                   source={{ uri: item.thumbnail }}
//                   style={{ width: 100, height: 100 }}
//                 />
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     );
//   }
// }

// // Set up navigation stack
// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Video: VideoScreen,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

// export default createAppContainer(AppNavigator);


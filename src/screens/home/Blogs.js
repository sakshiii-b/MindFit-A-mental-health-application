/* eslint-disable prettier/prettier */

// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { WebView } from 'react-native-webview';

// const data = [
//   {
//     id: '1',
//     title: 'Understanding Mental Health',
//     link: 'https://psychcentral.com/blog/caregivers/2020/09/how-to-change-your-behaviors-thoughts#1',
//     thumbnail:require('../../assets/thumbnail1.png'),// Add a URL to your thumbnail image
//   },
//   {
//     id: '2',
//     title: 'Mental Health Awareness',
//     link: 'https://www.betterup.com/blog/mental-health-awareness',
//     thumbnail: require('../../assets/thumbnail2.png'), // Add a URL to your thumbnail image
//   },
//   // Add more articles as needed
// ];

// const Blogs = ({ navigation, route }) => {
//   if (route.params?.link) {
//     // If there's a link in the route params, render the WebView for the article
//     return (
//       <View style={styles.container}>
//         <WebView source={{ uri: route.params.link }} />
//       </View>
//     );
//   }

//   // Otherwise, render the list of articles
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.articleContainer}
//       onPress={() => navigation.navigate('Blogs', { link: item.link })}
//     >
//       <Image source={item.thumbnail} style={styles.thumbnail} />
//       <Text style={styles.articleTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   articleContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     paddingVertical: 12,
//     flexDirection: 'row', // Align thumbnail and text horizontally
//     alignItems: 'center', // Align items vertically in the center
//   },
//   thumbnail: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//     borderRadius: 5,
//   },
//   articleTitle: {
//     fontSize: 24, // Larger font size
//     color: 'black', // Black color
//   },
// });

// export default Blogs;
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const data = [
  {
    id: '1',
    title: 'Understanding Mental Health',
    link: 'https://psychcentral.com/blog/caregivers/2020/09/how-to-change-your-behaviors-thoughts#1',
    thumbnail: require('../../assets/thumbnail1.png'),
  },
  {
    id: '2',
    title: 'Mental Health Awareness',
    link: 'https://www.betterup.com/blog/mental-health-awareness',
    thumbnail: require('../../assets/thumbnail2.png'),
  },
  // Add more articles as needed
];

const Blogs = ({ navigation, route }) => {
  if (route.params?.link) {
    // If there's a link in the route params, render the WebView for the article
    return (
      <View style={styles.container}>
        <WebView source={{ uri: route.params.link }} style={styles.webview} />
      </View>
    );
  }

  // Otherwise, render the list of articles
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() => navigation.navigate('Blogs', { link: item.link })}
    >
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.articleTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>MENTAL HEALTH BLOGS</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
  },
  webview: {
    flex: 1,
    marginTop: 20, // Adjust this value based on your design
  },
  articleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    color: 'black',
  },
});

export default Blogs;

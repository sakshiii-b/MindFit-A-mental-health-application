/* eslint-disable prettier/prettier */

import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS, ROUTES } from '../../constants';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 60;
const ITEM_HEIGHT = width / 2 - 60;

const Home = ({ navigation }) => {
  const data = [
    {
      id: 1,
      title: 'Quiz',
      route: ROUTES.Quiz,
      image: require('../../assets/homework.png'),
    },
    {
      id: 2,
      title: 'Test Results',
      route: ROUTES.TestResult,
      image: require('../../assets/history.png'),
    },
    {
      id: 3,
      title: 'Blogs',
      route: ROUTES.Blogs,
      image: require('../../assets/blogicon.png'),
    },
    // {
    //   id: 4,
    //   title: 'Update Result',
    //   route: ROUTES.ACTIVITES,
    //   image: require('../../assets/video.png'),
    // },
    {
      id: 5,
      title: 'Video',
      route: ROUTES.Video,
      image: require('../../assets/video.png'),
    },
    // {
    //   id: 6,
    //   title: 'Send Notifications',
    //   route: ROUTES.TASK,
    //   image: require('../../assets/notification.png'),
    // },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.gridItem}
      activeOpacity={0.8}
      onPress={() => navigation.navigate(item.route)}>
      <ImageBackground source={item.image} style={styles.gridItemImage}>
        <Text style={styles.gridItemTitle}>{item.title}</Text>
      </ImageBackground>
      <Text style={styles.gridItemSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridList}
      />
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridList: {
    // padding: 20,
    // margin: 20,
    flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20, // Adjust horizontal padding
  marginTop: 20, // Adjust top margin if needed
  marginBottom: 20,
  },
  gridItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    margin: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    flex: 1,
  },
  centeredItem: {
    // additional styles for centered items if needed
  },
  gridItemImage: {
    width: ITEM_WIDTH - 30,
    height: ITEM_HEIGHT - 30,
    resizeMode: 'cover',
    alignItems: 'center',
    paddingTop: ITEM_HEIGHT / 2,
  },
  gridItemTitle: {
    position: 'absolute',
    bottom: -30,
    width: ITEM_WIDTH - 10,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  centeredTitle: {
    // additional styles for centered title if needed
  },
});
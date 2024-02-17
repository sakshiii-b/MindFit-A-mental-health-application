/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS, IMGS,ROUTES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  const navigation = useNavigation();
  // const colorScheme = useColorScheme();
  const handleSignOut = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('teacherEmail');
    await AsyncStorage.removeItem('className');
    await AsyncStorage.removeItem('password');
    navigation.navigate(ROUTES.LOGIN); // Replace 'Login' with the actual name of your login screen component
  };
  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView {...props}>
      <ImageBackground source={IMGS.bgPattern} style={{height: 140}}>
        <Image source={IMGS.user} style={styles.userImg} />
      </ImageBackground>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
        
      </View>

    </DrawerContentScrollView>
    <View
        style={{padding: 1, borderTopWidth: 2, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{paddingVertical: 15}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20,}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: '#000',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  drawerListWrapper: {
    marginTop: 65,
  },
});
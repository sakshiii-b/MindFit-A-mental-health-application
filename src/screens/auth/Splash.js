import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions,useColorScheme } from 'react-native';
import { ROUTES } from '../../constants';
const Splash = ({ navigation }) => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate(ROUTES.LOGIN)
    }, 3000);
  }, []);
  const { width, height } = Dimensions.get('window');
  const logoSize = Math.min(width * 0.8, height * 0.8);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#FFCC2A',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
    },
    logo:{
      // height:300,
      // width:300,
    }
   
  });
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logovmm.png')} style={styles.logo} />
    </View>
  );
};


export default Splash;

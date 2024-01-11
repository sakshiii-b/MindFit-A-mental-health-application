
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
    Linking.openURL('https://demo.vmmhs.org/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logovmm.png')} style={styles.logo} />
      </View>
      <View style={styles.contentContainer}>
        
        <TouchableOpacity
          style={styles.visitWebsiteButton}
          onPress={handleVisitWebsite}>
          <Text style={styles.visitWebsiteButtonText}>Visit Website</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
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

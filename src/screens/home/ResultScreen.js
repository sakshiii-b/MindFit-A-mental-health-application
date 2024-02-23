/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const ResultScreen = ({ submissionResult }) => {

  const saveTestHistory = async (result, message,date) => {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;



    try {
      let testHistory = await AsyncStorage.getItem('testHistory');
      testHistory = testHistory ? JSON.parse(testHistory) : [];
      const id = testHistory.length + 1; // Increment id for new entry
      testHistory.push({ id, result, date: formattedDate, time: formattedTime, message });
      await AsyncStorage.setItem('testHistory', JSON.stringify(testHistory));
      console.log(testHistory)
    } catch (error) {
      console.error('Error saving test history:', error);
    }
  };


  const ranges = {
    Good: [0.00, 1.00],
    Moderate: [1.01, 1.53],
    Severe: [1.54, 4.00],
  };

  const determineRange = (result) => {
    const numericResult = parseFloat(result);
    //console.log(numericResult)

    for (const range in ranges) {
      const [min, max] = ranges[range];
      if (numericResult >= min && numericResult <= max) {
        return { range, color: getColorForRange(range) };
      }
    }
    return { range: 'Unknown', color: '#ccc' };
  };

  //console.log(getMessage);
  //console.log(ranges);
  //console.log(specificMessage)


  React.useEffect(() => {
    const currentDate = new Date().toISOString();  
    saveTestHistory(submissionResult, specificMessage, currentDate, getMessage, ranges);
  }, [submissionResult, specificMessage]);
  
  const getColorForRange = (range) => {
    switch (range.toLowerCase()) {
      case 'good':
        return 'green';
      case 'moderate':
        return '#ffa500';
      case 'severe':
        return 'red';
      default:
        return '#ccc'; 
    }
  };

  const result = determineRange(submissionResult);
  //console.log(result)
  const resultRange = result.range;
  const rangeColor = result.color;
  //console.log(resultRange)

  const getMessage = (range) => {
    switch (range.toLowerCase()) {
      case 'good':
        return 'Congratulations! Your mental health status is good.';
      case 'moderate':
        return 'You need to consult a therapist soon.';
      case 'severe':
        return 'You need immediate attention. Please consult a professional.';
      default:
        return '';
    }
  };

  

  //const thankYouMessage = 'Thank you for taking the test.';
  const specificMessage = getMessage(resultRange);


  const handleSearch = () => {
    const searchQuery = 'therapist near me';
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    Linking.openURL(searchUrl).catch((err) => console.error('Error opening URL: ', err));
  };

  return (
    <View style={styles.resultContainer}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Result Screen</Text>
      </View>
      <View style={styles.centeredContent}>
        <View style={styles.result}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'black' }}>
              Your result falls into{' '}
          <Text style={{ color: rangeColor }}>{resultRange}</Text> range.
        </Text>

          <View style={[styles.rangeBox, { backgroundColor: rangeColor }]}>
            <Text style={styles.box}>{resultRange}</Text>
          </View>
          <Text style={[styles.resultMessage, { color: rangeColor }]}>
            {specificMessage}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', marginTop: 16 }}>
           Thank You for taking the test.
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', marginTop: 16, textAlign: 'center' }}>
            Note: We don't display the exact value, only the range it falls into.
          </Text>

        </View>
        <TouchableOpacity onPress={handleSearch} style={[styles.button, styles.searchButton]}>
          <Text style={styles.buttonText}>Find Therapist Near Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    alignItems: 'center',
  },
  thankYouMessage: {
    marginBottom: 16,
  },
  rangeBox: {
    width: 80,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  box: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resultMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  note: {
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: 'blue',
  },
});

export default ResultScreen;
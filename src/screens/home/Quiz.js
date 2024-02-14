/* eslint-disable prettier/prettier */
//ADD Student

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Activities = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const apiEndpoint = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedOptions }),
      });

      console.log('API Response:', response);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiEndpoint = 'http://192.168.173.244:5000/fetch_questions';
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const renderOptions = (options, questionIndex) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionContainer,
          selectedOptions[questionIndex] === index && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect(index)}
        disabled={submitted}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <View key={currentQuestionIndex} style={styles.questionContainer}>
        <View style={styles.questionTitleContainer}>
          <Text style={styles.questionText}>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {renderOptions(currentQuestion.options, currentQuestionIndex)}
        </View>
        {currentQuestionIndex === questions.length - 1 ? (
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={submitted}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            disabled={submitted}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#6441A5', '#2a0845']} // Example gradient colors
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/logo.png')} // Update with your actual image path
              style={styles.logo}
            />
            <Text style={styles.title}>Quiz Screen</Text>
          </View>
          <View style={styles.centeredContent}>{questions.length > 0 && renderQuestion()}</View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient >

  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  questionContainer: {
    marginBottom: 30,
    padding: 10,
    width: '100%',
    backgroundColor: 'rgba(244, 244, 244, 0.1)',
    // borderRadius: 10,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',

  },
  questionTitleContainer: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    // borderRadius: 1,
    borderWidth: 0.8,
    width: '100%',
    borderColor: '#E0E0E0',
  },
  optionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
    textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'lightblue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Activities;

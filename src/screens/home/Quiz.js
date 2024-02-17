/* eslint-disable prettier/prettier */
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ResultScreen from './ResultScreen';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://192.168.173.244:5000/fetch_questions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const initialSelectedOptions = data.questions.reduce((acc, question, index) => {
          acc[index] = null;
          return acc;
        }, {});
        setSelectedOptions(initialSelectedOptions);
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    const updatedSelectedOptions = { ...selectedOptions };
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleContinue = () => {
    if (!selectedOptions[currentQuestionIndex]) {
      alert('Please select an option to continue.');
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmission = async () => {
    try {
      const selectedOptionsArray = Object.values(selectedOptions)
        .filter((option) => option !== null && option !== undefined)
        .map((option) => [option]);

      const response = await fetch('http://192.168.173.244:5000/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOptionsArray),
      });

      const result = await response.json();
      setSubmissionResult(result.result);
    } catch (error) {
      console.error('Error submitting options:', error);
    }
  };

  const handleReset = () => {
    // Implement your reset logic here
  };

  if (submissionResult !== null) {
    return <ResultScreen submissionResult={submissionResult} />;
  }

  if (questions.length === 0) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <LinearGradient
      colors={['#6441A5', '#2a0845']}
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
          <View style={styles.centeredContent}>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}</Text>
              {currentQuestion.options
                .filter((option) => option !== null && option.trim() !== '')
                .map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleOptionSelect(option)}
                    style={[
                      styles.optionContainer,
                      {
                        backgroundColor:
                          selectedOptions[currentQuestionIndex] === option
                            ? 'lightblue'
                            : 'rgba(244, 244, 244, 0.1)',
                      },
                    ]}
                    disabled={
                      selectedOptions[currentQuestionIndex] &&
                      selectedOptions[currentQuestionIndex] !== option
                    }
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            {currentQuestionIndex < questions.length - 1 ? (
              <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmission} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    marginBottom: 30,
    padding: 10,
    width: '100%',
    backgroundColor: 'rgba(244, 244, 244, 0.1)',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderWidth: 0.8,
    width: '100%',
    borderColor: '#E0E0E0',
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
    color: 'white',
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
});

export default App;

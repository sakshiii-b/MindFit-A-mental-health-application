import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
const AddTask = () => {
  const [className, setClassName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('className', className);
      formData.append('taskDate', taskDate);
      formData.append('taskTime', taskTime);
      formData.append('taskTitle', taskTitle);
      formData.append('description', description);

      const response = await fetch(
        'https://demo.vmmhs.org/admin/ApiController/createTask',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Task created successfully');
        // setIsModalVisible(false);
        fetchTasks();
      } else {
        Alert.alert('Error', 'Failed to create task');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://demo.vmmhs.org/admin/ApiController/getTasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Class Name"
          placeholderTextColor="black"
          value={className}
          onChangeText={setClassName}
          style={styles.input}
        />
        <TextInput
          placeholder="Task Date"
          placeholderTextColor="black"
          value={taskDate}
          onChangeText={setTaskDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Task Time"
          placeholderTextColor="black"
          value={taskTime}
          onChangeText={setTaskTime}
          style={styles.input}
        />
        <TextInput
          placeholder="Task Title"
          placeholderTextColor="black"
          value={taskTitle}
          onChangeText={setTaskTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Task Description"
          placeholderTextColor="black"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#9D2235" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'black',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    color:'black',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddTask;

//TASK

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://demo.vmmhs.org/admin/ApiController/getTasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };
  const navigateToAddScreen = () => {
    navigation.navigate('AddTask');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddScreen}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Tasks</Text>

      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={styles.taskTitle}>{task.taskTitle}</Text>
            <Text style={styles.taskDescription}>{task.description}</Text>
            <Text style={styles.taskInfo}>{task.className}</Text>
            <Text style={styles.taskInfo}>{task.taskDate}</Text>
            <Text style={styles.taskInfo}>{task.taskTime}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#9D2235',
    borderRadius: 15,
    height: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  taskList: {
    flex: 1,
    marginBottom: 80,
    color: 'black',
  },
  taskItem: {
    marginVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDescription: {
    marginVertical: 5,
    color: 'black',
  },
  taskInfo: {
    fontStyle: 'italic',
    color: 'black',
  },
});

export default TasksScreen;

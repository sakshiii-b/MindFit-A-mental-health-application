import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Wallet} from '../screens';
import {ROUTES,COLORS} from '../constants';
//import About from '../screens/home/About';
import AddStudent from '../screens/home/AddStudent';
import HomeWork from '../screens/home/HomeWork';
import Activites from '../screens/home/Acticites';
import Gallery from '../screens/home/Gallery';
// import Task from '../screens/home/Task';
import Attendance from '../screens/home/Attendance';
import Student_Details from '../screens/home/Student_Details';
import Profile  from '../screens/home/Profile';
import Add  from '../screens/home/Add';
import AddTask  from '../screens/home/AddTask';
// import ViewAttendance  from '../screens/home/ViewAttendance';

const Stack = createStackNavigator();

function HomeNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen name={ROUTES.AddStudent} component={AddStudent} />
      <Stack.Screen name={ROUTES.HomeWork} component={HomeWork} />
      <Stack.Screen name={ROUTES.ACTIVITES} component={Activites} />
      <Stack.Screen name={ROUTES.Gallery} component={Gallery} />
      {/* <Stack.Screen name={ROUTES.TASK} component={Task} /> */}
      <Stack.Screen name={ROUTES.Attendance} component={Attendance} />
      <Stack.Screen name={ROUTES.ADD} component={Add} />
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.Student_Details} component={Student_Details} />
      <Stack.Screen name={ROUTES.ADDTASK} component={AddTask} />
      {/* <Stack.Screen name={ROUTES.ViewAttendance} component={ViewAttendance} /> */}
    </Stack.Navigator>
  );
}

export default HomeNavigator;
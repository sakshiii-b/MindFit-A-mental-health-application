/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Wallet} from '../screens';
import {ROUTES,COLORS} from '../constants';
//import About from '../screens/home/About';
import Quiz from '../screens/home/Quiz';
import Blogs from '../screens/home/Blogs';
// import Activites from '../screens/home/Acticites';
import Video from '../screens/home/Video';
// import Task from '../screens/home/Task';
import TestHistory from '../screens/home/TestHistory';
import ResultScreen from '../screens/home/ResultScreen';
import Profile  from '../screens/home/Profile';
// import Add  from '../screens/home/Add';
// import AddTask  from '../screens/home/AddTask';
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
      <Stack.Screen name={ROUTES.Quiz} component={Quiz} />
      <Stack.Screen name={ROUTES.Blogs} component={Blogs} />
      {/* <Stack.Screen name={ROUTES.ACTIVITES} component={Activites} /> */}
      <Stack.Screen name={ROUTES.Video} component={Video} />
      {/* <Stack.Screen name={ROUTES.TASK} component={Task} /> */}
      <Stack.Screen name={ROUTES.TestHistory} component={TestHistory} />
      {/* <Stack.Screen name={ROUTES.ADD} component={Add} /> */}
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.ResultScreen} component={ResultScreen} /> 
      {/* <Stack.Screen name={ROUTES.ADDTASK} component={AddTask} /> */}
      {/* <Stack.Screen name={ROUTES.ViewAttendance} component={ViewAttendance} /> */}
    </Stack.Navigator>
  );
}

export default HomeNavigator;
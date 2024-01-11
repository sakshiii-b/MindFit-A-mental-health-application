import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constants';
import {Wallet, Profile, Login} from '../screens';
import VisitWebsite from '../screens/home/VisitWebsite';
import BottomTabNavigator from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import Attendance from '../screens/home/AddStudent';
//import About from '../screens/home/About';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
        options={{
          // headerShown:true,
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          headerShown: true,
          title: 'Profile',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="person-outline" size={18} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name={ROUTES.ABOUT}
        component={About}
        options={{
          headerShown: true,
          title: 'About',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="notifications" size={18} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name={ROUTES.VISIT_WEBSITE}
        component={VisitWebsite}
        options={{
          headerShown: true,
          title: 'Visit Website',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="globe-outline" size={18} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

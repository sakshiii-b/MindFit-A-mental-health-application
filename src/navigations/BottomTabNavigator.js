// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
// import {COLORS, ROUTES} from '../constants';
// import {Home, Wallet, Notifications, Settings} from '../screens';
// import Icon from 'react-native-vector-icons/Ionicons';
// import SettingsNavigator from './SettingsNavigator';
// import CustomTabBarButton from '../components/CustomTabBarButton';
// import CustomTabBar from '../components/CustomTabBar';
// import {useNavigation} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// function BottomTabNavigator() {
//   const navigation = useNavigation();

//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomTabBar {...props} />}
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarInactiveTintColor: COLORS.dark,
//         tabBarStyle: styles.tabBarStyle,
//         tabBarActiveTintColor: COLORS.primary,
//         tabBarIcon: ({color, size, focused}) => {
//           let iconName;

//           if (route.name === ROUTES.HOME_TAB) {
//             iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
//           } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
//             iconName = focused ? 'settings' : 'settings-outline';
//           } else if (route.name === ROUTES.WALLET) {
//             iconName = focused ? 'wallet' : 'wallet-outline';
//           } else if (route.name === ROUTES.NOTIFICATIONS) {
//             iconName = focused
//               ? 'md-notifications-sharp'
//               : 'md-notifications-outline';
//           }

//           return <Icon name={iconName} size={22} color={color} />;
//         },
//       })}>
//       <Tab.Screen
//         name={ROUTES.HOME_TAB}
//         component={Home}
//         options={{
//           tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
//         }}
//       />
//       <Tab.Screen
//         name={ROUTES.WALLET}
//         component={Wallet}
//         options={{
//           tabBarButton: props => <CustomTabBarButton {...props} />,
//         }}
//       />
//       <Tab.Screen
//         name={ROUTES.NOTIFICATIONS}
//         component={Notifications}
//         options={{
//           tabBarButton: props => <CustomTabBarButton {...props} />,
//         }}
//       />
//       <Tab.Screen
//         name={ROUTES.SETTINGS_NAVIGATOR}
//         component={SettingsNavigator}
//         options={{
//           tabBarLabel: 'Settings',
//           title: 'Settings',
//           headerShown: true,
//           tabBarButton: props => (
//             <CustomTabBarButton route="settings" {...props} />
//           ),
//           headerRight: () => {
//             return (
//               <TouchableOpacity onPress={() => navigation.openDrawer()}>
//                 <Icon
//                   name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
//                   size={30}
//                   color={COLORS.dark}
//                   style={{marginRight: 10}}
//                 />
//               </TouchableOpacity>
//             );
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default BottomTabNavigator;

// const styles = StyleSheet.create({
//   tabBarStyle: {
//     position: 'absolute',
//     backgroundColor: COLORS.transparent,
//     borderTopWidth: 0,
//     bottom: 15,
//     right: 10,
//     left: 10,
//     height: 92,
//   },
// });
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../constants';
import {Home, Wallet, Notifications, Settings} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsNavigator from './SettingsNavigator';
import {useNavigation} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabStyle,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === ROUTES.WALLET) {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === ROUTES.NOTIFICATIONS) {
            iconName = focused
              ? 'md-notifications-sharp'
              : 'md-notifications-outline';
          }

          return <Icon name={iconName} size={28} color={color} />;
        },
      })}>
      <Tab.Screen name={ROUTES.HOME_TAB} component={HomeNavigator}
       options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size, focused}) => (
          <Icon name={focused ? 'home' : 'home-outline'} size={28} color={color} />
        ),
        headerShown: true,
        title: 'Teacher',
        headerLeft: () => {
          return (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                size={30}
                color={COLORS.dark}
                style={{marginLeft: 20}}
              />
            </TouchableOpacity>
          );
        },
      }}
       />
      {/* <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name={focused ? 'settings' : 'settings-outline'} size={28} color={color} />
          ),
          headerShown: true,
          title: 'Student',
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                  size={30}
                  color={COLORS.dark}
                  style={{marginLeft: 20}}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen name={ROUTES.WALLET} component={Wallet} /> */}
      {/* <Tab.Screen name={ROUTES.SETTINGS_NAVIGATOR} component={SettingsNavigator} options={{
          headerShown: true,
          title: 'Settings',
        }} />
      <Tab.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} options={{
          headerShown: true,
          title: 'Notifications',
        }}/> */}
        <Tab.Screen
  name={ROUTES.SETTINGS_NAVIGATOR}
  component={SettingsNavigator}
  options={({navigation}) => ({
    headerShown: true,
    title: 'Settings',
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: COLORS.primary,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name={Platform.OS === 'ios' ? 'arrow-back-outline' : 'arrow-back-outline'}
          size={30}
          color={COLORS.dark}
          style={{marginLeft: 20}}
        />
      </TouchableOpacity>
    ),
  })}
/>

<Tab.Screen
  name={ROUTES.NOTIFICATIONS}
  component={Notifications}
  options={({navigation}) => ({
    headerShown: true,
    title: 'Notifications',
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: COLORS.primary,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name={Platform.OS === 'ios' ? 'arrow-back-outline' : 'arrow-back-outline'}
          size={30}
          color={COLORS.dark}
          style={{marginLeft: 20}}
        />
      </TouchableOpacity>
    ),
  })}
/>

      
      
    </Tab.Navigator>
    
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  
  tabBarStyle: {
    backgroundColor: '#fff',
    height: 56,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabStyle: {
    paddingVertical: 6,
  },
});

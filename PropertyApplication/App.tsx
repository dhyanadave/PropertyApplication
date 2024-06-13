import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import CityExperts from './src/Screens/CityExpertScreen';
import SavedScreen from './src/Screens/SavedScreen';
import InvestorScreen from './src/Screens/InvestorScreen';
import Profile from './src/Screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {sizeFont, sizeHeight, sizeWidth} from './utils/Utils';
import colors from './res/colors.json';
import AppText from './src/Components/AppText';
import {Provider} from 'react-redux';
import store from './src/Redux/store';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'City Expert') {
                iconName = 'people-outline';
              } else if (route.name === 'Save') {
                iconName = 'heart-outline';
              } else if (route.name === 'Investors') {
                iconName = 'bag-handle-outline';
              } else if (route.name === 'Profile') {
                iconName = 'person-circle-outline';
              }
              return (
                <Icon
                  name={iconName}
                  size={sizeWidth(6)}
                  color={focused ? colors.orange : colors.black}
                />
              );
            },
            tabBarLabel: ({focused, color}) => (
              <AppText style={[styles.tabBarLabel, color]}>
                {route.name}
              </AppText>
            ),
            tabBarActiveTintColor: colors.orange,
            tabBarInactiveTintColor: colors.light_grey_border,
            tabBarStyle: {
              paddingBottom: sizeHeight(1),
              height: sizeHeight(7),
            },
            headerShown: false,
          })}>
          <Tab.Screen name={'Home'} component={HomeScreen} />
          <Tab.Screen name={'City Expert'} component={CityExperts} />
          <Tab.Screen name={'Save'} component={SavedScreen} />
          <Tab.Screen name={'Investors'} component={InvestorScreen} />
          <Tab.Screen name={'Profile'} component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  tabBarLabel: {fontSize: sizeFont(3), margin: 0, padding: 0},
});

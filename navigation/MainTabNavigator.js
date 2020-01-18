import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = () => ({
  tabBarLabel: 'Crypto Info',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='bitcoin' />
});

HomeStack.path = '';

const MainTabNavigator = createMaterialBottomTabNavigator({
  HomeStack
});

MainTabNavigator.path = '';

export default MainTabNavigator;

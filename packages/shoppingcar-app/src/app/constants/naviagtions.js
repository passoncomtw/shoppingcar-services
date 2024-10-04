import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import LoginScreen from '../screens/LoginScreen';
import ShoppingcarScreen from '../screens/ShoppingcarScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const OrderStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Order" component={OrdersScreen} />
  </Stack.Navigator>
);

const ShoppingcarStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Shoppingcar" component={ShoppingcarScreen} />
  </Stack.Navigator>
);

const SettingStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Setting" component={SettingScreen} />
  </Stack.Navigator>
);

export const AuthNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focus, color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focus, color }) => (
            <MaterialCommunityIcons name="border-all" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingcarTab"
        component={ShoppingcarStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focus, color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focus, color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
  </Tab.Navigator>  
);

export const UnauthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

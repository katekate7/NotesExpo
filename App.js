// Import necessary modules from React and React Native
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import navigation components from React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import custom components
import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/components/context/NoteProvider';

// Create a stack navigator instance
const Stack = createNativeStackNavigator(); 

// Main component function
export default function App() {
  return (
    // Wrap the entire app in a NavigationContainer to enable navigation
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
          <Stack.Screen component={NoteScreen} name="NoteScreen" />
          <Stack.Screen component={NoteDetail} name="NoteDetail" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

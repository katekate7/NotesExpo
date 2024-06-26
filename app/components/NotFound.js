import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useMontserrat } from '../components/context/montserrat'

// NotFound component
const NotFound = () => {
  const fontsloaded = useMontserrat();
  return (
    // Container for not found message
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AntDesign name='frowno' size={90} color='black' />
      <Text style={{ marginTop: 20, fontSize: 20, fontFamily: 'Montserrat_400Regular' }}>Result Not Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    opacity: 0.5, 
    zIndex: -1, 
  },
});

export default NotFound;

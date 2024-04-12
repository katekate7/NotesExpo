import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';
import { useMontserrat } from '../components/context/montserrat'

// RoundIconBtn component
const RoundIconBtn = ({color, style, onPress}) => {

  const fontsloaded = useMontserrat();

  return (
    // Icon container
    <View style={[styles.iconContainer, style]}>
      {/* Text with 'ADD' */}
      <Text style={[styles.text, {color: color || 'white'}]}  onPress={onPress}>ADD</Text>
    </View>
  )
}

export default RoundIconBtn

// Styles
const styles = StyleSheet.create({
  iconContainer:{
    // Background color
    backgroundColor: colors.BLUE,
    padding: 15, // Padding
    elevation: 5, // Elevation (for Android)
    borderRadius: 40, // Border radius
    ...Platform.select({
      ios: {
        // Shadow styles (for iOS)
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5, // Elevation (for Android)
      },
    }),
  },
  text:{
    fontSize: 30, // Font size
    paddingHorizontal: 35, // Horizontal padding
    fontFamily: 'Montserrat_700Bold'
  }
})

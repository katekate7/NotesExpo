import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Import AntDesign icon
import { AntDesign } from '@expo/vector-icons';

// Import color constants
import colors from '../misc/colors';

// CheckBtn component for rendering a check icon button
const CheckBtn = ({ antIconName, size, color, style, onPress }) => {
    return (
        <View style={[styles.iconContainer, style]}>
            {/* Render AntDesign icon */}
            <AntDesign 
                name={antIconName} 
                size={size} 
                color={color || 'white'}
                onPress={onPress}
            />
        </View>
    );
};

export default CheckBtn;

// Styles for the CheckBtn component
const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: colors.BLUE,
        padding: 15,
        elevation: 5,
        borderRadius: 40,
    }
});

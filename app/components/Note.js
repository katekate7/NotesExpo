import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../misc/colors';

// Import custom context hook
import { useMontserrat } from '../components/context/montserrat';

// Note component to display individual notes
const Note = ({ item, onPress }) => {
    // Destructure note properties
    const { title, desc, selectedValue, time } = item;

    // Check if fonts are loaded
    const fontsLoaded = useMontserrat();

    // Function to format date into normal view
    const formatDate = ms => {
        const date = new Date(ms);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hrs = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        
        return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
    };

    // Function to set background color based on importance
    const importantBlocks = (selectedValue) => {
        if (selectedValue === 'Important') return { backgroundColor: colors.RED };
        if (selectedValue === 'Not Important') return { backgroundColor: colors.BLUE };
        if (selectedValue === 'Normal') return { backgroundColor: colors.AQUA };
    };

    return (
        // Touchable component to make the note pressable
        <TouchableOpacity onPress={onPress} style={[styles.container, importantBlocks(selectedValue)]}>
            {/* Title of the note */}
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            {/* Description of the note */}
            <Text style={styles.desc} numberOfLines={3}>{desc}</Text>
            {/* Display formatted date */}
            <Text style={{ marginTop: 15 }}>{formatDate(time)}</Text>
            {/* Display selected importance */}
            <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Montserrat_700Bold' }}>{selectedValue}</Text>
        </TouchableOpacity>
    );
};

// Get device width for styling
const width = Dimensions.get('window').width - 40;

// Styles for the Note component
const styles = StyleSheet.create({
    container: {
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        fontFamily: 'Montserrat_700Bold'
    },
    desc: {
        fontFamily: 'Montserrat_400Regular'
    }
});

export default Note;

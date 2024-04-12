// Import necessary modules and components
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importing an icon from a library
import colors from '../misc/colors'; // Importing colors from a custom file

// Define the SearchBar component, which takes props: containerStyle, value, onClear, onChangeText
const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {

  return (
    // View container for the SearchBar component, combining styles from styles.container and the passed containerStyle prop
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder='Search here..'
      />
      {value ? (
        <AntDesign
          name='close'
          size={20}
          color={colors.BLUE}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.AQUA,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  container: {
    justifyContent: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default SearchBar;

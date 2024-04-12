// Import necessary modules from React Native
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

// Import color constants
import colors from '../misc/colors';

// Import custom components
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NodeInputModel from '../components/NodeInputModel';
import Note from '../components/Note';
import NotFound from '../components/NotFound';

// Import custom context hooks
import { useNotes } from '../components/context/NoteProvider';
import { useMontserrat } from '../components/context/montserrat';

// Function to reverse the order of data
const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt === bInt) return 0;
      if (aInt > bInt) return -1;
    });
};

// Main component for the note screen
const NoteScreen = ({ navigation }) => {
    // State variables
    const [modalVisible, setModalVisible] = useState(false);
    const { notes, setNotes, findNotes } = useNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);

    // Check if fonts are loaded
    const fontsLoaded = useMontserrat();

    // Function to handle note submission
    const handleOnSubmit = async (title, desc, selectedValue) => {
        const note = { id: Date.now(), title, desc, selectedValue, time: Date.now() };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    // Function to open a note detail screen
    const openNote = (note) => {
        navigation.navigate('NoteDetail', { note });
    };

    // Reverse the order of notes
    const reverseNotes = reverseData(notes);

    // Function to handle search input
    const handleOnSearchInput = async (text) => {
        setSearchQuery(text);
        if (!text.trim()) {
            setSearchQuery('');
            setResultNotFound(false);
            return await findNotes();
        }
        const filteredNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase())) {
                return note;
            }
        });
    
        if (filteredNotes.length) {
            setNotes([...filteredNotes]);
        } else {
            setResultNotFound(true);
        }
    };

    // Function to handle clearing search query
    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes();
    };

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.AQUA}/>
            {/* Dismiss keyboard when tapping outside */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.header}>Hello</Text>
                    {/* Render search bar if notes exist */}
                    {notes.length ? (
                        <SearchBar
                            value={searchQuery}
                            onChangeText={handleOnSearchInput}
                            containerStyle={{ marginVertical: 20 }}
                            onClear={handleOnClear}
                        />
                    ) : null}

                    {/* Render notes or display 'Not Found' */}
                    {resultNotFound ? (
                        <NotFound />
                    ) : (
                        <FlatList
                            data={reverseNotes}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: 'space-between',
                                marginBottom: 15,
                            }}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                <Note onPress={() => openNote(item)} item={item} />
                            )}
                        />
                    )}
                    
                    {/* Display 'Add notes' when no notes exist */}
                    {!notes.length ? (
                        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                            <Text style={styles.emptyHeader}>Add notes</Text>
                        </View>
                    ) : null} 
                </View>
            </TouchableWithoutFeedback> 
            {/* Render add button */}
            <View style={styles.addBtnStyle}><RoundIconBtn onPress={() => setModalVisible(true)} style={styles.addBtn} /></View>
            {/* Render note input modal */}
            <NodeInputModel visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit}/>
        </>
    );
};

export default NoteScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    header: {
        fontSize: 25,
        fontStyle: 'italic',
        paddingTop: 50,
        fontFamily: 'Montserrat_400Regular'
    },

    emptyHeaderContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    emptyHeader:{
        fontSize: 30,
        textTransform: 'uppercase',
        opacity: 0.2,
        fontFamily: 'Montserrat_700Bold'
    },
    addBtn:{
        flex: 1,
        position: 'absolute',
        bottom: 50,
    },
    addBtnStyle:{
        alignItems: 'center',
        zIndex: 2
    }

});

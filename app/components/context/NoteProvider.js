import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for managing notes
const NoteContext = createContext();

// NoteProvider component for managing notes context
const NoteProvider = ({ children }) => {
    // State variable for storing notes
    const [notes, setNotes] = useState([]);

    // Function to retrieve notes from AsyncStorage
    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result));
    };

    // Load notes on component mount
    useEffect(() => {
        findNotes();
    }, []);

    // Provide notes context to children components
    return (
        <NoteContext.Provider value={{ notes, setNotes, findNotes }}>
            {children}
        </NoteContext.Provider>
     );
};

// Custom hook to use notes context
export const useNotes = () => useContext(NoteContext);

export default NoteProvider;
